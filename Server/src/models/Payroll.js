const mongoose = require('mongoose');

const payrollSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    month: String, // e.g. "January 2026" or "2026-01"
    monthIndex: Number, // 1-12
    year: Number,
    baseSalary: Number,
    daysPresent: Number,
    overtimeHours: Number,
    taxDeductions: Number,
    pfDeductions: Number,
    netAmount: Number,
    status: {
        type: String,
        enum: ["Paid", "Pending"],
        default: "Pending"
    }
}, { timestamps: true });

// Avoid OverwriteModelError if model already exists
module.exports = mongoose.models.Payroll || mongoose.model('Payroll', payrollSchema);
