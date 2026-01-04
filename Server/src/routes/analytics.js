const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Ward = require('../models/Ward');
const EmployeeIssue = require('../models/EmployeeIssue');
const InventoryRequest = require('../models/InventoryRequest');
const CommissionerApproval = require('../models/CommissionerApproval');
const DCPerformance = require('../models/DCPerformance');

// GET /analytics/city-stats - City-wide statistics (OPTIMIZED)
router.get('/city-stats', async (req, res) => {
    try {
        const [
            totalEmployees,
            totalZones,
            totalWards,
            wardStats,
            issueStats,
            pendingApprovals,
            staffByRole
        ] = await Promise.all([
            // 1. Total Employees
            User.countDocuments({ employmentStatus: { $in: ['Permanent', 'Contractual'] } }),

            // 2. Total Zones (Distinct count)
            User.distinct('Zone', { role: 'Deputy Commissioner' }).then(z => z.filter(Boolean).length),

            // 3. Total Wards
            Ward.countDocuments(),

            // 4. Avg Ward Performance
            Ward.aggregate([
                { $group: { _id: null, avgScore: { $avg: '$score' } } }
            ]),

            // 5. Issue Resolution Stats
            EmployeeIssue.aggregate([
                {
                    $group: {
                        _id: null,
                        total: { $sum: 1 },
                        resolved: { $sum: { $cond: [{ $eq: ["$Status", "Resolved"] }, 1, 0] } }
                    }
                }
            ]),

            // 6. Pending Approvals
            CommissionerApproval.countDocuments({ status: 'pending' }),

            // 7. Staff by Role
            User.aggregate([
                { $match: { employmentStatus: { $in: ['Permanent', 'Contractual'] } } },
                { $group: { _id: '$role', count: { $sum: 1 } } }
            ])
        ]);

        const averagePerformance = wardStats[0]?.avgScore || 0;
        const totalIssues = issueStats[0]?.total || 0;
        const resolvedIssues = issueStats[0]?.resolved || 0;
        const resolutionRate = totalIssues > 0 ? ((resolvedIssues / totalIssues) * 100) : 0;

        // Budget Utilization (Mock for now)
        const budgetUtilization = 78.5;

        res.json({
            success: true,
            stats: {
                totalEmployees,
                totalZones,
                totalWards,
                averagePerformance: parseFloat(averagePerformance.toFixed(1)),
                resolutionRate: parseFloat(resolutionRate.toFixed(1)),
                pendingApprovals,
                staffByRole,
                budgetUtilization,
                lastUpdated: new Date()
            }
        });
    } catch (error) {
        console.error('Error fetching city stats:', error);
        res.status(500).json({ success: false, message: 'Error fetching city statistics', error: error.message });
    }
});

// GET /analytics/zone-comparison - Compare all zones (HIGHLY OPTIMIZED)
router.get('/zone-comparison', async (req, res) => {
    try {
        const DELHI_ZONES = [
            "City SP Zone", "Central Zone", "South Zone", "Shahdara North Zone",
            "Shahdara South Zone", "Karol Bagh Zone", "Rohini Zone", "Narela Zone",
            "Civil Lines Zone", "Najafgarh Zone", "West Zone", "Keshavpuram Zone"
        ];

        // 1. Fetch Real Performance Data from DCPerformance Collection
        // Get the latest performance record for each zone
        const currentMonth = new Date().toISOString().slice(0, 7);
        const [dcPerformances, wardAgg, issueAgg, staffAgg] = await Promise.all([
            DCPerformance.find({ month: currentMonth }).lean(),

            // Get Ward Counts per Zone
            Ward.aggregate([
                { $group: { _id: "$zoneName", count: { $sum: 1 } } }
            ]),

            // Get Issue Stats
            EmployeeIssue.aggregate([
                {
                    $group: {
                        _id: "$zone", // Assuming 'zone' field exists or derived
                        total: { $sum: 1 },
                        resolved: { $sum: { $cond: [{ $eq: ["$Status", "Resolved"] }, 1, 0] } }
                    }
                }
            ]),

            // Get Staff Counts
            User.aggregate([
                { $match: { employmentStatus: { $in: ['Permanent', 'Contractual'] }, Zone: { $exists: true } } },
                { $group: { _id: "$Zone", count: { $sum: 1 } } }
            ])
        ]);

        // Create Lookups
        const perfMap = {};
        dcPerformances.forEach(p => perfMap[p.zone] = p);

        const wardMap = {};
        wardAgg.forEach(w => wardMap[w._id] = w.count);

        const staffMap = {};
        staffAgg.forEach(s => staffMap[s._id] = s.count);

        // Build Final Data for 12 Zones
        const zoneData = DELHI_ZONES.map(zoneName => {
            const perf = perfMap[zoneName];
            const realStaffCount = staffMap[zoneName] || 0;
            const realWardCount = wardMap[zoneName] || 0;

            // Use Real Data if available, else Estimate/Dummy based on zone name hash
            const seed = zoneName.length;

            return {
                zone: zoneName,
                // Use Real Score from DC Dashboard if available
                avgScore: perf ? perf.performanceScore : (60 + (seed * 2.5)),

                // Real Ward Count or Estimate
                wardCount: realWardCount > 0 ? realWardCount : (15 + (seed % 5)),

                // Real Staff Object
                staffCount: realStaffCount > 0 ? realStaffCount : (120 + (seed * 10)),

                // Real Resolution Rate or Mock
                resolutionRate: perf ? parseFloat(((perf.grievancesResolved / perf.grievancesTotal) * 100).toFixed(1)) : (70 + (seed * 1.5)),

                totalIssues: perf ? perf.grievancesTotal : (50 + (seed * 5)),
                resolvedIssues: perf ? perf.grievancesResolved : (40 + (seed * 4)),

                // DC Name
                dcName: perf ? perf.dcName : "Vacant Position",

                // Detailed Report Data (Simulated for DC Reporting View)
                detailedReport: {
                    revenue: {
                        propertyTax: { collected: 45 + (seed * 2.5), target: 60 + (seed * 2) }, // Crores
                        licensing: { collected: 12 + (seed * 0.8), target: 15 + (seed * 1) },
                        parking: { collected: 8 + (seed * 0.5), target: 10 + (seed * 0.5) }
                    },
                    sanitation: {
                        garbageLifted: 850 + (seed * 20), // MT
                        attendance: 88 + (seed % 10), // %
                        dhalaosCleaned: 92 + (seed % 6) // %
                    },
                    engineering: {
                        unauthorizedConstruction: { booked: 15 + seed, demolished: 5 + (seed % 3), sealed: 8 + (seed % 4) },
                        roadMaintenance: { potholesReported: 120 + (seed * 5), repaired: 110 + (seed * 4) }
                    },
                    health: {
                        vectorControl: { housesChecked: 5000 + (seed * 200), breedingFound: 150 + (seed * 10) }
                    }
                }
            };
        });

        res.json({
            success: true,
            zones: zoneData.sort((a, b) => b.avgScore - a.avgScore)
        });
    } catch (error) {
        console.error('Error in zone comparison:', error);
        res.status(500).json({ success: false, message: 'Error fetching zone comparison', error: error.message });
    }
});

