const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
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
      address: {
        type: String,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
      latitude: {
        type: Number,
        required: true,
      },
    },
    cuisineTypes: {
      type: [String], // Array of cuisine types offered by the restaurant
      required: true,
    },
    reviews: [
      {
        rating: {
          type: Number,
          required: true,
          min: 0,
          max: 5,
        },
        ratingCount: {
          type: Number,
          required: true,
          default: 0,
        },
      },
    ],
    priceRange: {
      type: String, // Example values: "$", "$$", "$$$"
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    openingHours: {
      type: String, // Example: "Mon-Fri: 9am - 10pm, Sat-Sun: 10am - 11pm"
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: false,
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

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
