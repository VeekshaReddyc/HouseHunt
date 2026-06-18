const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: String,

    location: String,

    price: String,

    type: String,

    description: String,

    ownerId: String,

    isApproved: {
      type: Boolean,
      default: false,
    },

    isBooked: {
      type: Boolean,
      default: false,
    },

    bookedBy: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Property",
  propertySchema
);