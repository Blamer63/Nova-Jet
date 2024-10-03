const express = require('express');
const authorize = require('../middleware/auth');
const { Plane } = require('../../database/flight/plane');
const Flight = require('../../database/flight/flight');
const router = express.Router();

// New flight
router.post('/new', authorize(['admin']), async (req, res) => {
  const { flightNumber, planeName, departureAirport, arrivalAirport, departureTime, arrivalTime } = req.body;

  try {
    const plane = await Plane.findOne({ name: planeName });
    if (!plane) {
      return res.status(400).json({ error: 'Plane not found' });
    }

    let planeType = plane.name;
    let planeSeats = plane.seats
    let planeFood = plane.availableFood
    let planeDrinks = plane.availableDrink

    const flight = new Flight({
      flightNumber,
      planeType: planeType,
      seats: planeSeats,
      availableFood: planeFood,
      availableDrink: planeDrinks,
      departureAirport,
      arrivalAirport,
      departureTime,
      arrivalTime
    });
    await flight.save();
    res.status(201).json({ message: 'flight created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Flights
router.get('/get', async (req, res) => {
  const { flightNumber } = req.query;

  try {
    let flights;

    if (flightNumber) {
      flights = await Flight.findOne({ flightNumber: flightNumber });
    } else {
      flights = await Flight.find();
    }

    if (!flights) {
      return res.status(404).json({ error: 'Flight not found' });
    }

    res.status(201).json(flights);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;