import express from "express";
import {
  publishTask,
  acceptTask,
  listTasks,
  taskDetail,
} from "../controllers/taskController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/publish", authMiddleware, publishTask);
router.post("/accept", authMiddleware, acceptTask);
router.get("/list", listTasks);
router.get("/task-detail", taskDetail);

export default router;
