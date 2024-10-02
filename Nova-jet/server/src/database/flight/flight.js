const mongoose = require('mongoose');
const { planeSchema } = require('./plane');

const flightSchema = new mongoose.Schema({
    flightNumber: {
        type: String,
        required: true,
        unique: true
    },
    plane: planeSchema,
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