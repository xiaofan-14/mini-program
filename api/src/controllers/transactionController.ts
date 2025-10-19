import { prisma } from "../prisma/client";

export async function getTransactions(req: any, res: any) {
  const userId = req.userId;
  const transactions = await prisma.transaction.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      task: true,
      user: true,
    },
  });
  res.json(transactions);
}

export async function getTransactionsDetail(req: any, res: any) {
  const userId = req.userId;
  const transactions = await prisma.transaction.findFirst({
    where: { userId, id: req.query.id },
    orderBy: { createdAt: "desc" },
    include: {
      task: true,
      user: true,
    },
  });
  res.json(transactions);
}
