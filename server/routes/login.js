import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();

// POST route for user login
router.post("/", async (req, res) => {
  console.log("Login request received:", { email: req.body.email });

  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({
      error: "Email and password are required",
    });
  }

  try {
    // Find user by email
    console.log("Looking up user by email...");
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      console.log("User not found");
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    const user = result.rows[0];
    console.log("User found, verifying password...");

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      console.log("Invalid password");
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    console.log("Password verified, generating JWT...");

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Return success with token and user info (without password)
    const { password: _, ...userWithoutPassword } = user;

    console.log("Login successful for user:", user.email);

    res.status(200).json({
      message: "Login successful",
      token,
      user: userWithoutPassword,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

export default router;
