const express = require('express');
const router = express.Router();
const { getWallet, addCoins, withdrawCoins } = require('../controllers/walletController');
const authMiddleware = require('../middleware/authMiddleware');

// Get user wallet balance
router.get('/', authMiddleware, getWallet);

// Add coins (Admin or payment gateway)
router.post('/add', addCoins);

// Withdraw coins
router.post('/withdraw', authMiddleware, withdrawCoins);

module.exports = router;