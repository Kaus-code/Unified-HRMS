const { calculateExpectedSalary } = require('./src/services/payrollService');

console.log("=== MCD HRMS Payroll Verification (Delhi 2026 Standards) ===\n");

// Mock Users
const permanentUser = { baseSalary: 50000, employmentStatus: 'Permanent' };
const contractualUser = { baseSalary: 30000, employmentStatus: 'Contractual' };

// Test Case 1: Permanent Employee on Day 1 (0 days passed, 0 present)
// Should result in Full Monthly Potential (No LOP yet as daysPassed is 0 or 1 and they are present?) 
// Actually if Day = 1 and Present = 1, LOP = 0.
console.log("Test Case 1: Permanent Employee - Day 1 (1 Present / 1 Elapsed)");
const t1 = calculateExpectedSalary(permanentUser, 1, 1, 0);
console.log(`Base: ${t1.baseSalary}, Gross: ${t1.gross}, LOP: ${t1.deductions.lop}, Net: ${t1.projectedNet}`);
console.log(`Allowances: DA(${t1.allowances.da}) HRA(${t1.allowances.hra}) TA(${t1.allowances.ta})`);
console.log("---------------------------------------------------");

// Test Case 2: Permanent Employee on Day 10 (7 Present / 10 Elapsed -> 3 Absent)
console.log("Test Case 2: Permanent Employee - Day 10 (7 Present / 10 Elapsed -> 3 Absent)");
const t2 = calculateExpectedSalary(permanentUser, 7, 10, 0);
console.log(`Base: ${t2.baseSalary}, Gross: ${t2.gross}, LOP: ${t2.deductions.lop}, Net: ${t2.projectedNet}`);
console.log(`Expected LOP: ~3 days of Gross`);
console.log("---------------------------------------------------");

// Test Case 3: Contractual Employee on Day 10 (7 Present / 10 Elapsed)
// Should be (30000 / 30) * 7 = 7000
console.log("Test Case 3: Contractual Employee - Day 10 (7 Present / 10 Elapsed)");
const t3 = calculateExpectedSalary(contractualUser, 7, 10, 0);
console.log(`Base: ${t3.baseSalary}, Gross: ${t3.gross} (Should be ~7000), Net: ${t3.projectedNet}`);
console.log("---------------------------------------------------");
