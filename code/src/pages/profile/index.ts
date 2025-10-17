import { signin } from '../../api/api'
import { useCache } from '../../hooks/useCache'

const { setCache, getCache } = useCache();

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
  },

  onLoad() {
    const windowInfo = wx.getWindowInfo();
    const statusBarHeight = windowInfo.statusBarHeight;
    const navHeight = statusBarHeight + 44;
    this.setData({ statusBarHeight, navHeight });
    const cachedUser = getCache('user') as WechatMiniprogram.UserInfo

    if (cachedUser) {
      this.setData({ userInfo: cachedUser })
    }
  },

  goToTasks(e: any) {
    const type = e.currentTarget.dataset.type
    wx.navigateTo({ url: `/pages/tasks/index?type=${type}` })
  },

  goToIncome() {
    wx.navigateTo({ url: '/pages/income/index' })
  },

  goToSettings() {
    wx.navigateTo({ url: '/pages/settings/index' })
  },

  async onNickNameInput(e: any) {
    const nickName = e.detail.value
    const temp = this.data.userInfo
    temp.nickName = nickName
    this.setData({
      userInfo: temp,
    });
    await this.handleLogin()
  },

  async onChooseAvatar(e: any) {
    const { avatarUrl } = e.detail
    const temp = this.data.userInfo
    temp.avatarUrl = avatarUrl
    this.setData({ userInfo: temp });
    await this.handleLogin()
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
      setCache('user', user);

      wx.showToast({ title: '登录成功', icon: 'success' });
    } catch (err) {
      console.error(err);
      wx.showToast({ title: '登录失败', icon: 'error' });
    }
  },
})
