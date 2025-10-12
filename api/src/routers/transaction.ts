import express from 'express';
import { getTransactions } from '../controllers/transactionController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getTransactions);

export default router;
