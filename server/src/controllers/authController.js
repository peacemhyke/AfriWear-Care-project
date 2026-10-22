import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";


export const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      brandName,
      phoneNumber,
      city,
      state,
    } = req.body;

    const requestedRole = req.body.role || "USER";
    const role = String(requestedRole).toUpperCase();

    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof email !== "string" ||
      !email.trim() ||
      typeof password !== "string" ||
      !password
    ) {
      return res.status(400).json({
        message: "Name, email and password are required.",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long.",
      });
    }

    if (!["USER", "DESIGNER"].includes(role)) {
      return res.status(400).json({
        message: "Invalid account type. Choose User or Designer.",
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    let cleanBrandName = null;
    let cleanPhoneNumber = null;
    let cleanCity = null;
    let cleanState = null;

    if (role === "DESIGNER") {
      if (
        typeof brandName !== "string" ||
        !brandName.trim() ||
        typeof city !== "string" ||
        !city.trim() ||
        typeof state !== "string" ||
        !state.trim()
      ) {
        return res.status(400).json({
          message:
            "Brand name, city and state are required for designer registration.",
        });
      }

      if (
        phoneNumber != null &&
        typeof phoneNumber !== "string"
      ) {
        return res.status(400).json({
          message: "Phone number must be valid text.",
        });
      }

      cleanBrandName = brandName.trim();
      cleanCity = city.trim();
      cleanState = state.trim();
      cleanPhoneNumber = phoneNumber?.trim() || null;

      if (
        cleanBrandName.length > 150 ||
        cleanCity.length > 100 ||
        cleanState.length > 100 ||
        (cleanPhoneNumber && cleanPhoneNumber.length > 30)
      ) {
        return res.status(400).json({
          message: "One or more designer profile fields are too long.",
        });
      }
    }

    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [cleanEmail]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        message: "Email already registered. Please log in instead.",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (
        name,
        email,
        password_hash,
        role,
        brand_name,
        phone_number,
        city,
        state
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING
        id, name, email, role, brand_name,
        phone_number, city, state, created_at`,
      [
        cleanName,
        cleanEmail,
        passwordHash,
        role,
        cleanBrandName,
        cleanPhoneNumber,
        cleanCity,
        cleanState,
      ]
    );

    return res.status(201).json({
      message: "Registration successful",
      user: result.rows[0],
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        message: "Email already registered. Please log in instead.",
      });
    }

    console.error("Registration error:", error.message);

    return res.status(500).json({
      message: "Registration failed. Please try again.",
    });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Find user by email
    const result = await pool.query(
      "SELECT id, name, email, password_hash, role FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const user = result.rows[0];

    // Compare entered password with stored password hash
    const passwordMatch = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Create JWT
    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);

    res.status(500).json({
      message: "Login failed",
    });
  }
};
export const getMe = async (req, res) => {
  try {
    
const result = await pool.query(
  `SELECT
     id, name, email, role, brand_name,
     phone_number, city, state, created_at
   FROM users
   WHERE id = $1`,
  [req.user.userId]
);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Get user error:", error.message);

    res.status(500).json({
      message: "Failed to get user",
    });
  }
};