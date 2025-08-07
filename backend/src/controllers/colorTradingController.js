const GameResult = require('../models/GameResult');
const Transaction = require('../models/Transaction');
const User = require('../models/User');

// Place Bet
exports.placeBet = async (req, res) => {
    try {
        const { roundId, color, amount } = req.body;

        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (user.coins < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        // Deduct coins from user wallet
        user.coins -= amount;
        await user.save();

        // Save transaction
        const transaction = new Transaction({
            userId: req.user.id,
            type: 'bet',
            amount,
            roundId,
            color
        });
        await transaction.save();

        res.json({ message: 'Bet placed successfully', transaction });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get User Bets
exports.getUserBets = async (req, res) => {
    try {
        const bets = await Transaction.find({ userId: req.user.id, type: 'bet' }).sort({ createdAt: -1 });
        res.json(bets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};