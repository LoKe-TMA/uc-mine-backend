const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_id: { type: String, required: true, unique: true },
  points: { type: Number, default: 0 },
  referrals: { type: Number, default: 0 },
  mine_rate: { type: Number, default: 100 },
  last_claim: { type: Date, default: null },
  current_tier: { type: Number, default: 1 },
  redeemed_tiers: { type: Array, default: [] }
});

module.exports = mongoose.model('User', userSchema);
