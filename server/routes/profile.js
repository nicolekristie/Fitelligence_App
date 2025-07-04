import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import db from "../db.js";

const router = express.Router();

// Protected route - Get user profile
router.get("/", authenticateToken, async (req, res) => {
  try {
    console.log("Getting profile for user:", req.user.userId);

    // Get user data from database (excluding password)
    const result = await db.query(
      "SELECT id, firstname, lastname, username, email FROM users WHERE id = $1",
      [req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const user = result.rows[0];

    res.status(200).json({
      message: "Profile retrieved successfully",
      user: user,
    });
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

// Protected route - Update user profile
router.put("/", authenticateToken, async (req, res) => {
  try {
    const { firstname, lastname, username } = req.body;
    const userId = req.user.userId;

    console.log("Updating profile for user:", userId);

    // Update user data
    const result = await db.query(
      "UPDATE users SET firstname = $1, lastname = $2, username = $3 WHERE id = $4 RETURNING id, firstname, lastname, username, email",
      [firstname, lastname, username, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const updatedUser = result.rows[0];

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Profile update error:", err);

    if (err.code === "23505") {
      return res.status(400).json({
        error: "Username already in use",
      });
    }

    res.status(500).json({
      error: "Internal server error",
    });
  }
});

export default router;
