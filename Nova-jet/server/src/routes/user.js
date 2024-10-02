const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../database/user');
const authorize = require('./middleware/auth');
const router = express.Router();

// Registration
router.post('/register', async (req, res) => {0
  const { email, firstName, lastName, password } = req.body;

  try {
    const user = new User({ email, firstName, lastName, password, role: 'user' });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/me', authorize(['user', 'admin']), async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });

module.exports = router;