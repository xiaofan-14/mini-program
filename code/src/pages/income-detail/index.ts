import { formatTime } from 'src/utils/util';
import type { TransactionType } from 'src/type';
import { getTransactions } from 'src/api/api'

Page({
  data: {
    navHeight: 64,
    summary: {
      totalIncome: 0,
      pendingIncome: 0,
      withdrawn: 0
    },
    transactions: [] as TransactionType[],
    formatDate: formatTime
  },

  async onLoad() {
    // 获取状态栏 + 导航栏高度
    const windowInfo = wx.getWindowInfo();
    this.setData({ navHeight: windowInfo.statusBarHeight + 44 });
    await this.fetchTransactions();
  },

  async fetchTransactions() {
    try {
     const res = await getTransactions() as TransactionType[]
     this.setData({ transactions: res })
    } catch (err) {
      console.error(err);
      wx.showToast({ title: '获取收益失败', icon: 'none' });
    }
  },
});
