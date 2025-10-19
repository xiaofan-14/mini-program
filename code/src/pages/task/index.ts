import { getTaskList } from 'src/api/api'
import type { TaskType } from 'src/type'
import { formatTime } from 'src/utils/util'

Page({
  data: {
    navHeight: 64,
    activeTab: 'pending',
    tasks: [] as TaskType[],
    formatTime: formatTime,
    page: 1,
    pageSize: 10,
    hasMore: true
  },
  async onLoad() {
    // 获取状态栏 + 导航栏高度
    const windowInfo = wx.getWindowInfo();
    this.setData({ navHeight: windowInfo.statusBarHeight + 44 });
    this.loadPage(1, true);
  },
  // 下拉刷新
  async onPullDownRefresh() {
    await this.loadPage(1, true);
    wx.stopPullDownRefresh(); // 必须手动停止
  },
  // 上拉加载更多
  async onReachBottom() {
    if (!this.data.hasMore) return;
    await this.loadPage(this.data.page + 1, false);
  },
  // 统一分页请求
  async loadPage(page: number, refresh: boolean) {
    wx.showLoading({ title: '加载中...', mask: true });
    const { pageSize } = this.data;
    const {list, hasMore, page: currentPage }  = await getTaskList(page, pageSize) as {
     list: TaskType[],
     hasMore: boolean,
     page: number
    }
    const newTasks = refresh ? list : this.data.tasks.concat(list);
    this.setData({
      tasks: newTasks,
      page: currentPage,
      hasMore: hasMore
    });
    wx.hideLoading();
  },
});

