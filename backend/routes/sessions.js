const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Session = require('../models/Session');

// POST /api/sessions - Store a completed typing session
router.post('/', auth, async (req, res) => {
  try {
    const { wpm, accuracy, totalErrors } = req.body;
    
    const newSession = new Session({
      userId: req.user.id,
      wpm,
      accuracy,
      totalErrors,
      createdAt: Date.now()
    });
    
    const session = await newSession.save();
    res.json(session);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/sessions/:userId - Retrieve past session history for a user
router.get('/:userId', auth, async (req, res) => {
  try {
    // Ensure user can only access their own sessions
    if (req.user.id !== req.params.userId) {
      return res.status(401).json({ error: 'Not authorized' });
    }
    
    const sessions = await Session.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });
    
    res.json(sessions);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
