import axios from 'axios';

const WECHAT_APPID = process.env.WECHAT_APPID!;
const WECHAT_SECRET = process.env.WECHAT_SECRET!;

export async function getWechatSession(code: string) {
  const res = await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
    params: {
      appid: WECHAT_APPID,
      secret: WECHAT_SECRET,
      js_code: code,
      grant_type: 'authorization_code',
    },
  });
  return res.data;
}
