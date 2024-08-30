const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
    trainName: {
        type: String,
        required: true,
    },
    trainNumber: {
        type: String,
        required: true,
        unique: true,
    },
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
        sleeper: {
            type: Number,
            required: true,
        },
        AC3Tier: {
            type: Number,
            required: true,
        },
        AC2Tier: {
            type: Number,
            required: true,
        },
        AC1Tier: {
            type: Number,
            required: false,
        },
    }
}, {
    timestamps: true,
});

const Train = mongoose.model('Train', trainSchema);

module.exports = Train;
