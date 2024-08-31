const mongoose = require("mongoose");

const busSchema = new mongoose.Schema(
  {
    busName: {
      type: String,
      required: true,
    },
    busNumber: {
      type: String,
      required: true,
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
      regular: {
        type: Number,
        required: true,
      },
      semiSleeper: {
        type: Number,
        required: true,
      },
      sleeper: {
        type: Number,
        required: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Bus = mongoose.model("Bus", busSchema);

module.exports = Bus;
