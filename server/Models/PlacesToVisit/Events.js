const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // Each event must have a unique name
    },
    imageUrl: {
      type: String,
      required: true,
    },
    location: {
      venue: {
        type: String,
        required: true, // Name of the venue
      },
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
    eventTypes: {
      type: [String], // Array of event types, e.g., "Concert", "Festival", "Comedy Show"
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String, // Example: "7:00 PM - 10:00 PM"
      required: true,
    },
    artists: {
      type: [String], // List of artists or performers at the event
      required: true,
    },
    ticketPriceRange: {
      type: String, // Example values: "$", "$$", "$$$"
      required: true,
    },
    description: {
      type: String,
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
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
