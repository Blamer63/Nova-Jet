const mongoose = require('mongoose');
const seatSchema = require('./seat');
const { foodSchema, drinkSchema } = require('./services');

const flightSchema = new mongoose.Schema({
    flightNumber: {
        type: String,
        required: true,
        unique: true
    },
    planeType: {
        type: String,
        required: true,
    },
    seats: [seatSchema],
    availableFood: [foodSchema],
    availableDrink: [drinkSchema],
    departureAirport: {
        type: String,
        required: true
    },
    arrivalAirport: {
        type: String,
        required: true
    },
    departureTime: {
        type: Date,
        required: true
    },
    arrivalTime: {
        type: Date,
        required: true
    },
}, {
    collection: 'flights',
    timestamps: true
});



const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;