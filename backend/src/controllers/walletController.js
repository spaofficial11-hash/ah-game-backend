const User = require('../models/User');
const Transaction = require('../models/Transaction');

// Get Wallet Balance
exports.getWallet = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('coins');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({ balance: user.coins });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add Coins (Admin or Payment Gateway)
exports.addCoins = async (req, res) => {
    try {
        const { userId, amount } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.coins += amount;
        await user.save();

        const transaction = new Transaction({
            userId,
            type: 'credit',
            amount
        });
        await transaction.save();

        res.json({ message: 'Coins added successfully', balance: user.coins });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Withdraw Coins
exports.withdrawCoins = async (req, res) => {
    try {
        const { amount } = req.body;

        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (user.coins < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        user.coins -= amount;
        await user.save();

        const transaction = new Transaction({
            userId: req.user.id,
            type: 'debit',
            amount
        });
        await transaction.save();

        res.json({ message: 'Withdrawal successful', balance: user.coins });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};