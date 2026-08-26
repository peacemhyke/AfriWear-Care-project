import pool from "../config/db.js";

export const getScanHistory = async (req, res) => {
  try {
    const userId = req.user.userId;

    const result = await pool.query(
      `
      SELECT
        sh.id,
        sh.scanned_at,
        q.code,
        g.id AS garment_id,
        g.name AS garment_name,
        g.image_url,
        f.id AS fabric_id,
        f.name AS fabric_name
      FROM scan_history sh
      JOIN qr_codes q ON sh.qr_code_id = q.id
      JOIN garments g ON q.garment_id = g.id
      LEFT JOIN fabrics f ON g.fabric_id = f.id
      WHERE sh.user_id = $1
      ORDER BY sh.scanned_at DESC
      `,
      [userId]
    );

    res.status(200).json({
      history: result.rows,
    });
  } catch (error) {
    console.error("Get scan history error:", error.message);

    res.status(500).json({
      message: "Failed to retrieve scan history",
    });
  }
};
/* =========================
DELETE ONE SCAN
========================= */

export const deleteScanHistory = async (req, res) => {
try {
const userId = req.user.userId;
const { id } = req.params;

const result = await pool.query(
  `
  DELETE FROM scan_history
  WHERE id = $1
  AND user_id = $2
  RETURNING id
  `,
  [id, userId]
);

if (result.rows.length === 0) {
  return res.status(404).json({
    message: "Scan history record not found",
  });
}

res.status(200).json({
  message: "Scan history deleted successfully",
});

} catch (error) {
console.error("Delete scan history error:", error.message);

res.status(500).json({
  message: "Failed to delete scan history",
});

}
};

/* =========================
DELETE ALL SCANS
========================= */

export const clearScanHistory = async (req, res) => {
try {
const userId = req.user.userId;

await pool.query(
  `
  DELETE FROM scan_history
  WHERE user_id = $1
  `,
  [userId]
);

res.status(200).json({
  message: "Scan history cleared successfully",
});

} catch (error) {
console.error("Clear scan history error:", error.message);

res.status(500).json({
  message: "Failed to clear scan history",
});

}
};