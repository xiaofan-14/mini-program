import express from 'express';
import { login, getProfile } from '../controllers/authController';
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post('/login', login);
router.get('/profile',authMiddleware, getProfile);

export default router;
