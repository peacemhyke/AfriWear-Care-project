import healthRoutes from "./routes/healthRoutes.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "AfriWear Care API is running",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`AfriWear Care API running on port ${PORT}`);
});