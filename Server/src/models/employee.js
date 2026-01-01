const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    empolyeeid: {
        type: String,
        required: true,
        unique: true
    },  
    email: {
        type: String,
        required: true,
        unique: true
    }
});
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;