import dotenv from 'dotenv';
import app from './app.js';
import pool from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Test DB connection
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log('✅ MySQL Connected');
    conn.release();
  } catch (err) {
    console.error('❌ DB Error:', err.message);
  }
})();

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
