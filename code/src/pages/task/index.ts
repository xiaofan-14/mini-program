import { getTaskList } from 'src/api/api'
import type { TaskType } from 'src/type'
import { formatTime } from 'src/utils/util'

Page({
  data: {
    navHeight: 64,
    activeTab: 'pending',
    tasks: [] as TaskType[],
    formatTime: formatTime
  },
  async onLoad() {
    // 获取状态栏 + 导航栏高度
    const windowInfo = wx.getWindowInfo();
    this.setData({ navHeight: windowInfo.statusBarHeight + 44 });
    const res = await getTaskList() as TaskType[]
    this.setData({ tasks: res })
  },
  switchTab(e: any) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ activeTab: tab }, () => {
      
    });
  },
  viewTaskDetail(e: any) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/task-detail/index?id=${id}` });
  },
  go() {
    wx.navigateTo({ url: '/pages/task-detail/index' })
  },
  get formatTime(){
    return this.data.formatTime
  }
});

