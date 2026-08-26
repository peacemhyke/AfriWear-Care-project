import pool from "../config/db.js";

// Get all approved garments
export const getGarments = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        g.id,
        g.name,
        g.description,
        g.image_url,
        g.status,
        f.id AS fabric_id,
        f.name AS fabric_name,
        f.description AS fabric_description,
        f.origin AS fabric_origin,
        f.characteristics AS fabric_characteristics
      FROM garments g
      LEFT JOIN fabrics f ON g.fabric_id = f.id
      WHERE g.status = 'APPROVED'
      ORDER BY g.created_at DESC
    `);

    res.status(200).json({
      garments: result.rows,
    });
  } catch (error) {
    console.error("Get garments error:", error.message);

    res.status(500).json({
      message: "Failed to retrieve garments",
    });
  }
};

// Get one garment with its fabric and care instructions
export const getGarmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const garmentResult = await pool.query(
      `
      SELECT
        g.id,
        g.name,
        g.description,
        g.image_url,
        g.status,
        f.id AS fabric_id,
        f.name AS fabric_name,
        f.description AS fabric_description,
        f.origin AS fabric_origin,
        f.characteristics AS fabric_characteristics
      FROM garments g
      LEFT JOIN fabrics f ON g.fabric_id = f.id
      WHERE g.id = $1 AND g.status = 'APPROVED'
      `,
      [id]
    );

    if (garmentResult.rows.length === 0) {
      return res.status(404).json({
        message: "Garment not found",
      });
    }

    const careResult = await pool.query(
      `
      SELECT
        id,
        category,
        instruction,
        temperature,
        method,
        warnings
      FROM care_instructions
      WHERE garment_id = $1
      ORDER BY id
      `,
      [id]
    );

    res.status(200).json({
      garment: garmentResult.rows[0],
      careInstructions: careResult.rows,
    });
  } catch (error) {
    console.error("Get garment error:", error.message);

    res.status(500).json({
      message: "Failed to retrieve garment",
    });
  }
};