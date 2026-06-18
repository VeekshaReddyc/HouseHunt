const express = require("express");
const router = express.Router();
const Property = require("../models/Property");
const protect = require("../middlewares/authMiddleware");

// GET PROPERTIES
router.get("/", protect, async (req, res) => {
  try {
    let properties;

    if (req.user.role === "admin") {
      properties = await Property.find();
    } else {
      properties = await Property.find({
        isApproved: true,
      });
    }

    res.json(properties);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// ADD PROPERTY
router.post("/add", protect, async (req, res) => {
  try {
    const property = new Property({
      ...req.body,
      ownerId: req.user.id,
      isApproved: false,
    });

    await property.save();

    res.json(property);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// ADMIN APPROVE PROPERTY
router.put("/approve/:id", protect, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Only admin can approve",
      });
    }

    const updated =
      await Property.findByIdAndUpdate(
        req.params.id,
        { isApproved: true },
        { new: true }
      );

    res.json(updated);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});
// ADMIN REJECT PROPERTY
router.delete("/reject/:id", protect, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Only admin can reject",
      });
    }

    await Property.findByIdAndDelete(req.params.id);

    res.json({
      message: "Property rejected",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;