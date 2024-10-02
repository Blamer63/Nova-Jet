const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    seatClass: {
        type: String,
        enum: ['Economy', 'Business', 'First'],
        required: true
    },
    row: {
        type: Number,
        required: true
    },
    aisle: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    isBooked: {
        type: Boolean,
        default: false
    },
});

module.exports = seatSchema;