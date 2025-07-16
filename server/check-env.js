import dotenv from "dotenv";

dotenv.config();

console.log("🔍 Environment Variables Check:");
console.log("PGUSER:", process.env.PGUSER ? "✅ Set" : "❌ Missing");
console.log("PGHOST:", process.env.PGHOST ? "✅ Set" : "❌ Missing");
console.log("PGDATABASE:", process.env.PGDATABASE ? "✅ Set" : "❌ Missing");
console.log("PGPASSWORD:", process.env.PGPASSWORD ? "✅ Set" : "❌ Missing");
console.log("PGPORT:", process.env.PGPORT ? "✅ Set" : "❌ Missing");
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "✅ Set" : "❌ Missing");
console.log(
  "OPENAI_API_KEY:",
  process.env.OPENAI_API_KEY ? "✅ Set" : "❌ Missing"
);

console.log("\n🔧 Current values (masked):");
console.log("PGUSER:", process.env.PGUSER);
console.log("PGHOST:", process.env.PGHOST);
console.log("PGDATABASE:", process.env.PGDATABASE);
console.log("PGPORT:", process.env.PGPORT);
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "[HIDDEN]" : "undefined");
console.log(
  "OPENAI_API_KEY:",
  process.env.OPENAI_API_KEY ? "[HIDDEN]" : "undefined"
);
