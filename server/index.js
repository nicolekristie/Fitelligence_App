import express from "express";
import cors from "cors";
import registerRoute from "./routes/register.js";
import loginRoute from "./routes/login.js";
import profileRoute from "./routes/profile.js";
import OpenAI from "openai";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Initialize with API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

//Chat endpoints
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

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

    // Create completion with system context
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are an expert fitness coach for Fitelligence app. Provide helpful, motivating, and safe fitness advice. Format your responses clearly with:\n\n- Use bullet points for lists (• or -)\n- Number steps when giving instructions (1. 2. 3.)\n- Use line breaks to separate different topics\n- Keep responses concise but informative\n- Use an encouraging, professional tone\n- When giving workout routines, format them clearly with exercise names and reps/sets\n\nExample formatting:\nHere are some great exercises for beginners:\n\n• Push-ups: 3 sets of 8-12 reps\n• Squats: 3 sets of 10-15 reps\n• Plank: Hold for 30-60 seconds\n\nRemember to warm up before exercising!",
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
