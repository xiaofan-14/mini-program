Page({
  data: {
    navHeight: 64,
    activeTab: 'pending',
    tasks: [
      { id: 1, type: '快递', price: 12, pickupAddress: '校门口', deliveryAddress: '宿舍楼', weight: '2kg', deliveryTime: '2小时内', genderRequirement: '不限', needBuilding: false, status: '待接单', category: 'pending' },
      { id: 2, type: '外卖', price: 8, pickupAddress: '食堂', deliveryAddress: '宿舍楼', weight: '1kg', deliveryTime: '1小时内', genderRequirement: '不限', needBuilding: true, status: '已接单', category: 'accepted' },
      { id: 3, type: '外卖', price: 8, pickupAddress: '食堂', deliveryAddress: '宿舍楼', weight: '1kg', deliveryTime: '1小时内', genderRequirement: '不限', needBuilding: true, status: '已接单', category: 'accepted' },
      { id: 4, type: '外卖', price: 8, pickupAddress: '食堂', deliveryAddress: '宿舍楼', weight: '1kg', deliveryTime: '1小时内', genderRequirement: '不限', needBuilding: true, status: '已接单', category: 'accepted' },
      { id: 5, type: '外卖', price: 8, pickupAddress: '食堂', deliveryAddress: '宿舍楼', weight: '1kg', deliveryTime: '1小时内', genderRequirement: '不限', needBuilding: true, status: '已接单', category: 'accepted' },
      { id: 6, type: '外卖', price: 8, pickupAddress: '食堂', deliveryAddress: '宿舍楼', weight: '1kg', deliveryTime: '1小时内', genderRequirement: '不限', needBuilding: true, status: '已接单', category: 'accepted' },
      { id: 7, type: '外卖', price: 8, pickupAddress: '食堂', deliveryAddress: '宿舍楼', weight: '1kg', deliveryTime: '1小时内', genderRequirement: '不限', needBuilding: true, status: '已接单', category: 'accepted' },
      { id: 7, type: '外卖', price: 8, pickupAddress: '食堂', deliveryAddress: '宿舍楼', weight: '1kg', deliveryTime: '1小时内', genderRequirement: '不限', needBuilding: true, status: '已接单', category: 'accepted' },
    ],
    filteredTasks: []
  },
  onLoad() {
    // 获取状态栏 + 导航栏高度
    const windowInfo = wx.getWindowInfo();
    this.setData({ navHeight: windowInfo.statusBarHeight + 44 });
    this.filterTasks();
  },
  switchTab(e: any) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ activeTab: tab }, () => {
      this.filterTasks();
    });
  },
  filterTasks() {
    const { tasks, activeTab } = this.data;
    const filtered = tasks.filter(task => task.category === activeTab);
    this.setData({ filteredTasks: filtered });
  },
  get filteredTasks() {
    return this.data.tasks.filter((task: any) => task.category === this.data.activeTab);
  },
  viewTaskDetail(e: any) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/task-detail/index?id=${id}` });
  },
  go() {
    wx.navigateTo({ url: '/pages/task-detail/index' })
  }
});

