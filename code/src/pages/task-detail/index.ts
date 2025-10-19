import {
  getTaskDetail,
  receiveTask,
  deleteTask,
  completeTask,
  cancelTask
} from 'src/api/api'
import { cleanAddress } from 'src/utils/util'

Page({
  data: {
    taskId: '',
    task: {
      id: "",
      title: "",
      type: "",
      description: "",
      reward: 0,
      status: "",
      pickupAddress: "",
      deliveryAddress: "",
      weight: "",
      deliveryTime: "",
      genderRequirement: "男",
      needBuilding: true,
      pickupCode: "",
      contactPhone: "",
      publisherId: "",
      receiverId: null,
      deadline: "",
      createdAt: "",
      updatedAt: "",
      publisher: {
        id: "",
        openid: "",
        unionid: null,
        nickName: "",
        avatarUrl: "",
        gender: null,
        city: null,
        province: null,
        country: null,
        balance: 0,
        totalIncome: 0,
        pendingIncome: 0,
        withdrawn: 0,
        createdAt: "",
        updatedAt: ""
      },
      receiver: {
        id: "",
        openid: "",
        unionid: null,
        nickName: "",
        avatarUrl: "",
        gender: null,
        city: null,
        province: null,
        country: null,
        balance: 0,
        totalIncome: 0,
        pendingIncome: 0,
        withdrawn: 0,
        createdAt: "",
        updatedAt: ""
      }
    },
    rules: [
      '请慎重接单，接单即代表你承诺履行责任。',
      '请确保手机畅通，无法接通将导致订单取消且账号被限制。',
      '违规、跳过平台交易将导致账号被限制。'
    ],
    from: 'hall'
  },

  async onLoad(options: { id?: string, from?: string }) {
    if (options.id) {
      const res = await getTaskDetail(options.id)
      res.pickupAddress = cleanAddress(res.pickupAddress)
      res.deliveryAddress = cleanAddress(res.deliveryAddress)
      this.setData({ task: res })
    }
    if (options.from) {
      this.setData({ from: options.from })
    }
  },

  async acceptTask() {
    try {
      await receiveTask({ taskId: this.data.task.id })
      wx.showToast({ title: '已接单', icon: 'success' })
    } catch (e) {
      wx.showToast({ title: e, icon: 'success' })
    }
  },
  // 完成任务
  async completeTask() {
    const { task } = this.data
    wx.showModal({
      title: '确认完成任务？',
      success: async res => {
        if (res.confirm) {
          try {
            await completeTask({ taskId: task.id })
            wx.showToast({ title: '任务已完成' })
            setTimeout(() => wx.navigateBack(), 800)
          } catch (e) {
            wx.showToast({ title: '操作失败' })
          }
        }
      },
    })
  },
  // 取消任务
  async cancelTask() {
    const { task } = this.data
    wx.showModal({
      title: '确认完成任务？',
      success: async res => {
        if (res.confirm) {
          try {
            await cancelTask({ taskId: task.id })
            wx.showToast({ title: '任务已取消' })
            setTimeout(() => wx.navigateBack(), 800)
          } catch (e) {
            wx.showToast({ title: '取消失败' })
          }
        }
      },
    })
  },
  // 删除任务
  async deleteTask() {
    const { task } = this.data
    wx.showModal({
      title: '确认删除任务？',
      success: async res => {
        if (res.confirm) {
          try {
            await deleteTask({ taskId: task.id })
            wx.showToast({ title: '任务已删除' })
            setTimeout(() => wx.navigateBack(), 800)
          } catch (e) {
            wx.showToast({ title: '删除失败' })
          }
        }
      },
    })
  },
})

