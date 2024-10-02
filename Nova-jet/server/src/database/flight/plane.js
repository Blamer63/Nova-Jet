const mongoose = require('mongoose');
const seatSchema = require('./seat');
const { foodSchema, drinkSchema } = require('./services');

const planeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    seats: [seatSchema],
    availableFood: [foodSchema],
    availableDrink: [drinkSchema],
}, {
    collection: 'planes',
});

const Plane = mongoose.model('Plane', planeSchema);

module.exports = { Plane, planeSchema };