const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    recipientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: ['Low', 'Normal', 'High', 'Urgent'],
        default: 'Normal'
    },
    type: {
        type: String,
        enum: ['General', 'Show Cause', 'Directive', 'Appreciation'],
        default: 'General'
    },
    status: {
        type: String,
        enum: ['Sent', 'Read', 'Acknowledged'],
        default: 'Sent'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Notice', noticeSchema);
