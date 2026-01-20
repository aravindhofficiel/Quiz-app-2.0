import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import teacherRoutes from "./routes/teacher.routes.js";
import studentRoutes from "./routes/student.routes.js";

const app = express();

/* ===============================
   MIDDLEWARE
================================ */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://quiz-app-2-0-zoe6.vercel.app"
    ],
    credentials: true
  })
);

app.use(express.json());

/* ===============================
   HEALTH CHECK
================================ */
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

/* ===============================
   ROUTES
================================ */
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/student", studentRoutes);

/* ===============================
   404 HANDLER
================================ */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found"
  });
});

export default app;
