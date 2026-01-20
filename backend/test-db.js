import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

try {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  console.log('✅ MySQL connected');
  await conn.end();
} catch (err) {
  console.error('❌ MySQL connection failed');
  console.error(err.message);
}
