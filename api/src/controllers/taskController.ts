import {
  Task,
  TaskStatus,
  TransactionStatus,
  TransactionType,
} from "@prisma/client";
import { prisma } from "../prisma/client";

export async function publishTask(req: any, res: any) {
  try {
    const userId = req.userId;
    const {
      title,
      type,
      description,
      reward,
      pickupAddress,
      deliveryAddress,
      weight,
      deliveryTime,
      genderRequirement,
      needBuilding,
      pickupCode,
      contactPhone,
      deadline,
    } = req.body as Task;

    // 1. 检查余额
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ error: "用户不存在" });
    if (user.balance < reward)
      return res.status(400).json({ error: "余额不足" });

    // 2. 扣除余额
    await prisma.user.update({
      where: { id: userId },
      data: { balance: { decrement: Number(reward) } },
    });

    // 3. 创建任务
    const task = await prisma.task.create({
      data: {
        title,
        type,
        description,
        reward: Number(reward),
        pickupAddress,
        deliveryAddress,
        weight,
        deliveryTime,
        genderRequirement,
        needBuilding,
        pickupCode,
        contactPhone,
        deadline: deadline ? new Date(deadline) : undefined,
        publisherId: userId,
        status: "PENDING",
      },
    });

    // 4. 记录交易
    await prisma.transaction.create({
      data: {
        userId,
        type: TransactionType.PUBLISH_CONSUME,
        amount: Number(reward),
        status: TransactionStatus.COMPLETED,
        taskId: task.id,
      },
    });

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "服务器错误" });
  }
}

export async function acceptTask(req: any, res: any) {
  try {
    const userId = req.userId;
    const { taskId } = req.body;

    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) return res.status(404).json({ error: "任务不存在" });
    if (task.receiverId) return res.status(400).json({ error: "任务已被接单" });

    // 接单
    await prisma.task.update({
      where: { id: taskId },
      data: { receiverId: userId, status: TaskStatus.ACCEPTED },
    });

    res.json({ message: "接单成功" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "服务器错误" });
  }
}

export async function listTasks(req: any, res: any) {
  // 1. 拿到分页参数（默认值：第 1 页，每页 10 条）
  const page     = Number(req.query.page)     || 1;
  const pageSize = Number(req.query.pageSize) || 10;

  // 2. 计算偏移
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  // 3. 并行查「总条数」和「当页数据」
  const [total, rows] = await Promise.all([
    prisma.task.count(),                       // 总条数
    prisma.task.findMany({
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  // 4. 返回前端需要的数据结构
  res.json({
    total,              // 总条数
    list: rows,         // 当页数据
    page,
    pageSize,
    hasMore: skip + rows.length < total, // 是否还有下一页
  });
}

export async function taskDetail(req: any, res: any) {
  const id = req.id;

  const tasks = await prisma.task.findFirst({
    where: { id: id },
    include: {
      publisher: true,
      receiver: true,
    },
  });

  res.json(tasks);
}
