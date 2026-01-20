import express from "express";
import { protect } from "../middleware/auth.js";
import { restrictTo } from "../middleware/role.js";
import {
  getQuizzes,
  getQuiz,
  startAttempt,
  submitAttempt,
  leaderboard,
} from "../controllers/studentController.js";

const router = express.Router();

router.use(protect, restrictTo("student"));

router.get("/quizzes", getQuizzes);
router.get("/quizzes/:quizId", getQuiz);
router.post("/quizzes/:quizId/attempt", startAttempt);
router.post("/attempts/:attemptId/submit", submitAttempt);
router.get("/leaderboard", leaderboard);

export default router;
