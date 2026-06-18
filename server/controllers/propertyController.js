const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authMiddleware");
const admin = require("../middlewares/adminMiddleware");

const propertyController = require("../controllers/propertyController");

// GET PROPERTIES
router.get(
  "/",
  protect,
  propertyController.getProperties
);

// ADD PROPERTY
router.post(
  "/add",
  protect,
  propertyController.addProperty
);

// APPROVE PROPERTY (ADMIN ONLY)
router.put(
  "/approve/:id",
  protect,
  admin,
  propertyController.approveProperty
);

// REJECT PROPERTY (ADMIN ONLY)
router.delete(
  "/reject/:id",
  protect,
  admin,
  propertyController.rejectProperty
);

module.exports = router;