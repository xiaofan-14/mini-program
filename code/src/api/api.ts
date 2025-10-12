import { post } from "../utils/https";

// 登录
export async function signin(code: string, userInfo: WechatMiniprogram.UserInfo) {
  return await post('auth/login', {
    code,
    nickName: userInfo.nickName,
    avatarUrl: userInfo.avatarUrl
  });
}