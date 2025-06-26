import express from "express";
import cors from "cors";
import registerRoute from "./routes/register.js";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running!");
});

// Register route
app.use("/api/register", registerRoute);

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
