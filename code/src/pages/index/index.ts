// index.ts
// 获取应用实例
const app = getApp<IAppOption>()
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    statusBarHeight: 40,
    navHeight: 64,
    pickup: {
      address: "",
      name: "",
      phone: ""
    },
    delivery: {
      address: "",
      name: "",
      phone: ""
    }
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

  onShow() {
    const pickupData = wx.getStorageSync('pickupData');
    if (pickupData) {
      this.setData({
        pickup: {
          address: pickupData.address,
          name: pickupData.name,
          phone: pickupData.phone
        }
      });
    }
    const deliveryData = wx.getStorageSync('deliveryData');
    if (deliveryData) {
      this.setData({
        delivery: {
          address: deliveryData.address,
          name: deliveryData.name,
          phone: deliveryData.phone
        }
      });
    }
  },

  go(e: any) {
    const type = e.currentTarget.dataset.type;
    wx.navigateTo({ url: `/pages/address/index?type=${type}` });
  },

  publish() {
    wx.navigateTo({ url: "/pages/publish/index" })
  }
})

