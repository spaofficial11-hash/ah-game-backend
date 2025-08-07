const GameResult = require('../models/GameResult');

// Admin: Declare Game Result
exports.declareResult = async (req, res) => {
    try {
        const { roundId, result } = req.body;

        const gameResult = new GameResult({ roundId, result });
        await gameResult.save();

        res.json({ message: 'Result declared successfully', gameResult });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Latest Game Result
exports.getLatestResult = async (req, res) => {
    try {
        const result = await GameResult.findOne().sort({ createdAt: -1 });
        res.json(result || { message: 'No result declared yet' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};