const User = require('../models/User');

// Get Referral List
exports.getReferrals = async (req, res) => {
    try {
        const referrals = await User.find({ referredBy: req.user.id }).select('username coins createdAt');
        res.json(referrals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Referral Code
exports.getReferralCode = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('referralCode');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({ referralCode: user.referralCode });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};