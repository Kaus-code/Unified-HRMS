const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Transfer = require('../models/Transfer');

// GET /deputy/inspectors/:zoneName
// Get SIs in the given zone
router.get('/inspectors/:zoneName', async (req, res) => {
    try {
        const { zoneName } = req.params;
        // Case insensitive partial match for Zone (e.g. "Rohini" matches "Rohini Zone")
        // Also normalize role to "Sanitary Inspector"

        // Find users with role 'Sanitary Inspector' and matching Zone
        const inspectors = await User.find({
            role: 'Sanitary Inspector',
            Zone: { $regex: zoneName, $options: 'i' }
        }).select('name employeeId Ward Zone email phone stats');

        res.json({ success: true, inspectors });
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

module.exports = router;
