const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, enum: ['bet', 'credit', 'debit'] },
    amount: { type: Number, required: true },
    roundId: { type: String, default: null },
    color: { type: String, default: null }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);