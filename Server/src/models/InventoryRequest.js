const mongoose = require('mongoose');

const inventoryRequestSchema = new mongoose.Schema({
    requestID: { type: String, required: true, unique: true }, // e.g. REQ-1001
    raisedBy: { type: String, required: true }, // Employee Name/ID
    ward: { type: Number, required: true },
    zone: { type: String, required: true },
    itemName: { type: String, required: true }, // e.g. "Brooms", "Gloves"
    quantity: { type: Number, required: true },
    urgency: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], default: 'Medium' },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected', 'Fulfilled'], default: 'Pending' },
    date: { type: Date, default: Date.now },
    description: { type: String }
});

module.exports = mongoose.model('InventoryRequest', inventoryRequestSchema);
