const express = require('express');
const router = express.Router();
const User = require('../model/User');

// GET /leaderboard
router.get('/', async (req, res) => {
  try {
    const leaderboard = await User.find({}, 'username score') // fetch only username and score
      .sort({ score: -1 });
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch leaderboard' });
  }
});

module.exports = router;