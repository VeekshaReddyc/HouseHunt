const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authMiddleware");
const admin = require("../middlewares/adminMiddleware");

const bookingController = require("../controllers/bookingController");

// USER BOOK PROPERTY
router.post(
  "/book/:id",
  protect,
  bookingController.bookProperty
);

// ADMIN VIEW BOOKINGS
router.get(
  "/",
  protect,
  admin,
  bookingController.getBookings
);

module.exports = router;