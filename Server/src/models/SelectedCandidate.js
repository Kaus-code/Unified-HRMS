const mongoose = require('mongoose');

const selectedCandidateSchema = new mongoose.Schema({
    examId: { type: String, required: true },
    examYear: { type: String, required: true },
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    enrollmentNumber: { type: String, required: true, unique: true },
    dateOfBirth: { type: Date, required: true },
    // Tracks if they have already applied
    hasApplied: { type: Boolean, default: false }
});

module.exports = mongoose.model('SelectedCandidate', selectedCandidateSchema);
