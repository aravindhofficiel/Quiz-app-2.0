import express from "express";
import { protect } from "../middleware/auth.js";
import { restrictTo } from "../middleware/role.js";
import {
  createQuiz,
  getQuizzes,
  createQuestion,
  getQuestions,
  deleteQuestion,
} from "../controllers/teacherController.js";

const router = express.Router();

router.use(protect, restrictTo("teacher"));

router.post("/quizzes", createQuiz);
router.get("/quizzes", getQuizzes);

router.post("/quizzes/:quizId/questions", createQuestion);
router.get("/quizzes/:quizId/questions", getQuestions);
router.delete("/questions/:id", deleteQuestion);

export default router;
