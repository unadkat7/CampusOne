const express = require("express");

const router = express.Router();

// GET /api/health — Health check route
router.get("/", (req, res) => {
  res.status(200).json({ status: "CampusOne API running" });
});

module.exports = router;
