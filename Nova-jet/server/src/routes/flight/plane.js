const express = require('express');
const Plane = require('../../database/flight/plane');
const router = express.Router();

// New plane
router.post('/new', async (req, res) => {
  const { name, seats, availableFood, availableDrink } = req.body;

  try {
    const plane = new Plane({ name, seats, availableFood, availableDrink });
    await plane.save();
    res.status(201).json({ message: 'Plane created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;