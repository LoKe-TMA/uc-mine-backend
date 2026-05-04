const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Mine Claim
router.post('/claim', async (req, res) => {
  const { user_id } = req.body;
  let user = await User.findOne({ user_id }) || new User({ user_id });

  const now = new Date();
  if (user.last_claim && (now - user.last_claim) < 7200000) {
    return res.json({ success: false, message: "Cooldown ရှိနေသေးတယ်" });
  }

  const reward = Math.floor(Math.random() * 100) + 50;
  user.points += reward;
  user.last_claim = now;
  await user.save();

  res.json({ success: true, reward, newPoints: user.points });
});

// Task Complete
router.post('/task', async (req, res) => {
  const { user_id, task_id } = req.body;
  const rewards = { 1: 80, 2: 50, 3: 30 };
  const reward = rewards[task_id] || 20;

  const user = await User.findOne({ user_id });
  if (user) {
    user.points += reward;
    await user.save();
  }

  res.json({ success: true, reward });
});

// Mystery Box
router.post('/box', async (req, res) => {
  const { user_id } = req.body;
  const reward = Math.floor(Math.random() * 290) + 10;

  const user = await User.findOne({ user_id });
  if (user) {
    user.points += reward;
    await user.save();
  }

  res.json({ success: true, reward });
});

// Referral
router.post('/referral', async (req, res) => {
  const { user_id, referral_id } = req.body;
  // ရိုးရှင်း validation
  const user = await User.findOne({ user_id });
  if (user) {
    user.referrals += 1;
    user.mine_rate += 10; // boost
    await user.save();
  }
  res.json({ success: true });
});

// Redeem
router.post('/redeem', async (req, res) => {
  const { user_id, tier } = req.body;
  const user = await User.findOne({ user_id });
  if (!user) return res.json({ success: false });

  const requirements = [5000, 15000, 30000, 60000];
  if (user.points >= requirements[tier-1] && !user.redeemed_tiers.includes(tier)) {
    user.points -= requirements[tier-1];
    user.redeemed_tiers.push(tier);
    await user.save();
    res.json({ success: true, message: `Tier ${tier} (UC) လဲလှယ်ပြီး` });
  } else {
    res.json({ success: false, message: "မလုံလောက်သေးပါ" });
  }
});

module.exports = router;
