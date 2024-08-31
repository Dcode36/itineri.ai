const mongoose = require("mongoose");
const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: [String],
    enum: [
      "Historical",
      "Romantic",
      "Family",
      "Must Visit",
      "Adventure",
      "Religious",
      "Night Life",
      "Outdoor",
    ],
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
  duration: {
    type: String,
    required: false,
  },
  pricePerAdult: {
    type: Number,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
    default:""
  },
  mapLink: {
    type: String,
    required: false,
  },
});

const Place = mongoose.model("Place", placeSchema);

module.exports = Place;
