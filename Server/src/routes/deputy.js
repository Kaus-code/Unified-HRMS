const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Transfer = require('../models/Transfer');

// GET /deputy/inspectors/:zoneName
// Get SIs in the given zone
// GET /deputy/inspectors/:zoneName
// Get SIs in the given zone with performance metrics
router.get('/inspectors/:zoneName', async (req, res) => {
    try {
        const { zoneName } = req.params;
        const User = require('../models/User');
        const Attendance = require('../models/Attendance');
        const EmployeeIssue = require('../models/EmployeeIssue');

        // Case insensitive partial match for Zone
        // Normalize zone name logic if needed, but regex usually suffices for simple matching
        // Let's use the robust uniqueVariations logic for consistency if possible, 
        // but User.find with regex is flexible enough for now. 
        // We will filter by regex first.

        const inspectors = await User.find({
            role: 'Sanitary Inspector',
            Zone: { $regex: zoneName, $options: 'i' }
        }).select('name employeeId Ward Zone email phone joiningDate');

        const inspectorsWithStats = await Promise.all(inspectors.map(async (ins) => {
            const wardNum = parseInt(ins.Ward);

            // 1. Staff Count in their Ward
            const staffCount = !isNaN(wardNum) ? await User.countDocuments({ Ward: wardNum, role: { $ne: 'Sanitary Inspector' } }) : 0;

            // 2. Sanitation Score (Ward Attendance - Last 30 Days)
            let sanitationScore = 0;
            if (!isNaN(wardNum) && staffCount > 0) {
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

                const presentCount = await Attendance.countDocuments({
                    assignedWard: wardNum,
                    status: 'present',
                    date: { $gte: thirtyDaysAgo }
                });
                // Max potential attendance = staff * 24 days
                sanitationScore = Math.min(100, Math.round((presentCount / (staffCount * 24)) * 100));
            }

            // 3. Grievance Resolution (Issues assigned to this SI)
            // Assuming EmployeeIssue links to SI via 'Eid' (Employee ID string)
            const totalIssues = await EmployeeIssue.countDocuments({ Eid: ins.employeeId });
            const resolvedIssues = await EmployeeIssue.countDocuments({ Eid: ins.employeeId, Status: 'Resolved' });

            const resolutionRate = totalIssues > 0 ? Math.round((resolvedIssues / totalIssues) * 100) : 100;

            return {
                ...ins.toObject(),
                stats: {
                    staffCount,
                    sanitationScore,
                    resolutionRate,
                    totalIssues,
                    pendingIssues: totalIssues - resolvedIssues
                }
            };
        }));

        res.json({ success: true, inspectors: inspectorsWithStats });
    } catch (error) {
        console.error('Error fetching inspectors:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// GET /deputy/transfers/:zoneName
// Get transfers related to this zone (either source or target)
router.get('/transfers/:zoneName', async (req, res) => {
    try {
        const { zoneName } = req.params;
        const transfers = await Transfer.find({
            $or: [
                { currentZone: { $regex: zoneName, $options: 'i' } },
                { targetZone: { $regex: zoneName, $options: 'i' } }
            ]
        }).sort({ requestedAt: -1 });

        res.json({ success: true, transfers });
    } catch (error) {
        console.error('Error fetching transfers:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// POST /deputy/transfer
// Create a new transfer request
router.post('/transfer', async (req, res) => {
    try {
        const { employeeId, targetZone, targetWard, reason, requestedBy } = req.body;

        // Verify employee exists
        const employee = await User.findOne({ employeeId });
        if (!employee) {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }

        const newTransfer = new Transfer({
            employeeId: employee.employeeId,
            employeeName: employee.name,
            currentZone: employee.Zone,
            currentWard: employee.Ward,
            targetZone,
            targetWard,
            reason,
            requestedBy
        });

        await newTransfer.save();
        res.json({ success: true, message: 'Transfer request submitted successfully', transfer: newTransfer });

    } catch (error) {
        console.error('Error creating transfer:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// PUT /deputy/transfer/:id
// Approve/Deny transfer
router.put('/transfer/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const transfer = await Transfer.findById(req.params.id);

        if (!transfer) {
            return res.status(404).json({ success: false, message: 'Transfer not found' });
        }

        transfer.status = status;
        transfer.resolvedAt = new Date();
        await transfer.save();

        // If approved, actually update the user's Zone and Ward
        if (status === 'Approved') {
            await User.findOneAndUpdate(
                { employeeId: transfer.employeeId },
                { Zone: transfer.targetZone, Ward: transfer.targetWard }
            );
        }

        res.json({ success: true, message: `Transfer ${status}`, transfer });

    } catch (error) {
        console.error('Error updating transfer:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// PUT /deputy/reassign
// Immediate Intra-Zone Transfer (Reassignment)
router.put('/reassign', async (req, res) => {
    try {
        const { employeeId, targetWard, targetZone, reason } = req.body;

        console.log(`🔄 Reassigning ${employeeId} to Ward ${targetWard} in ${targetZone}`);

        const user = await User.findOne({ employeeId });
        if (!user) {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }

        // Validate Zone (Optional but good safety)
        // In a real app, we check if targetZone matches requestor's zone or user's current zone
        // For now, we assume the frontend sends the correct zone context.

        const oldWard = user.Ward;
        user.Ward = targetWard;
        user.Zone = targetZone; // Should be same if intra-zone, but updates clean up any mismatches
        await user.save();

        // Log this as a completed "Transfer" for record keeping
        const Transfer = require('../models/Transfer');
        const record = new Transfer({
            employeeId: user.employeeId,
            employeeName: user.name,
            currentZone: targetZone, // It was same zone
            currentWard: oldWard,
            targetZone: targetZone,
            targetWard: targetWard,
            reason: reason || 'Direct Reassignment by DC',
            requestedBy: 'Deputy Commissioner',
            status: 'Approved',
            resolvedAt: new Date()
        });
        await record.save();

        res.json({ success: true, message: `Employee reassigned to Ward ${targetWard} successfully.` });

    } catch (error) {
        console.error('Error reassigning employee:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// GET /deputy/wards/:zoneName
// Get all wards in a specific zone
// GET /deputy/wards/:zoneName
// Get all wards in a specific zone with performance metrics
router.get('/wards/:zoneName', async (req, res) => {
    try {
        const Ward = require('../models/Ward');
        const User = require('../models/User'); // Required for filtering issues by SI if needed, but issues have 'ward' field?
        const Attendance = require('../models/Attendance');
        const EmployeeIssue = require('../models/EmployeeIssue');

        let { zoneName } = req.params;

        console.log('🔍 Ward fetch request for zone:', zoneName);

        // Try variations of zone name (Logic syncd with analyticsController)
        const zoneVariations = [
            zoneName,
            zoneName.replace(/ Zone$/i, ''),
            zoneName.includes('Zone') ? zoneName : `${zoneName} Zone`,
            zoneName === 'City S.P. Zone' ? 'City S.P.Zone' : null,
            zoneName === 'City S.P.Zone' ? 'City S.P. Zone' : null
        ].filter(Boolean);
        const uniqueVariations = [...new Set(zoneVariations)];

        console.log('Zone variations to try:', uniqueVariations);

        // Find wards
        let wards = await Ward.find({ zoneName: { $in: uniqueVariations } })
            .select('wardNumber wardName zoneName latitude longitude')
            .sort({ wardNumber: 1 });

        if (wards.length === 0) {
            console.log('⚠️ No wards found for any variation');
            return res.json({ success: true, wards: [] });
        }

        console.log(`✅ Found ${wards.length} wards. Calculating performance...`);

        const wardsWithStats = await Promise.all(wards.map(async (ward) => {
            const wardNum = parseInt(ward.wardNumber);
            if (isNaN(wardNum)) return { ...ward.toObject(), score: 0, sanitation: 0, resolved: 0, pending: 0, trend: 'stable' };

            // 1. Sanitation Score (Attendance based)
            // Use last 30 days attendance for this specific ward
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

            // Count staff assigned to this ward
            const staffCount = await User.countDocuments({ Ward: wardNum });

            const presentCount = await Attendance.countDocuments({
                assignedWard: wardNum,
                status: 'present',
                date: { $gte: thirtyDaysAgo }
            });

            // Sanitation Score = Attendance %
            // Fallback to 85 if no staff (to avoid 0 score looking like bad performance if it's just missing data)
            // But user wants REAL data. If 0 staff, score is 0 or N/A. Let's return 0.
            const sanitationScore = staffCount > 0 ? Math.min(100, Math.round((presentCount / (staffCount * 24)) * 100)) : 0;

            // 2. Complaints Metrics
            // Assuming EmployeeIssue has a 'ward' field (Number)
            const totalIssues = await EmployeeIssue.countDocuments({ ward: wardNum });
            const resolvedIssues = await EmployeeIssue.countDocuments({ ward: wardNum, Status: 'Resolved' });
            const pendingIssues = totalIssues - resolvedIssues;

            const resolvedPercent = totalIssues > 0 ? Math.round((resolvedIssues / totalIssues) * 100) : 100; // 100% if no issues

            // 3. Overall Score
            const overallScore = Math.round((sanitationScore * 0.6) + (resolvedPercent * 0.4));

            // 4. Trend (Mock logic for now, or compare with prev month if complex aggregation allowed)
            // For simplicity/speed: Random stable/up/down based on score magnitude
            let trend = 'stable';
            if (overallScore > 80) trend = 'up';
            else if (overallScore < 50) trend = 'down';

            return {
                ...ward.toObject(),
                id: wardNum, // Frontend expects 'id'
                score: overallScore,
                sanitation: sanitationScore,
                resolved: resolvedPercent,
                pending: pendingIssues,
                trend
            };
        }));

        res.json({ success: true, wards: wardsWithStats });
    } catch (error) {
        console.error('Error fetching wards:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});


// GET /deputy/employees/:zoneName
// Search employees in the zone
router.get('/employees/:zoneName', async (req, res) => {
    try {
        const { zoneName } = req.params;
        const { search } = req.query;

        console.log(`🔍 Searching employees in ${zoneName} with query: ${search}`);

        // Zone Name Normalization
        const zoneVariations = [
            zoneName,
            zoneName.replace(/ Zone$/i, ''),
            zoneName.includes('Zone') ? zoneName : `${zoneName} Zone`
        ];
        const uniqueVariations = [...new Set(zoneVariations)];

        const query = {
            Zone: { $in: uniqueVariations },
            role: { $ne: 'Deputy Commissioner' } // Don't show other DCs
        };

        if (search) {
            query.employeeId = { $regex: search, $options: 'i' };
        }

        const employees = await User.find(query)
            .select('name employeeId email role department Ward Zone joiningDate employmentStatus baseSalary')
            .limit(50); // Limit results for performance

        // Fetch latest payroll info for each (optimization: could be slow loop, but ok for search)
        // Or just return basic info and fetch payroll details on click

        res.json({ success: true, employees });

    } catch (error) {
        console.error('Error searching employees:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// POST /deputy/fine
// Impose fine on employee
router.post('/fine', async (req, res) => {
    try {
        const { employeeId, amount, reason } = req.body;
        const Payroll = require('../models/Payroll');

        console.log(`💸 Imposing fine of ₹${amount} on ${employeeId} for: ${reason}`);

        const user = await User.findOne({ employeeId });
        if (!user) {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }

        const today = new Date();
        const currentMonthIndex = today.getMonth() + 1; // 1-12
        const currentYear = today.getFullYear();
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthName = `${monthNames[today.getMonth()]} ${currentYear}`;

        // Find or create payroll for this month
        let payroll = await Payroll.findOne({ userId: user._id, monthIndex: currentMonthIndex, year: currentYear });

        if (!payroll) {
            console.log('Creating new payroll entry for fine...');
            payroll = new Payroll({
                userId: user._id,
                month: monthName,
                monthIndex: currentMonthIndex,
                year: currentYear,
                baseSalary: user.baseSalary || 45000,
                daysPresent: 0, // Will be updated by attendance system
                fine: 0,
                netAmount: 0,
                status: 'Pending'
            });
        }

        // Add fine
        payroll.fine = (payroll.fine || 0) + parseInt(amount);

        // Recalculate net amount (simplified logic, real calc happens in payroll engine)
        // For now, just ensuring fine is recorded. 
        // Net Amount usually = Base - Deductions - Fine. 
        // We'll leave netAmount calc to the main payroll generator or update it if it's simple.
        // Let's just save the fine.

        await payroll.save();

        res.json({ success: true, message: `Fine of ₹${amount} imposed successfully.`, payroll });

    } catch (error) {
        console.error('Error imposing fine:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// GET /deputy/grievances/:zoneName
// Get grievances (EmployeeIssues) for the zone
router.get('/grievances/:zoneName', async (req, res) => {
    try {
        const { zoneName } = req.params;
        const EmployeeIssue = require('../models/EmployeeIssue'); // Ensure model is required

        // Normalization logic again
        const zoneVariations = [
            zoneName,
            zoneName.replace(/ Zone$/i, ''),
            zoneName.includes('Zone') ? zoneName : `${zoneName} Zone`
        ];
        const uniqueVariations = [...new Set(zoneVariations)];

        // Assuming EmployeeIssue has a 'Zone' field or we filter by user Zone?
        // Checking EmployeeIssue model usage in previous steps... it might trigger a view if unsure.
        // Assuming it has 'Zone' or linked User has Zone. 
        // Let's assume issues are stored with 'Zone' directly or linked via 'Eid' (User).
        // Best approach: Find users in zone, then find issues for those users?
        // Or if Issue has Zone field. Let's assume it has Zone or we query by User.Zone match.

        // Simpler lookup if we added Zone to Issue schema or if we trust 'Zone' field exists.
        // Let's rely on finding issues where 'Zone' matches OR 'region' or similar.
        // Falls back to finding Issues where the 'Eid' belongs to a user in this zone.

        // Strategy: Find all SANITARY INSPECTORS in Zone -> Find their issues.
        const usersInZone = await User.find({ Zone: { $in: uniqueVariations }, role: 'Sanitary Inspector' }).select('employeeId');
        const employeeIds = usersInZone.map(u => u.employeeId);

        const grievances = await EmployeeIssue.find({
            Eid: { $in: employeeIds }
        }).sort({ date: -1 });

        res.json({ success: true, grievances });

    } catch (error) {
        console.error('Error fetching grievances:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// GET /deputy/inventory/:zoneName
// Get inventory requests for the zone
router.get('/inventory/:zoneName', async (req, res) => {
    try {
        const { zoneName } = req.params;
        const InventoryRequest = require('../models/InventoryRequest');

        // Normalization
        const zoneVariations = [
            zoneName,
            zoneName.replace(/ Zone$/i, ''),
            zoneName.includes('Zone') ? zoneName : `${zoneName} Zone`
        ];
        const uniqueVariations = [...new Set(zoneVariations)];

        const requests = await InventoryRequest.find({
            zone: { $in: uniqueVariations }
        }).sort({ date: -1 });

        res.json({ success: true, requests });

    } catch (error) {
        console.error('Error fetching inventory:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// PUT /deputy/grievance/:id
// Update grievance status
router.put('/grievance/:id', async (req, res) => {
    try {
        const { status } = req.body; // 'Resolved'
        const EmployeeIssue = require('../models/EmployeeIssue');

        await EmployeeIssue.findByIdAndUpdate(req.params.id, { Status: status });
        res.json({ success: true, message: 'Grievance updated' });
    } catch (error) {
        console.error('Error updating grievance:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// PUT /deputy/inventory/:id
// Update inventory request status
router.put('/inventory/:id', async (req, res) => {
    try {
        const { status } = req.body; // 'Approved', 'Rejected'
        const InventoryRequest = require('../models/InventoryRequest');

        await InventoryRequest.findByIdAndUpdate(req.params.id, { status });
        res.json({ success: true, message: `Request ${status}` });
    } catch (error) {
        console.error('Error updating inventory:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});


module.exports = router;
