
/**
 * Calculate Expected Monthly Salary
 * 
 * Logic for Permanent Employees:
 * - Assume a full month of 30 days.
 * - Calculate full allowances (50% DA, 27% HRA, 2400 TA).
 * - Calculate 'Loss of Pay' (LOP) based on absenteeism.
 * - Absent Days = daysPassedInMonth - daysPresent - approvedLeaves.
 * - Result = Full Monthly Potential - LOP - PF (12%) - Tax.
 * 
 * Logic for Contractual Employees:
 * - Pay strictly on daily basis (Base Salary / 30 * daysPresent).
 * - No allowances or PF.
 * 
 * Calculate Expected Monthly Salary (Delhi 2026 Standards)
 * 
 * Rules:
 * 1. Permanent:
 *    - Potential Gross = Base + DA(50%) + HRA(27%) + TA(2400).
 *    - LOP Deduction = (Potential Gross / 30) * AbsentDays.
 *    - PF Deduction = 12% of (Base + DA).
 *    - Tax = Fixed 200.
 *    - Net = Potential Gross - LOP - PF - Tax.
 * 
 * 2. Contractual:
 *    - Strictly Accrual Basis.
 *    - Net = (Base / 30) * DaysPresent.
 *    - No Allowances, No PF.
 * 
 * @param {Object} user - User object { baseSalary, employmentStatus }
 * @param {number} daysPresent - Days present/excused
 * @param {number} daysPassedInMonth - Days elapsed in current month
 * @param {number} approvedLeaves - Approved leave days
 * @returns {Object} detailed salary structure
 */
const calculateExpectedSalary = (user, daysPresent, daysPassedInMonth, approvedLeaves = 0, accruedFines = 0) => {
    const baseSalary = user.baseSalary || 45000;
    const isPermanent = user.employmentStatus === 'Permanent';

    // Default structure
    let structure = {
        baseSalary,
        allowances: { da: 0, hra: 0, ta: 0 },
        gross: 0,
        deductions: { pf: 0, tax: 0, lop: 0, fine: accruedFines }, // Added fine to deductions
        projectedNet: 0,
        isEstimate: false,
        breakdown: {}
    };

    if (isPermanent) {
        // --- PERMANENT EMPLOYEE LOGIC ---

        // 1. Allowances (Delhi 2026 Standards)
        const da = 0.50 * baseSalary;
        const hra = 0.27 * baseSalary;
        const ta = 2400;

        structure.allowances = { da, hra, ta };

        // 2. Potential Gross (Full Month)
        const potentialGross = baseSalary + da + hra + ta;
        structure.gross = potentialGross;

        // 3. Loss of Pay (LOP)
        const absentDays = Math.max(0, daysPassedInMonth - daysPresent - approvedLeaves);
        const perDayGross = potentialGross / 30;
        const lopAmount = Math.round(perDayGross * absentDays);
        structure.deductions.lop = lopAmount;

        // 4. Statutory Deductions
        const pf = Math.round(0.12 * (baseSalary + da));
        const tax = 200;

        structure.deductions.pf = pf;
        structure.deductions.tax = tax;

        // 5. Net Calculation
        // Subtract fines from the final net amount
        structure.projectedNet = Math.round(potentialGross - lopAmount - pf - tax - accruedFines);

        // 6. Messaging Flags
        if (daysPassedInMonth < 30) {
            structure.isEstimate = true;
        }

    } else {
        // --- CONTRACTUAL EMPLOYEE LOGIC ---
        const perDayBase = baseSalary / 30;
        const earnedAmount = Math.round(perDayBase * daysPresent);

        structure.gross = earnedAmount;
        // Subtract fines from contractual earnings as well
        structure.projectedNet = Math.round(earnedAmount - accruedFines);
        structure.isEstimate = true;
    }

    return structure;
};

module.exports = { calculateExpectedSalary };
