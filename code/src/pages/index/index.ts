// index.ts
// 获取应用实例
const app = getApp<IAppOption>()
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    statusBarHeight: 40,
    navHeight: 64
  },

  onLoad() {
    const windowInfo = wx.getWindowInfo()
    const statusBarHeight = windowInfo.statusBarHeight
    const navHeight = statusBarHeight + 40

    this.setData({
      statusBarHeight,
      navHeight
    })
  },
})

