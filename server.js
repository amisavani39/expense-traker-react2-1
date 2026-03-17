const path = require("path");

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");

// Load env
dotenv.config({ path: "./config/config.env" });

// Connect DB
connectDB();

// Routes
const transactionRoutes = require("./routes/transaction"); // ✅ fixed name

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Logging (only in development)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// API Routes
app.use("/api/v1/transaction", transactionRoutes); // ✅ fixed spelling

// Root route (IMPORTANT - prevents client/build error)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Handle unknown routes (optional but good)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;