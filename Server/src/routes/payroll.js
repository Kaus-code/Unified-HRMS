const express = require('express');
const router = express.Router();
const Payroll = require('../models/Payroll');
const User = require('../models/User');
const Attendance = require('../models/Attendance');

// Helper: count weekdays (Mon-Fri) between two dates (inclusive start, inclusive end)
function countWeekdays(startDate, endDate) {
    const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
    let count = 0;
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const day = d.getDay();
        if (day !== 0 && day !== 6) count++;
    }
    return count;
}

// Calculate payroll for an employee for a given month/year
// POST /payroll/calculate
// body: { employeeId, month (1-12), year, baseSalary?, overtimeHours? }
router.post('/calculate', async (req, res) => {
    try {
        const { employeeId, month, year, baseSalary: baseSalaryInput, overtimeHours: overtimeInput } = req.body;

        if (!employeeId) {
            return res.status(400).json({ success: false, message: 'employeeId is required' });
        }

        const user = await User.findOne({ employeeId });
        if (!user) return res.status(404).json({ success: false, message: 'Employee not found' });

        const now = new Date();
        const targetMonth = month ? parseInt(month, 10) : now.getMonth() + 1; // 1-12
        const targetYear = year ? parseInt(year, 10) : now.getFullYear();

        const startDate = new Date(targetYear, targetMonth - 1, 1);
        const endDate = new Date(targetYear, targetMonth, 0); // last day of month

        // Query attendance for that employee in month
        const attendanceRecords = await Attendance.find({
            employeeId: user.employeeId,
            date: { $gte: startDate, $lte: endDate }
        });

        // Count paid days: present or leave or has checkInTime
        const paidDays = attendanceRecords.filter(r => r.status === 'present' || r.status === 'leave' || !!r.checkInTime).length;

        // Determine working days in month (weekdays)
        const workingDays = countWeekdays(startDate, endDate);

        // Base salary fallback
        const baseSalary = baseSalaryInput ? Number(baseSalaryInput) : (user.baseSalary ? user.baseSalary : 45000);

        // Overtime hours (accept input or 0)
        const overtimeHours = overtimeInput ? Number(overtimeInput) : 0;

        const dailyRate = workingDays > 0 ? (baseSalary / workingDays) : (baseSalary / 30);
        const salaryForDays = dailyRate * paidDays;

        // Overtime at 1.5x hourly rate assuming 8-hour day
        const hourlyRate = dailyRate / 8;
        const overtimeRate = hourlyRate * 1.5;
        const overtimePay = overtimeHours * overtimeRate;

        const gross = salaryForDays + overtimePay;

        // Simple deductions
        const pfDeductions = +(gross * 0.12).toFixed(2); // 12% PF
        const taxDeductions = +(gross * 0.05).toFixed(2); // 5% tax

        const netAmount = +(gross - pfDeductions - taxDeductions).toFixed(2);

        // Upsert payroll record for employee/month/year
        const monthLabel = startDate.toLocaleString('en-US', { month: 'long' }) + ' ' + targetYear;

        let payroll = await Payroll.findOne({ userId: user._id, monthIndex: targetMonth, year: targetYear });
        if (payroll) {
            payroll.baseSalary = baseSalary;
            payroll.daysPresent = paidDays;
            payroll.overtimeHours = overtimeHours;
            payroll.taxDeductions = taxDeductions;
            payroll.pfDeductions = pfDeductions;
            payroll.netAmount = netAmount;
            payroll.month = monthLabel;
            await payroll.save();
        } else {
            payroll = new Payroll({
                userId: user._id,
                month: monthLabel,
                monthIndex: targetMonth,
                year: targetYear,
                baseSalary,
                daysPresent: paidDays,
                overtimeHours,
                taxDeductions,
                pfDeductions,
                netAmount,
                status: 'Pending'
            });
            await payroll.save();
        }

        return res.status(200).json({ success: true, payroll });

    } catch (error) {
        console.error('Error calculating payroll:', error);
        return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
});

// Get payroll history for an employee
// GET /payroll/employee/:employeeId?year=&month=
router.get('/employee/:employeeId', async (req, res) => {
    try {
        const { employeeId } = req.params;
        const { year, month } = req.query;

        if (!employeeId) return res.status(400).json({ success: false, message: 'employeeId required' });

        const user = await User.findOne({ employeeId });
        if (!user) return res.status(404).json({ success: false, message: 'Employee not found' });

        const query = { userId: user._id };
        if (year) query.year = Number(year);
        if (month) query.monthIndex = Number(month);

        const payrolls = await Payroll.find(query).sort({ year: -1, monthIndex: -1 });
        return res.status(200).json({ success: true, payrolls });
    } catch (error) {
        console.error('Error fetching payroll history:', error);
        return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
});

// Get single payroll slip
// GET /payroll/slip/:payrollId
router.get('/slip/:payrollId', async (req, res) => {
    try {
        const { payrollId } = req.params;
        const payroll = await Payroll.findById(payrollId).populate('userId', 'name employeeId email');
        if (!payroll) return res.status(404).json({ success: false, message: 'Payroll not found' });
        return res.status(200).json({ success: true, payroll });
    } catch (error) {
        console.error('Error fetching payroll slip:', error);
        return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
});

module.exports = router;

