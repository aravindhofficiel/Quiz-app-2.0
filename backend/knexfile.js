import dotenv from "dotenv";
dotenv.config();

export default {
  development: {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST,
      port: 3306, // IMPORTANT
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: {
        rejectUnauthorized: false // REQUIRED for Aiven
      }
    },
    migrations: {
      directory: "./src/db/migrations"
    }
  }
};
