const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    name: { type: String, required: true },
    employeeId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },

    role: {
        type: String,
        enum: ["Commissioner", "Deputy Commissioner", "Sanitary Inspector", "Worker", "Staff"],
        default: "Staff",
        required: true
    },

    department: {
        type: String,
        enum: [
            "Head Office",
            "Finance",
            "Health",
            "Education",
            "Water Supply",
            "Electricity",
            "Transport",
            "Road Maintenance",
            "Market Control",
            "Solid Waste",
            "Animal Control",
            "Security",
            "Sanitation",
            "Cleaning"
        ]
    },

    Zone: {
        type: String
    },
    Ward: {
        type: Number
    },
    joiningDate:{
        type: Date,
        default: Date.now
    },
    employmentStatus: { 
    type: String, 
    enum: ['Permanent', 'Contractual', 'Retired'], 
    default: 'Permanent'
    }
});

const payrollSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    month: String,
    baseSalary: Number,
    daysPresent: Number,
    overtimeHours: Number,
    taxDeductions: Number,
    pfDeductions: Number,
    netAmount: Number,
    status:{
        type: String,
        enum: ["Paid", "Pending"],
        default: "Pending"
    }
})

const payrollModel = mongoose.model("Payroll", payrollSchema);
module.exports = mongoose.model('User', userSchema);