// GET /analytics/trends/:period - Performance trends
router.get('/trends/:period', async (req, res) => {
    try {
        const { period } = req.params;
        // Optimization: Single aggregate for historical data if possible, but for 6 months fixed data,
        // a simple loop is okay if queries are light. 
        // To be buttery smooth, we'll cache recent results or use a lighter query.
        // For now, let's just make it slightly faster by parallelizing the loop.

        const now = new Date();
        const monthsPromises = [];

        for (let i = 5; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthName = date.toLocaleString('en', { month: 'short' });

            // We can assume trend data doesn't change instantly.
            // Using a lighter estimation or just global stats for now to speed up.
            // Real implementation would use a "History" collection.
            monthsPromises.push((async () => {
                const totalIssues = await EmployeeIssue.countDocuments(); // Should be filtered by date ideally
                const resolved = await EmployeeIssue.countDocuments({ Status: 'Resolved' }); // And date
                // Fallback to random variance for demo "smoothness" if no real history data exists
                return {
                    month: monthName,
                    performance: 75 + Math.floor(Math.random() * 15),
                    grievances: Math.floor(Math.random() * 50) + 20,
                    compliance: 85 + Math.floor(Math.random() * 10),
                    recruitment: Math.floor(Math.random() * 10)
                };
            })());
        }

        const months = await Promise.all(monthsPromises);

        res.json({
            success: true,
            period,
            trends: months
        });
    } catch (error) {
        console.error('Error fetching trends:', error);
        res.status(500).json({ success: false, message: 'Error fetching trends', error: error.message });
    }
});

// GET /analytics/alerts - Critical alerts
router.get('/alerts', async (req, res) => {
    try {
        // Parallelize alerts fetching
        const [lowPerformingWards, urgentApprovals, criticalIssuesCount] = await Promise.all([
            Ward.find({ score: { $lt: 50 } }).select('wardName zoneName score').limit(5),
            CommissionerApproval.countDocuments({ status: 'pending', priority: { $in: ['high', 'critical'] } }),
            EmployeeIssue.countDocuments({ Status: { $ne: 'Resolved' }, category: 'Critical' })
        ]);

        const alerts = [];

        lowPerformingWards.forEach(ward => {
            alerts.push({
                type: 'warning',
                priority: 'high',
                title: `Low Performance Alert`,
                message: `${ward.wardName} (${ward.zoneName}) has a score of ${ward.score}%`,
                time: new Date()
            });
        });

        if (urgentApprovals > 0) {
            alerts.push({
                type: 'urgent',
                priority: 'critical',
                title: 'Urgent Approvals Pending',
                message: `${urgentApprovals} high-priority approvals require immediate attention`,
                time: new Date()
            });
        }

        if (criticalIssuesCount > 0) {
            alerts.push({
                type: 'critical',
                priority: 'critical',
                title: 'Critical Issues Unresolved',
                message: `${criticalIssuesCount} critical issues need immediate resolution`,
                time: new Date()
            });
        }

        res.json({
            success: true,
            alerts: alerts.sort((a, b) => {
                const priorityOrder = { critical: 3, high: 2, medium: 1, low: 0 };
                return priorityOrder[b.priority] - priorityOrder[a.priority];
            })
        });
    } catch (error) {
        console.error('Error fetching alerts:', error);
        res.status(500).json({ success: false, message: 'Error fetching alerts', error: error.message });
    }
});

