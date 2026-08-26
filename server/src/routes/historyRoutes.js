import express from "express";

import {
getScanHistory,
deleteScanHistory,
clearScanHistory,
} from "../controllers/historyController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getScanHistory);

router.delete("/", protect, clearScanHistory);

router.delete("/:id", protect, deleteScanHistory);

export default router;
