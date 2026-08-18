import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    res.status(201).json({
      message: "Password hashed successfully",
      passwordHash,
    });
  } catch (error) {
    console.error("Registration error:", error.message);

    res.status(500).json({
      message: "Registration failed",
    });
  }
};