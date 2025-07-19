import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import db from "../db.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// Set up multer storage for avatar uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Use userId + timestamp + ext for uniqueness
    const ext = path.extname(file.originalname);
    cb(null, `avatar_${req.user.userId}_${Date.now()}${ext}`);
  },
});
const upload = multer({ storage });
// Upload avatar image and update profiles.avatar_url
router.post(
  "/avatar",
  authenticateToken,
  upload.single("avatar"),
  async (req, res) => {
    try {
      console.log("[Avatar Upload] req.file:", req.file);
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      const userId = req.user.userId;
      const avatarUrl = `/uploads/${req.file.filename}`;
      let result = await db.query(
        "UPDATE profiles SET avatar_url = $1, updated_at = NOW() WHERE user_id = $2 RETURNING avatar_url",
        [avatarUrl, userId]
      );
      if (result.rows.length === 0) {
        // No profile row, so insert one
        result = await db.query(
          "INSERT INTO profiles (user_id, avatar_url, created_at, updated_at) VALUES ($1, $2, NOW(), NOW()) RETURNING avatar_url",
          [userId, avatarUrl]
        );
      }
      console.log("[Avatar Upload] avatarUrl saved:", avatarUrl);
      res.status(200).json({
        message: "Avatar uploaded successfully",
        avatar_url: avatarUrl,
      });
    } catch (err) {
      console.error("Avatar upload error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Protected route - Get user profile
router.get("/", authenticateToken, async (req, res) => {
  try {
    console.log("Getting profile for user:", req.user.userId);

    // Get user data from users table
    const userResult = await db.query(
      "SELECT id, firstname, lastname, username, email, created_at FROM users WHERE id = $1",
      [req.user.userId]
    );
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const user = userResult.rows[0];

    // Get profile data (including avatar_url)
    const profileResult = await db.query(
      "SELECT avatar_url, bio, location, birthdate FROM profiles WHERE user_id = $1",
      [req.user.userId]
    );
    if (profileResult.rows.length > 0) {
      user.avatar_url = profileResult.rows[0].avatar_url;
      user.profile = profileResult.rows[0];
    } else {
      user.avatar_url = null;
      user.profile = null;
    }

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
