const express = require('express');
const router = express.Router();
const recruitmentController = require('../controllers/recruitmentController');

router.post('/seed', recruitmentController.seedDummyData);
router.get('/', recruitmentController.getRecruitments);
router.get('/application/:email', recruitmentController.checkApplicationByEmail);
router.post('/check-status', recruitmentController.checkCandidateStatus);
router.post('/submit-documents', recruitmentController.submitDocuments);

// New DC Routes
router.get('/zone/:zone', recruitmentController.getZoneCandidates); // Preserved but behaves globally now
router.get('/pending', recruitmentController.getPendingCandidates); // New explicit global route
router.post('/approve', recruitmentController.approveCandidate);
router.post('/reject', recruitmentController.rejectCandidate);

module.exports = router;
