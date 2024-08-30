const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    source: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    departureTime: {
        type: Date,
        required: true,
    },
    arrivalTime: {
        type: Date,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    prices: {
        economy: {
            type: Number,
            required: true,
        },
        business: {
            type: Number,
            required: true,
        },
        firstClass: {
            type: Number,
            required: false,
        },
    },
    airline: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;
