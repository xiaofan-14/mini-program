Page({
  data: {
    task: {
      pickupAddress: '东门菜鸟驿站',
      deliveryAddress: '二食堂',
      itemName: '快递包裹',
      weight: '2kg',
      quantity: 1,
      notes: '请尽快送达',
      needBuilding: true,
      price: 5.0,
      contactName: '张三',
      contactPhone: '138****1234',
      pickupCode: '123456'
    },
    rules: [
      '请慎重接单，接单即代表你承诺履行责任。',
      '请确保手机畅通，无法接通将导致订单取消且账号被限制。',
      '违规、跳过平台交易将导致账号被限制。'
    ]
  },

  acceptTask() {
    wx.showToast({ title: '已接单', icon: 'success' })
    // TODO: 调用 API 接单
  }
})
