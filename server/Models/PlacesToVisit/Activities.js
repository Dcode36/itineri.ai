const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // Each activity must have a unique name
    },
    description: {
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
    pricing: {
      adult: {
        type: Number,
        required: true,
        min: 0, // Price per adult
      },
      child: {
        type: Number,
        required: false,
        min: 0, // Price per child (optional)
      },
      senior: {
        type: Number,
        required: false,
        min: 0, // Price per senior (optional)
      },
      groupDiscount: {
        type: Number,
        required: false,
        min: 0, // Group discount percentage (optional)
      },
    },
    availability: {
      days: {
        type: [String], // Example: ["Monday", "Tuesday", "Friday"]
        required: true,
      },
      timeSlots: {
        type: [String], // Example: ["9:00 AM - 11:00 AM", "1:00 PM - 3:00 PM"]
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
        reviewerName: {
          type: String,
          required: true,
        },
        reviewDate: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    numberOfReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    averageRating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
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

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
