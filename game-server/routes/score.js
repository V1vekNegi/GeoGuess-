const express = require('express');
const router = express.Router();
const User = require('../model/User');

router.post('/update',  async (req, res) => {
  const { username, newScore } = req.body;
  console.log(username, newScore);
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.score = newScore;
    await user.save();
    res.json({ message: "Score updated successfully" });
  } catch (error) {
    console.error("Error updating score:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.post('/submit', (req, res) => {
  const { userAnswer, correctAnswer, triesUsed } = req.body;

  let score = 0;
  const userAnswerTrimmed = userAnswer.trim().toLowerCase();
  const correctAnswerTrimmed = correctAnswer.trim().toLowerCase();
  if (userAnswerTrimmed === correctAnswerTrimmed) {
    if (triesUsed === 0) score = 100;
    else if (triesUsed === 1) score = 70;
    else if (triesUsed === 2) score = 50;
  }
  console.log(score);
  res.json({ score, correct: userAnswerTrimmed === correctAnswerTrimmed });
});

module.exports = router;