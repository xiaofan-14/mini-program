import { formatTime } from 'src/utils/util';
import type { TransactionType } from 'src/type';
import { getTransactionDetail } from 'src/api/api'

Page({
  data: {
    transaction: {} as TransactionType,
    formatTime,
    navHeight: 64,
    statusBarHeight: 20,
  },
  async onLoad(options: any) {
    const { id } = options;
    const info = wx.getWindowInfo();
    const statusBarHeight = info.statusBarHeight || 20;
    const navHeight = statusBarHeight + 44;
    this.setData({ statusBarHeight, navHeight });
    await this.fetchTransaction(id);
  },
  async fetchTransaction(id: string) {
    try {
      const res = await getTransactionDetail(id);
      this.setData({ transaction: res });
    } catch (err) {
      console.error(err);
      wx.showToast({ title: '获取交易失败', icon: 'none' });
    }
  },
  onBack() {
    wx.navigateTo({ url: '/pages/income-detail/index' })
  }
});
