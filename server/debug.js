console.log("🔍 Starting simple debug test...");

// Test 1: Check if environment variables are loaded
console.log("📋 Environment variables:");
console.log("- PGHOST:", process.env.PGHOST);
console.log("- PGUSER:", process.env.PGUSER);
console.log("- PGDATABASE:", process.env.PGDATABASE);
console.log("- PGPORT:", process.env.PGPORT);
console.log("- JWT_SECRET exists:", !!process.env.JWT_SECRET);
console.log("- OPENAI_API_KEY exists:", !!process.env.OPENAI_API_KEY);

// Test 2: Try importing modules
try {
  console.log("📦 Testing module imports...");
  const express = await import("express");
  console.log("✅ Express imported successfully");

  const cors = await import("cors");
  console.log("✅ CORS imported successfully");

  const dotenv = await import("dotenv");
  console.log("✅ Dotenv imported successfully");

  // Load .env file
  dotenv.config();
  console.log("✅ Environment variables loaded");
} catch (error) {
  console.error("❌ Module import failed:", error.message);
}

// Test 3: Try creating Express app
try {
  const express = await import("express");
  const app = express.default();
  console.log("✅ Express app created successfully");
} catch (error) {
  console.error("❌ Express app creation failed:", error.message);
}

console.log("🎉 Basic tests completed!");
