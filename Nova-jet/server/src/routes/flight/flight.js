const express = require('express');
const { Plane } = require('../../database/flight/plane');
const Flight = require('../../database/flight/flight');
const router = express.Router();

// New flight
router.post('/new', authorize(['admin']), async (req, res) => {
  const { flightNumber, planeName, departureAirport, arrivalAirport, departureTime, arrivalTime } = req.body;

  try {
    const plane = await Plane.findOne({ name: planeName });
    const flight = new Flight({ flightNumber, plane, departureAirport, arrivalAirport, departureTime, arrivalTime });
    await flight.save();
    res.status(201).json({ message: 'flight created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;