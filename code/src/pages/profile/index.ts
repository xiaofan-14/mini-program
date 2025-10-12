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

  getUserProfile() {
    wx.getUserProfile({
      desc: '用于完善个人资料', // 必填
      success: res => {
        console.log(res.userInfo) // 这里就是你自己的微信信息
        this.setData({ userInfo: res.userInfo })
        wx.setStorageSync('userInfo', res.userInfo) // 可缓存
      },
      fail: () => {
        wx.showToast({ title: '授权失败', icon: 'none' })
      }
    })
  }, 

  onLoad() {
    const windowInfo = wx.getWindowInfo();
    const statusBarHeight = windowInfo.statusBarHeight;
    const navHeight = statusBarHeight + 44;
    this.setData({ statusBarHeight, navHeight });
    const cachedUser = wx.getStorageSync('userInfo')
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
