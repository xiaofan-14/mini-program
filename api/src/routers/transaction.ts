import express from 'express';
import { getTransactions, getTransactionsDetail, recharge, withdraw } from '../controllers/transactionController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getTransactions);
router.get('/detail', getTransactionsDetail);
router.post('/recharge', recharge)
router.post('/withdraw', withdraw)

export default router;
