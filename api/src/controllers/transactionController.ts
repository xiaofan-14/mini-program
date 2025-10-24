import { prisma } from "../prisma/client";
import { TransactionType, TransactionStatus } from "@prisma/client";

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

// 用户充值
export async function recharge(req: any, res: any) {
  try {
    const userId = req.userId;
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "充值金额无效" });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ error: "用户不存在" });

    // 更新余额
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        balance: { increment: amount },
        totalIncome: { increment: amount },
      },
    });

    // 记录交易
    await prisma.transaction.create({
      data: {
        userId,
        amount,
        type: TransactionType.RECHARGE,
        status: TransactionStatus.COMPLETED,
      },
    });

    res.json({
      message: "充值成功",
      balance: updatedUser.balance,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "服务器错误" });
  }
}

// 用户提现
export async function withdraw(req: any, res: any) {
  try {
    const userId = req.userId;
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "提现金额无效" });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ error: "用户不存在" });

    if (user.balance < amount) {
      return res.status(400).json({ error: "余额不足" });
    }

    // 更新余额
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        balance: { decrement: amount },
        withdrawn: { increment: amount },
      },
    });

    // 记录交易
    await prisma.transaction.create({
      data: {
        userId,
        amount,
        type: TransactionType.WITHDRAW,
        status: TransactionStatus.COMPLETED,
      },
    });

    res.json({
      message: "提现成功",
      balance: updatedUser.balance,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "服务器错误" });
  }
}
