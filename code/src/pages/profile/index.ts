import { signin } from '../../api/api'
import { useCache } from '../../hooks/useCache'

const { setCache, getCache } = useCache();

Page({
  data: {
    userInfo: {} as WechatMiniprogram.UserInfo,
    income: {
      total: 320.5,
      pending: 45.0,
      withdrawn: 275.5,
    },
    statusBarHeight: 40,
    navHeight: 64,
  },

  async getUserProfile() {
    wx.getUserProfile({
      desc: '用于完善个人资料',
      success: async (res) => {
        const userInfo = res.userInfo;
        this.setData({ userInfo });
        wx.setStorageSync('userInfo', userInfo);

        try {
          const loginRes = await wx.login();
          if (!loginRes.code) throw new Error('微信登录失败');

          const { token, user } = await signin(loginRes.code, userInfo);
          setCache('token', token, 86400);
          setCache('user', user);
          wx.showToast({ title: '登录成功', icon: 'success' });
        } catch (err) {
          console.error(err);
          wx.showToast({ title: '登录失败', icon: 'error' });
        }
      },
      fail: () => {
        wx.showToast({ title: '授权失败', icon: 'none' });
      }
    })
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
})
