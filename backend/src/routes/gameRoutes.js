const express = require('express');
const router = express.Router();
const { declareResult, getLatestResult } = require('../controllers/gameController');
const authMiddleware = require('../middleware/authMiddleware');

// Admin declares game result
router.post('/declare', declareResult);

// Get latest result
router.get('/latest', getLatestResult);

module.exports = router;