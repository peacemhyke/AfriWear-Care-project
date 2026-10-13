import healthRoutes from "./routes/healthRoutes.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import garmentRoutes from "./routes/garmentRoutes.js";
import qrRoutes from "./routes/qrRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import { seedDatabase } from "./config/seed.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/garments", garmentRoutes);
app.use("/api/qr", qrRoutes);
app.use("/api/history", historyRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "AfriWear Care API is running",
  });
});

// Start db before server
async function startServer() {
  await seedDatabase();
  app.listen(PORT, () => {
    console.log(`AfriWear Care API running on port ${PORT}`);
  });
}

startServer();