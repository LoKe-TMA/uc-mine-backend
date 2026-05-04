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

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ DB Error:', err));

// Routes
app.use('/api', require('./routes/api'));

// Home
app.get('/', (req, res) => {
  res.json({ message: '🚀 UC Mine Rewards Backend Running!' });
});

app.listen(PORT, () => {
  console.log(`✅ Server on http://localhost:${PORT}`);
});
