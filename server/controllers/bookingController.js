const Booking = require("../models/Booking");
const Property = require("../models/Property");

// BOOK PROPERTY
exports.bookProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    const booking = await Booking.create({
      userId: req.user.id,
      propertyId: property._id,
    });

    res.json({
      message: "Booking successful",
      booking,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// ADMIN VIEW BOOKINGS
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "name email")
      .populate("propertyId", "title location");

    res.json(bookings);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};