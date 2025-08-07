const mongoose = require('mongoose');

const gameResultSchema = new mongoose.Schema({
    roundId: { type: String, required: true },
    result: { type: String, required: true, enum: ['red', 'green', 'blue'] },
}, { timestamps: true });

module.exports = mongoose.model('GameResult', gameResultSchema);