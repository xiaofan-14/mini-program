import express from 'express';
import { getTransactions, getTransactionsDetail } from '../controllers/transactionController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getTransactions);
router.get('/detail', getTransactionsDetail);

export default router;
