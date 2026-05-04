const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Environment Variables
const BOT_TOKEN = process.env.BOT_TOKEN;
const MONGO_URI = process.env.MONGO_URI;

// MongoDB Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => console.error('❌ MongoDB Error:', err.message));

// Routes
app.use('/api', require('./routes/api'));

// Home Route
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 UC Mine Rewards Backend is Running!',
    bot_token: BOT_TOKEN ? '✅ Set' : '❌ Not Set'
  });
});

// Bot Info Route
app.get('/bot-info', (req, res) => {
  res.json({ 
    status: "ok", 
    bot_token_set: !!BOT_TOKEN,
    message: BOT_TOKEN ? "Bot Token ထည့်ပြီး" : "Bot Token မထည့်သေးပါ"
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
