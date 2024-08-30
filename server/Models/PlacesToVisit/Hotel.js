const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    location: {
      logitude: {
        type: Number,
        required: true,
      },
      latitude: {
        type: Number,
        required: true,
      },
    },
    reviews: [
      {
        rating: {
          type: Number,
          required: true,
          min: 0,
          max: 5,
        },
        reviewText: {
          type: String,
          required: false,
        },
      },
    ],
    numberOfReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: { type: Number, required: true, min: 0, max: 5 },
    categoryOfFood: {
      type: [String], // Array of food categories
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    mapLink: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;
