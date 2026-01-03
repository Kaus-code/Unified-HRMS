const mongoose = require('mongoose');

const transferSchema = new mongoose.Schema({
    employeeId: { type: String, required: true },
    employeeName: { type: String, required: true },
    currentZone: { type: String, required: true },
    currentWard: { type: Number, required: true },
    targetZone: { type: String, required: true },
    targetWard: { type: Number, required: true },
    reason: { type: String, required: true },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Denied'],
        default: 'Pending'
    },
    requestedBy: { type: String, required: true }, // DC ID
    requestedAt: { type: Date, default: Date.now },
    resolvedAt: { type: Date },
    comments: { type: String }
});

module.exports = mongoose.model('Transfer', transferSchema);
