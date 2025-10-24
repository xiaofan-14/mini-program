import { recharge, withdraw, profile } from 'src/api/api'
import { useCache } from 'src/hooks/useCache'
import type { UserInfo } from 'src/type'

const { getCache, setCache } = useCache()

Page({
  data: {
    balance: 0,
    showModal: false,
    modalType: '',
    inputAmount: '',
    statusBarHeight: 40,
    navHeight: 64,
  },

  onLoad() {
    const windowInfo = wx.getWindowInfo();
    const statusBarHeight = windowInfo.statusBarHeight;
    const navHeight = statusBarHeight + 44;
    this.setData({ statusBarHeight, navHeight });
    this.fetchBalance()
  },

  fetchBalance() {
    const user = getCache('user') as UserInfo
    if (user) {
      this.setData({
        balance: user.balance || 0
      })
    }
  },

  // 打开弹窗
  openRecharge() {
    this.setData({ showModal: true, modalType: 'recharge', inputAmount: '' })
  },
  openWithdraw() {
    this.setData({ showModal: true, modalType: 'withdraw', inputAmount: '' })
  },

  onAmountInput(e: any) {
    this.setData({ inputAmount: e.detail.value })
  },

  // 关闭弹窗
  closeModal() {
    this.setData({ showModal: false, inputAmount: '' })
  },

  async confirmAction() {
    const { modalType, inputAmount } = this.data
    const amount = parseFloat(inputAmount)

    if (!amount || amount <= 0) {
      wx.showToast({ title: '请输入有效金额', icon: 'none' })
      return
    }

    if (modalType === 'recharge') {
      await this.handleRecharge(amount)
    } else {
      await this.handleWithdraw(amount)
    } 
    const res = await profile()
    setCache('user', res.user)
    this.closeModal()
  },

  async handleRecharge(amount: number) {
    await recharge(amount)
    this.setData({ balance: this.data.balance + amount })
    wx.showToast({ title: `充值￥${amount}成功`, icon: 'success' })
  },

  async handleWithdraw(amount: number) {
    if (amount > this.data.balance) {
      wx.showToast({ title: '余额不足', icon: 'error' })
      return
    }
    await withdraw(amount)
    this.setData({ balance: this.data.balance - amount })
    wx.showToast({ title: `提现￥${amount}成功`, icon: 'success' })
  }
})
