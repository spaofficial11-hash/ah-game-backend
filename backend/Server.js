// server.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

// Import routes aur DB connect (paths backend root se)
const authRoutes = require('./src/routes/authRoutes');
const gameRoutes = require('./src/routes/gameRoutes');
const walletRoutes = require('./src/routes/walletRoutes');
const referralRoutes = require('./src/routes/referralRoutes');
const connectDB = require('./src/config/db');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// DB connect
connectDB();

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/referrals', referralRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('AH GAME Backend API is running...');
});

// Secure Ping route
app.get('/ping', (req, res) => {
  const secret = req.query.key; // Example: /ping?key=ah_game_2025
  if (secret !== 'ah_game_2025') {
    return res.status(403).send('Forbidden');
  }
  res.status(200).send('OK');
});

// Port setup (Render ke liye mandatory)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
