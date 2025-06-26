import express from "express";
import bcrypt from "bcrypt";
import db from "../db.js";

const router = express.Router();

// GET route for testing (optional - shows the endpoint is working)
router.get("/", (req, res) => {
  res.json({
    message: "Registration endpoint is working! Use POST to register a user.",
    expectedFields: ["firstname", "lastname", "username", "email", "password"],
  });
});

router.post("/", async (req, res) => {
  console.log("Registration request received:", req.body);
  const { firstname, lastname, username, email, password } = req.body;

  // ✅ Validate before hash
  if (!password || password.length < 8) {
    return res
      .status(400)
      .json({ error: "Password must be at least 8 characters" });
  }

  // ✅ Hash the password
  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    console.log("Attempting to insert user into database...");
    await db.query(
      "INSERT INTO users (firstname, lastname, username, email, password) VALUES ($1, $2, $3, $4, $5)",
      [firstname, lastname, username, email, hashedPassword]
    );
    console.log("User created successfully!");
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Database error:", err);
    if (err.code === "23505") {
      // Unique constraint violation (duplicate username/email)
      return res
        .status(400)
        .json({ error: "Email or username already in use" });
    }
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
