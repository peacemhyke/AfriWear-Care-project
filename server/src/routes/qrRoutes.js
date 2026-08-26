import express from "express";

import {
  createQRCode,
  scanQRCode,
} from "../controllers/qrController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createQRCode);
router.get("/scan/:code", protect, scanQRCode);

export default router;