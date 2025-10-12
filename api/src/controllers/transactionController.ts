import { prisma } from '../prisma/client';

export async function getTransactions(req: any, res: any) {
  const userId = req.userId;
  const transactions = await prisma.transaction.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
  res.json(transactions);
}
