const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register User
exports.register = async (req, res) => {
    try {
        const { username, password, referralCode } = req.body;

        let user = await User.findOne({ username });
        if (user) return res.status(400).json({ message: 'User already exists' });

        const newUser = new User({ username, password });

        // Referral Bonus
        if (referralCode) {
            const referrer = await User.findOne({ referralCode });
            if (referrer) {
                referrer.coins += 50; // Referrer Bonus
                newUser.coins += 20;  // New User Bonus
                await referrer.save();
                newUser.referredBy = referrer._id;
            }
        }

        await newUser.save();
        res.json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Login User
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user || user.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};