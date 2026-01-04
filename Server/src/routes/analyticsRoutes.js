const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

// Zone Statistics
router.get('/zone-stats/:zone', analyticsController.getZoneStats);
router.get('/zone-trends/:zone', analyticsController.getZoneTrends);

module.exports = router;