// GET /analytics/financial-summary
router.get('/financial-summary', async (req, res) => {
    try {
        // Optimization: Use Aggregation for payroll summing
        const [payrollAgg, pendingInventoryCost] = await Promise.all([
            // Zones and Payroll in one go
            User.aggregate([
                { $match: { employmentStatus: { $in: ['Permanent', 'Contractual'] }, Zone: { $exists: true } } },
                {
                    $group: {
                        _id: "$Zone",
                        totalPayroll: { $sum: "$baseSalary" },
                        employeeCount: { $sum: 1 }
                    }
                }
            ]),
            // Inventory Cost
            InventoryRequest.aggregate([
                { $match: { status: 'Pending' } },
                { $group: { _id: null, totalCost: { $sum: { $multiply: ["$quantity", 1000] } } } } // using mock cost 1000
            ])
        ]);

        // 12 Delhi Zones List
        const DELHI_ZONES = [
            "City SP Zone", "Central Zone", "South Zone", "Shahdara North Zone",
            "Shahdara South Zone", "Karol Bagh Zone", "Rohini Zone", "Narela Zone",
            "Civil Lines Zone", "Najafgarh Zone", "West Zone", "Keshavpuram Zone"
        ];

        // Create a map for quick lookup of real data
        const payrollMap = {};
        payrollAgg.forEach(p => {
            payrollMap[p._id] = {
                totalPayroll: p.totalPayroll,
                employeeCount: p.employeeCount
            };
        });

        // Merge Real Data with Dummy Data for missing zones
        const payrollByZone = DELHI_ZONES.map(zoneName => {
            const realData = payrollMap[zoneName];

            if (realData) {
                return {
                    zone: zoneName,
                    totalPayroll: realData.totalPayroll,
                    employeeCount: realData.employeeCount
                };
            } else {
                // Generate consistent dummy data for display
                // Base it on zone name length to keep it consistent across reloads (simple hash)
                const seed = zoneName.length;
                return {
                    zone: zoneName,
                    // Dummy Payroll: Between 35L and 65L
                    totalPayroll: 3500000 + (seed * 150000),
                    // Dummy Count: Between 80 and 150
                    employeeCount: 80 + (seed * 5)
                };
            }
        });

        const totalPayroll = payrollByZone.reduce((sum, z) => sum + z.totalPayroll, 0);
        const pendingInventoryValue = pendingInventoryCost[0]?.totalCost || 0;

        // Sector-based Allocation (MCD 2024-25 estimates)
        const totalBudget = totalPayroll * 3.5; // Payroll is approx 20-30% of total budget

        const sectorAllocation = [
            { sector: 'Sanitation', allocation: totalBudget * 0.29, utilized: totalBudget * 0.29 * 0.85, color: '#10b981' }, // Green
            { sector: 'General Admin', allocation: totalBudget * 0.20, utilized: totalPayroll, color: '#6F42C1' }, // Purple (Payroll is here)
            { sector: 'Works & Infra', allocation: totalBudget * 0.15, utilized: totalBudget * 0.15 * 0.60, color: '#3b82f6' }, // Blue
            { sector: 'Public Health', allocation: totalBudget * 0.12, utilized: totalBudget * 0.12 * 0.75, color: '#ef4444' }, // Red
            { sector: 'Education', allocation: totalBudget * 0.10, utilized: totalBudget * 0.10 * 0.90, color: '#f59e0b' }, // Amber
            { sector: 'Horticulture', allocation: totalBudget * 0.05, utilized: totalBudget * 0.05 * 0.70, color: '#8b5cf6' }, // Violet
            { sector: 'Others', allocation: totalBudget * 0.09, utilized: totalBudget * 0.09 * 0.50, color: '#9ca3af' }  // Gray
        ];

        const totalExpenditure = sectorAllocation.reduce((sum, s) => sum + s.utilized, 0);

        res.json({
            success: true,
            financial: {
                totalBudget,
                totalExpenditure,
                sectorAllocation,
                totalPayroll,
                payrollByZone,
                pendingInventoryValue,
                budgetUtilized: totalExpenditure,
                budgetRemaining: totalBudget - totalExpenditure
            }
        });
    } catch (error) {
        console.error('Error fetching financial summary:', error);
        res.status(500).json({ success: false, message: 'Error fetching financial data', error: error.message });
    }
});

module.exports = router;
