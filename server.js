const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ==================== CORS (TMA အတွက် အရေးကြီး) ====================
app.use(cors({
  origin: '*',                    // TMA + Render Static Site အတွက်
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Environment
const BOT_TOKEN = process.env.BOT_TOKEN;

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => console.error('❌ MongoDB Error:', err.message));

// Routes
app.use('/api', require('./routes/api'));

// Test Routes
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 UC Mine Rewards Backend is Running!',
    status: 'ok',
    bot_token: BOT_TOKEN ? '✅ Set' : '❌ Not Set'
  });
});

app.get('/bot-info', (req, res) => {
  res.json({ 
    status: "ok", 
    bot_token_set: !!BOT_TOKEN 
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
