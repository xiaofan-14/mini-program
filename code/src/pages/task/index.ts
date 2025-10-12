Page({
  data: {
    navHeight: 64,
    tasks: [
      {
        id: 1,
        type: '快递代取',
        pickupAddress: '东门菜鸟驿站',
        deliveryAddress: '宿舍楼 A 栋',
        weight: '2~5kg',
        deliveryTime: '8小时内',
        genderRequirement: '男',
        needBuilding: true,
        price: 5,
        status: '待接单'
      },
      {
        id: 2,
        type: '代买饭',
        pickupAddress: '二食堂',
        deliveryAddress: '宿舍楼 B 栋',
        weight: '<2kg',
        deliveryTime: '2小时内',
        genderRequirement: '不限',
        needBuilding: false,
        price: 8,
        status: '进行中'
      },
      {
        id: 3,
        type: '代买饭',
        pickupAddress: '二食堂',
        deliveryAddress: '宿舍楼 B 栋',
        weight: '<2kg',
        deliveryTime: '2小时内',
        genderRequirement: '不限',
        needBuilding: false,
        price: 8,
        status: '进行中'
      },
      {
        id: 4,
        type: '代买饭',
        pickupAddress: '二食堂',
        deliveryAddress: '宿舍楼 B 栋',
        weight: '<2kg',
        deliveryTime: '2小时内',
        genderRequirement: '不限',
        needBuilding: false,
        price: 8,
        status: '进行中'
      },
      {
        id: 5,
        type: '代买饭',
        pickupAddress: '二食堂',
        deliveryAddress: '宿舍楼 B 栋',
        weight: '<2kg',
        deliveryTime: '2小时内',
        genderRequirement: '不限',
        needBuilding: false,
        price: 8,
        status: '进行中'
      },
      {
        id: 6,
        type: '代买饭',
        pickupAddress: '二食堂',
        deliveryAddress: '宿舍楼 B 栋',
        weight: '<2kg',
        deliveryTime: '2小时内',
        genderRequirement: '不限',
        needBuilding: false,
        price: 8,
        status: '进行中'
      }
    ]
  },

  viewTaskDetail(e: any) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/tasks/detail?id=${id}`
    });
  },

  onLoad() {
    // 获取状态栏 + 导航栏高度
    const windowInfo = wx.getWindowInfo();
    this.setData({ navHeight: windowInfo.statusBarHeight + 44 });
  },

  go(){
    wx.navigateTo({ url: '/pages/task-detail/index' })
  }
});
