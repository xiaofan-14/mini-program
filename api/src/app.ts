import express from 'express';
import cors from 'cors';
import authRoutes from './routers/auth';
import taskRoutes from './routers/task';
import transactionRoutes from './routers/transaction';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/task', taskRoutes);
app.use('/api/transaction', transactionRoutes);

export default app;
