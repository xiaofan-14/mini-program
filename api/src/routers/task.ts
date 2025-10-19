import express from "express";
import {
  publishTask,
  acceptTask,
  listTasks,
  taskDetail,
  listMyPublishedTasks,
  listMyReceivedTasks,
  receiveTask,
  completeTask,
  cancelTask,
  deleteTask
} from "../controllers/taskController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/publish", authMiddleware, publishTask);
router.post("/accept", authMiddleware, acceptTask);
router.get("/list", listTasks);
router.get("/task-detail", taskDetail);
router.get("/my-publish", authMiddleware, listMyPublishedTasks);
router.get("/my-received", authMiddleware, listMyReceivedTasks);
router.post("/receive-task", authMiddleware, receiveTask);
router.post("/complete-task", authMiddleware, completeTask);
router.post("/cancel-task", authMiddleware, cancelTask);
router.delete('/delete-task', authMiddleware, deleteTask);

export default router;
