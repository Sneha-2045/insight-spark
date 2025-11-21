const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  getMe,
  verifyToken,
} = require("../controllers/authController");
const { protect } = require("../middleware/auth");
const { validateEmailForRole } = require("../middleware/validateEmail");

// Public routes
router.post("/signup", validateEmailForRole, signup);
router.post("/login", login); // Login doesn't need role validation - role is stored in user record
router.post("/verify", verifyToken);

// Protected routes
router.get("/me", protect, getMe);

module.exports = router;

