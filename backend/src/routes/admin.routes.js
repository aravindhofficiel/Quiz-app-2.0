import express from "express";
import { protect } from "../middleware/auth.js";
import { restrictTo } from "../middleware/role.js";
import { createUser, getUsers, deleteUser } from "../controllers/admin.controller.js";

const router = express.Router();

router.use(protect, restrictTo("admin"));

router.post("/users", createUser);
router.get("/users", getUsers);
router.delete("/users/:id", deleteUser);

export default router;
