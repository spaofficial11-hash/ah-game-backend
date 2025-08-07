const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
    referrer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    referredUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bonus: { type: Number, default: 50 },
}, { timestamps: true });

module.exports = mongoose.model('Referral', referralSchema);