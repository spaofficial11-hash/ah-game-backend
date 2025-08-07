const express = require('express');
const router = express.Router();
const { getReferrals, getReferralCode } = require('../controllers/referralController');
const authMiddleware = require('../middleware/authMiddleware');

// Get all referrals of logged-in user
router.get('/', authMiddleware, getReferrals);

// Get logged-in user's referral code
router.get('/code', authMiddleware, getReferralCode);

module.exports = router;