import { signin } from '../../api/api'
import { useCache } from '../../hooks/useCache'

const { setCache, getCache, remove } = useCache();

Page({
  data: {
    userInfo: {
      nickName: "",
      avatarUrl: "",
    } as WechatMiniprogram.UserInfo,
    income: {
      total: 320.5,
      pending: 45.0,
      withdrawn: 275.5,
    },
    statusBarHeight: 40,
    navHeight: 64,
    isLogin: false
  },

  onLoad() {
    const windowInfo = wx.getWindowInfo();
    const statusBarHeight = windowInfo.statusBarHeight;
    const navHeight = statusBarHeight + 44;
    this.setData({ statusBarHeight, navHeight });

    const token = getCache('token');
    const cachedUser = getCache('user') as WechatMiniprogram.UserInfo

    if (token && cachedUser) {
      // token 有效，说明登录状态还在
      this.setData({
        isLogin: true,
        userInfo: cachedUser,
      });
    } else {
      // token 过期或不存在
      wx.showToast({
        title: '登录已过期，请重新登录',
        icon: 'none',
      });
      this.setData({ isLogin: false });
    }
    console.log(cachedUser)
  },

  async onNickNameInput(e: any) {
    const nickName = e.detail.value
    const temp = this.data.userInfo
    temp.nickName = nickName
    this.setData({
      userInfo: temp,
    });
  },

  async onChooseAvatar(e: any) {
    const { avatarUrl } = e.detail
    const temp = this.data.userInfo
    temp.avatarUrl = avatarUrl
    this.setData({ userInfo: temp });
  },

  async handleLogin() {
    try {
      if (!this.data.userInfo.avatarUrl || !this.data.userInfo.nickName) {
        wx.showToast({ title: '请先选择头像并输入昵称', icon: 'none' });
        return;
      }

      const loginRes = await wx.login();
      if (!loginRes.code) throw new Error('微信登录失败');

      const { token, user } = await signin(loginRes.code, this.data.userInfo);

      setCache('token', token, 86400);
      setCache('user', user, 86400);
      this.setData({ isLogin: true })

      wx.showToast({ title: '登录成功', icon: 'success' });
    } catch (err) {
      console.error(err);
      wx.showToast({ title: '登录失败', icon: 'error' });
    }
  },
  onLogout(){    
    remove('token');
    remove('user');
    this.setData({ isLogin: false })
    this.setData({ userInfo: {} as WechatMiniprogram.UserInfo })
    wx.showToast({ title: '退出成功', icon: 'success' });
  }
})
