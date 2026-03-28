const express = require("express");
const { login, getMe } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// POST /api/auth/login — Authenticate user and return JWT
router.post("/login", login);

// GET /api/auth/me — Get current user profile (protected)
router.get("/me", authMiddleware, getMe);

module.exports = router;
