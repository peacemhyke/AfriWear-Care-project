import crypto from "crypto";
import pool from "../config/db.js";

// Create a QR code for a garment
export const createQRCode = async (req, res) => {
  try {
    const { garmentId } = req.body;

    if (!garmentId) {
      return res.status(400).json({
        message: "Garment ID is required",
      });
    }

    // Check that the garment exists
    const garmentResult = await pool.query(
      "SELECT id, name, status FROM garments WHERE id = $1",
      [garmentId]
    );

    if (garmentResult.rows.length === 0) {
      return res.status(404).json({
        message: "Garment not found",
      });
    }

    // Generate a unique QR code value
    const code = crypto.randomBytes(16).toString("hex");

    const result = await pool.query(
      `INSERT INTO qr_codes (garment_id, code)
       VALUES ($1, $2)
       RETURNING id, garment_id, code, is_active, created_at`,
      [garmentId, code]
    );

    res.status(201).json({
      message: "QR code created successfully",
      qrCode: result.rows[0],
    });
  } catch (error) {
    console.error("Create QR error:", error.message);

    res.status(500).json({
      message: "Failed to create QR code",
    });
  }
};


// Resolve a QR code and record the scan
export const scanQRCode = async (req, res) => {
  try {
    const { code } = req.params;
    const userId = req.user.userId;

    const qrResult = await pool.query(
      `SELECT
        q.id AS qr_code_id,
        q.code,
        q.is_active,
        g.id AS garment_id,
        g.name AS garment_name,
        g.description AS garment_description,
        g.image_url,
        g.status AS garment_status,
        f.id AS fabric_id,
        f.name AS fabric_name,
        f.description AS fabric_description,
        f.origin AS fabric_origin,
        f.characteristics AS fabric_characteristics
      FROM qr_codes q
      JOIN garments g ON q.garment_id = g.id
      LEFT JOIN fabrics f ON g.fabric_id = f.id
      WHERE q.code = $1`,
      [code]
    );

    if (qrResult.rows.length === 0) {
      return res.status(404).json({
        message: "QR code not found",
      });
    }

    const qr = qrResult.rows[0];

    if (!qr.is_active) {
      return res.status(410).json({
        message: "This QR code is no longer active",
      });
    }

    if (qr.garment_status === "REJECTED") {
      return res.status(403).json({
        message: "This garment is not available",
      });
    }

    // Get care instructions
    const careResult = await pool.query(
      `SELECT
        id,
        category,
        instruction,
        temperature,
        method,
        warnings
      FROM care_instructions
      WHERE garment_id = $1
      ORDER BY id`,
      [qr.garment_id]
    );

    // Record scan history
    await pool.query(
      `INSERT INTO scan_history (user_id, qr_code_id)
       VALUES ($1, $2)`,
      [userId, qr.qr_code_id]
    );

    res.status(200).json({
      message: "QR code scanned successfully",
      garment: {
        id: qr.garment_id,
        name: qr.garment_name,
        description: qr.garment_description,
        image_url: qr.image_url,
      },
      fabric: {
        id: qr.fabric_id,
        name: qr.fabric_name,
        description: qr.fabric_description,
        origin: qr.fabric_origin,
        characteristics: qr.fabric_characteristics,
      },
      careInstructions: careResult.rows,
    });
  } catch (error) {
    console.error("Scan QR error:", error.message);

    res.status(500).json({
      message: "Failed to process QR code",
    });
  }
};