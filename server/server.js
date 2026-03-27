const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require("./routes/authRoutes");
const healthRoutes = require("./routes/healthRoutes");

// Initialize Express app
const app = express();

// ========================
// Middleware
// ========================
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ========================
// Routes
// ========================
app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res.status(500).json({ success: false, message: "Internal server error." });
});

// ========================
// Start Server
// ========================
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 CampusOne server running on port ${PORT}`);
  });
});
