import jwt from 'jsonwebtoken';
import { prisma } from '../prisma/client';
import { getWechatSession } from '../services/wechatService';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function login(req: any, res: any) {
  try {
    const { code, nickName, avatarUrl } = req.body;
    if (!code) return res.status(400).json({ error: 'code is required' });

    const wxData = await getWechatSession(code);
    const { openid, unionid, errcode, errmsg } = wxData as any;

    if (errcode) return res.status(400).json({ error: errmsg });

    let user = await prisma.user.findUnique({ where: { openid } });

    if (!user) {
      user = await prisma.user.create({
        data: { openid, unionid, nickName, avatarUrl },
      });
    } else {
      const updates: any = {};
      if (nickName && nickName !== user.nickName) updates.nickName = nickName;
      if (avatarUrl && avatarUrl !== user.avatarUrl) updates.avatarUrl = avatarUrl;

      if (Object.keys(updates).length) {
        user = await prisma.user.update({ where: { id: user.id }, data: updates });
      }
    }

    const token = jwt.sign({ userId: user.id, openid: user.openid }, JWT_SECRET, {
      expiresIn: '30d',
    });

    res.json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '服务器错误' });
  }
}

export async function getProfile(req: any, res: any) {
  try {
    const userId = req.userId;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ error: '用户未找到' });
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '服务器错误' });
  }
}
