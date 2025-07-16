import express from "express";
import cors from "cors";
import registerRoute from "./routes/register.js";
import loginRoute from "./routes/login.js";
import profileRoute from "./routes/profile.js";
import OpenAI from "openai";
import fitnessSurveyRoute from "./routes/fitness_survey.js";
import pool from "./db.js";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use("/api/fitness-survey", fitnessSurveyRoute);

// Initialize with API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


app.get("/api/test", (req, res) => {
  res.json({ success: true, message: "Test route works!" });
});



//Chat endpoints
app.post("/api/chat", async (req, res) => {
  try {
    const { message, userId, goal } = req.body;

    // Validate input
    if (
      !message ||
      typeof message !== "string" ||
      message.trim().length === 0
    ) {
      return res.status(400).json({
        error: "Valid message is required",
        success: false,
      });
    }

    // Build personalized system prompt
    let systemPrompt = `You are an expert fitness coach for Fitelligence app. Provide helpful, motivating, and safe fitness advice. Format your responses clearly with:

- Use bullet points for lists (• or -)
- Number steps when giving instructions (1. 2. 3.)
- Use line breaks to separate different topics
- Keep responses concise but informative
- Use an encouraging, professional tone
- When giving workout routines, format them clearly with exercise names and reps/sets

Example formatting:
Here are some great exercises for beginners:

• Push-ups: 3 sets of 8-12 reps
• Squats: 3 sets of 10-15 reps
• Plank: Hold for 30-60 seconds

Remember to warm up before exercising!`;

    // Fetch user's fitness survey data if userId is provided
    if (userId) {
      try {
        const surveyResult = await pool.query(
          "SELECT * FROM fitness_survey WHERE user_id = $1",
          [userId]
        );

        if (surveyResult.rows.length > 0) {
          const survey = surveyResult.rows[0];

          // Create personalized system prompt based on survey data
          systemPrompt = `You are an expert fitness coach for Fitelligence app. You are coaching a user with the following profile:

**Fitness Goal:** ${survey.goal}
**Fitness Level:** ${survey.fitness_level}
**Workout Schedule:** ${survey.days_per_week} days per week, ${
            survey.minutes_per_session
          } minutes per session
**Available Equipment:** ${
            survey.equipment.length > 0
              ? survey.equipment.join(", ")
              : "No equipment (bodyweight only)"
          }
${survey.injuries ? `**Injuries/Limitations:** ${survey.injuries}` : ""}

IMPORTANT: Always tailor your advice specifically to this user's profile. Reference their:
- Goal (${survey.goal}) when suggesting exercises
- Fitness level (${survey.fitness_level}) when recommending intensity
- Available equipment when creating workouts
- Time constraints (${survey.minutes_per_session} min sessions)
- Any injuries/limitations when applicable

Format your responses clearly with:
- Use bullet points for lists (• or -)
- Number steps when giving instructions
- Use line breaks to separate different topics
- Keep responses concise but informative
- Use an encouraging, professional tone
- Always customize recommendations to their specific situation

When creating workout plans, ONLY suggest exercises using their available equipment: ${
            survey.equipment.length > 0
              ? survey.equipment.join(", ")
              : "bodyweight exercises only"
          }.`;
        }
      } catch (dbError) {
        console.log("Could not fetch survey data:", dbError.message);
        // Continue with generic prompt if survey data unavailable
      }
    }

    // Create completion with personalized system context
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: message.trim(),
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    // Format and validate AI response
    const aiResponse = completion.choices[0].message.content;

    if (!aiResponse) {
      throw new Error("No response from AI");
    }

    // Save AI response to database if user is logged in
    if (userId) {
      try {
        console.log(`Attempting to save AI response for user ${userId}`);
        console.log(`Response text: ${aiResponse.trim().substring(0, 100)}...`);

        const result = await pool.query(
          `INSERT INTO ai_chat_responses (user_id, response_text) 
           VALUES ($1, $2) RETURNING id`,
          [userId, aiResponse.trim()]
        );

        console.log(
          `✅ Successfully saved AI response with ID: ${result.rows[0].id}`
        );
      } catch (dbError) {
        console.error(
          "❌ Error saving AI response to database:",
          dbError.message
        );
        console.error("Full error:", dbError);
        // Continue without failing the request
      }
    } else {
      console.log("⚠️ No userId provided, skipping database save");
    }

    // Send formatted response
    res.json({
      response: aiResponse.trim(),
      success: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in chat endpoint:", error.message);

    // Send user-friendly error response
    res.status(500).json({
      error:
        "I'm having trouble responding right now. Please try again in a moment.",
      success: false,
      timestamp: new Date().toISOString(),
    });
  }
});

// Get chat history for a user
app.get("/api/test", (req, res) => {
  res.json({ success: true, message: "Test route works!" });
});

app.get("/api/chat/history/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 50, offset = 0 } = req.query;

    // Validate userId
    if (!userId || isNaN(parseInt(userId))) {
      return res.status(400).json({
        error: "Valid user ID is required",
        success: false,
      });
    }

    // Get chat history
    const query = `
      SELECT 
        id,
        response_text,
        timestamp,
        created_at
      FROM ai_chat_responses 
      WHERE user_id = $1
      ORDER BY timestamp DESC 
      LIMIT $2 OFFSET $3
    `;

    const result = await pool.query(query, [
      parseInt(userId),
      parseInt(limit),
      parseInt(offset),
    ]);

    // Get total count for pagination
    const countResult = await pool.query(
      `SELECT COUNT(*) FROM ai_chat_responses WHERE user_id = $1`,
      [parseInt(userId)]
    );
    const totalCount = parseInt(countResult.rows[0].count);

    res.json({
      success: true,
      data: result.rows,
      pagination: {
        total: totalCount,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: parseInt(offset) + parseInt(limit) < totalCount,
      },
    });
  } catch (error) {
    console.error("Error fetching chat history:", error.message);
    res.status(500).json({
      error: "Unable to fetch chat history",
      success: false,
    });
  }
});

app.get("/", (req, res) => {
  res.send("API is running!");
});

// Register route
app.use("/api/register", registerRoute);

// Login route
app.use("/api/login", loginRoute);

// Profile route (protected)
app.use("/api/profile", profileRoute);

//error handling middleware

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);

  // Test if server is actually responding
  setTimeout(() => {
    import("http").then((http) => {
      const req = http.default.get(`http://localhost:${PORT}`, (res) => {
        if (res.headers.server && res.headers.server.includes("AirTunes")) {
          console.error("❌ WARNING: Port is being used by Apple AirPlay!");
          console.error("❌ Change PORT to a different number (like 3001)");
        } else {
          console.log("✅ Server is responding correctly");
        }
      });
      req.on("error", () => {
        console.log("✅ Server test completed");
      });
    });
  }, 1000);
});
