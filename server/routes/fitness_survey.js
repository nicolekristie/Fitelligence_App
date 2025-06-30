import express from "express";
import pool from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const {
    user_id,
    goal,
    fitness_level,
    days_per_week,
    minutes_per_session,
    injuries,
    equipment,
  } = req.body;

  // Validate required fields
  if (!user_id) {
    return res.status(400).json({ error: "User ID is required" });
  }

  if (!goal || !fitness_level || !days_per_week || !minutes_per_session) {
    return res
      .status(400)
      .json({ error: "All required fields must be filled" });
  }

  try {
    console.log("Saving fitness survey for user:", user_id);
    console.log("Data:", {
      goal,
      fitness_level,
      days_per_week,
      minutes_per_session,
      injuries,
      equipment,
    });

    const result = await pool.query(
      `INSERT INTO fitness_survey (
        user_id, goal, fitness_level, days_per_week,
        minutes_per_session, injuries, equipment
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [
        user_id,
        goal,
        fitness_level,
        days_per_week,
        minutes_per_session,
        injuries || "",
        equipment || [],
      ]
    );

    console.log("Survey saved successfully:", result.rows[0]);
    res.status(201).json({
      success: true,
      data: result.rows[0],
      message: "Fitness survey saved successfully",
    });
  } catch (err) {
    console.error("Error saving fitness survey:", err);

    if (err.code === "23503") {
      // Foreign key constraint violation
      return res
        .status(400)
        .json({ error: "Invalid user ID. Please log in again." });
    }

    if (err.code === "23502") {
      // Not null constraint violation
      return res
        .status(400)
        .json({ error: "Missing required field: " + err.column });
    }

    if (err.code === "23505") {
      // Unique constraint violation
      return res
        .status(400)
        .json({
          error:
            "You have already completed a fitness survey. You can update it from your profile.",
        });
    }

    res.status(500).json({ error: "Server error saving survey" });
  }
});

export default router;
