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
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;

  // 2. 计算偏移
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  // 3. 并行查「总条数」和「当页数据」
  const [total, rows] = await Promise.all([
    prisma.task.count(), // 总条数
    prisma.task.findMany({
      skip,
      take,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  // 4. 返回前端需要的数据结构
  res.json({
    total, // 总条数
    list: rows, // 当页数据
    page,
    pageSize,
    hasMore: skip + rows.length < total, // 是否还有下一页
  });
}

export async function taskDetail(req: any, res: any) {
  const id = req.query.id;
  const tasks = await prisma.task.findFirst({
    where: { id: id },
    include: {
      publisher: true,
      receiver: true,
    },
  });

  res.json(tasks);
}

export async function deleteTask(req: any, res: any) {
  const userId = req.userId;
  const { taskId } = req.body;

  if (!userId) return res.status(401).json({ error: "未登录" });
  if (!taskId) return res.status(400).json({ error: "缺少任务ID" });
  try {
    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) return res.status(404).json({ error: "任务不存在" });
    if (task.publisherId !== userId)
      return res.status(403).json({ error: "无权限删除此任务" });

    // 如果任务未被领取，返还余额
    if (task.status === "PENDING" && !task.receiverId) {
      await prisma.$transaction(async (tx) => {
        // 1. 返还余额
        await tx.user.update({
          where: { id: userId },
          data: { balance: { increment: Number(task.reward) } },
        });

        // 2. 记录交易日志（在任务删除前）
        await tx.transaction.create({
          data: {
            userId,
            type: "REFUND",
            amount: Number(task.reward),
            status: "COMPLETED",
            taskId,
          },
        });

        // 3. 删除任务
        await tx.task.delete({ where: { id: taskId } });
      });
    } else {
      // 若任务已被领取或完成，禁止删除
      return res.status(400).json({ error: "任务已被领取或已完成，无法删除" });
    }

    res.json({ message: "任务已删除并返还余额" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "删除任务失败" });
  }
}

export async function listMyPublishedTasks(req: any, res: any) {
  const userId = req.userId;
  if (!userId) return res.status(401).json({ error: "未登录" });

  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;

  const result = await paginateTasks({ publisherId: userId }, page, pageSize);
  res.json(result);
}

export async function listMyReceivedTasks(req: any, res: any) {
  const userId = req.userId;
  if (!userId) return res.status(401).json({ error: "未登录" });

  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;

  const result = await paginateTasks({ receiverId: userId }, page, pageSize);

  res.json(result);
}

async function paginateTasks(where: any, page = 1, pageSize = 10) {
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const [total, rows] = await Promise.all([
    prisma.task.count({ where }),
    prisma.task.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return {
    total,
    list: rows,
    page,
    pageSize,
    hasMore: skip + rows.length < total,
  };
}

export async function receiveTask(req: any, res: any) {
  const userId = req.userId; // 当前登录用户
  const { taskId } = req.body;

  if (!userId) return res.status(401).json({ error: "未登录" });
  if (!taskId) return res.status(400).json({ error: "缺少任务ID" });

  try {
    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) return res.status(404).json({ error: "任务不存在" });

    // 不能领取自己发布的任务
    if (task.publisherId === userId) {
      return res.status(400).json({ error: "不能领取自己发布的任务" });
    }

    // 已被他人领取
    if (task.receiverId) {
      return res.status(400).json({ error: "该任务已被领取" });
    }

    // 更新任务状态与领取人
    const updated = await prisma.task.update({
      where: { id: taskId },
      data: {
        receiverId: userId,
        status: "ACCEPTED", // 进行中
      },
    });

    res.json({ message: "领取成功", task: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "领取失败" });
  }
}

export async function completeTask(req: any, res: any) {
  const userId = req.userId;
  const { taskId } = req.body;

  if (!userId) return res.status(401).json({ error: "未登录" });
  if (!taskId) return res.status(400).json({ error: "缺少任务ID" });

  try {
    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) return res.status(404).json({ error: "任务不存在" });

    if (task.receiverId !== userId)
      return res.status(403).json({ error: "无权限完成此任务" });

    if (task.status === "COMPLETED")
      return res.status(400).json({ error: "任务已完成" });

    const reward = Number(task.reward);

    const [updatedTask] = await prisma.$transaction([
      // 更新任务状态
      prisma.task.update({
        where: { id: taskId },
        data: { status: "COMPLETED" },
      }),
      // 增加接单者余额
      prisma.user.update({
        where: { id: userId },
        data: { balance: { increment: reward } },
      }),
      // 记录交易日志
      prisma.transaction.create({
        data: {
          userId,
          type: "REWARD_INCOME", // 可在 enum TransactionType 添加
          amount: reward,
          status: "COMPLETED",
          taskId,
        },
      }),
    ]);

    res.json({ message: "任务已完成，佣金已发放", task: updatedTask });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "完成任务失败" });
  }
}

export async function cancelTask(req: any, res: any) {
  const userId = req.userId;
  const { taskId } = req.body;

  if (!userId) return res.status(401).json({ error: "未登录" });
  if (!taskId) return res.status(400).json({ error: "缺少任务ID" });

  try {
    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) return res.status(404).json({ error: "任务不存在" });

    // 领取者取消
    if (task.receiverId === userId) {
      const updated = await prisma.task.update({
        where: { id: taskId },
        data: {
          receiverId: null,
          status: "PENDING", // 回到待领取状态
        },
      });
      return res.json({ message: "已取消领取", task: updated });
    }

    // 发布者取消
    if (task.publisherId === userId) {
      const updated = await prisma.task.update({
        where: { id: taskId },
        data: {
          status: "CANCELLED",
        },
      });
      return res.json({ message: "任务已取消", task: updated });
    }

    res.status(403).json({ error: "无权限取消此任务" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "取消任务失败" });
  }
}
