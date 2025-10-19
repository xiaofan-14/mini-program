import { useCache } from 'src/hooks/useCache'
import type { AddressType } from 'src/type'

const { getCache } = useCache()

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
    const pickupData = getCache('pickupData') as AddressType
    if (pickupData) {
      this.setData({
        pickup: {
          address: pickupData.address || '',
          name: pickupData.name || '',
          phone: pickupData.phone || ''
        }
      });
    }
    const deliveryData = getCache('deliveryData') as AddressType
    if (deliveryData) {
      this.setData({
        delivery: {
          address: deliveryData.address || '',
          name: deliveryData.name || '',
          phone: deliveryData.phone || ''
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
