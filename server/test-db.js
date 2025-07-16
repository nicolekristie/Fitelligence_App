import pool from "./db.js";

async function testDatabase() {
  try {
    console.log("🔍 Testing database connection...");

    // Test basic connection
    const result = await pool.query("SELECT NOW()");
    console.log("✅ Database connected successfully:", result.rows[0].now);

    // Check if ai_chat_responses table exists
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'ai_chat_responses'
      );
    `);

    console.log(
      "📋 ai_chat_responses table exists:",
      tableCheck.rows[0].exists
    );

    if (tableCheck.rows[0].exists) {
      // Count existing records
      const countResult = await pool.query(
        "SELECT COUNT(*) FROM ai_chat_responses"
      );
      console.log(
        "📊 Current AI responses in database:",
        countResult.rows[0].count
      );

      // Show table structure
      const structureResult = await pool.query(`
        SELECT column_name, data_type, is_nullable 
        FROM information_schema.columns 
        WHERE table_name = 'ai_chat_responses'
        ORDER BY ordinal_position;
      `);
      console.log("🏗️ Table structure:");
      structureResult.rows.forEach((col) => {
        console.log(
          `  - ${col.column_name}: ${col.data_type} (nullable: ${col.is_nullable})`
        );
      });
    } else {
      console.log("❌ Table ai_chat_responses does not exist!");
      console.log(
        "💡 You need to run the database.sql file to create the table."
      );
    }
  } catch (error) {
    console.error("❌ Database test failed:", error.message);
    console.error("Full error:", error);
  } finally {
    await pool.end();
  }
}

testDatabase();
