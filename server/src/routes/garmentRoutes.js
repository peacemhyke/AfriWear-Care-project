import express from "express";

import {
  getGarments,
  getGarmentById,
} from "../controllers/garmentController.js";

const router = express.Router();

router.get("/", getGarments);
router.get("/:id", getGarmentById);

export default router;