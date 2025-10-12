interface PakcageType {
  type: string,
  weight: string,
  deliveryTime: string,
  gender: string,
  needBuilding: boolean,
  notes: string,
  price: number,
}

interface Address {
  address: string,
  name: string,
  phone: string
}

Page({
  data: {
    popupAnimation: {},
    statusBarHeight: 40,
    navHeight: 64,
    pickup: {} as Address,
    delivery: {} as Address,
    showPackageModal: false,
    packageInfo: {} as PakcageType,
    packageText: "",
    typeOptions: ['快递', '外卖', '资料', '其他'],
    weightOptions: ['小于2kg', '2~5kg', '5~10kg', '大于10kg'],
    timeOptions: ['24小时内', '8小时内', '4小时内', '1小时内'],
    genderOptions: ['不限性别', '男', '女'],
  },
  onLoad() {
    const windowInfo = wx.getWindowInfo();
    const statusBarHeight = windowInfo.statusBarHeight;
    const navHeight = statusBarHeight + 44;
    this.setData({ statusBarHeight, navHeight });
  },
  onShow() {
    const pickupData = wx.getStorageSync('pickupData');
    if (pickupData) {
      this.setData({
        pickup: {
          address: pickupData.address,
          name: pickupData.name,
          phone: pickupData.phone
        }
      });
    }
    const deliveryData = wx.getStorageSync('deliveryData');
    if (deliveryData) {
      this.setData({
        delivery: {
          address: deliveryData.address,
          name: deliveryData.name,
          phone: deliveryData.phone
        }
      });
    }
  },

  onPickerChange(e: any) {
    const field = e.currentTarget.dataset.field
    const value = e.detail.value
    // 对性别选择做转换
    if (field === 'gender') {
      const genders = ['不限', '男', '女']
      this.setData({ [`packageInfo.${field}`]: genders[value] })
    } else {
      this.setData({ [`packageInfo.${field}`]: value })
    }
  },
  showPackageModal() {
    this.setData({ showPackageModal: true })
    const animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease-out'
    })
    animation.translateY(0).opacity(1).step()
    this.setData({ popupAnimation: animation.export() })
  },
  closePackageModal() {
    const animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease-in'
    })
    animation.translateY(100).opacity(0).step()
    this.setData({ popupAnimation: animation.export() })

    setTimeout(() => {
      this.setData({ showPackageModal: false })
    }, 300)
  },

  selectType(e: any) {
    const type = e.currentTarget.dataset.type
    this.setData({ 'packageInfo.type': type })
  },
  selectWeight(e: any) {
    const weight = e.currentTarget.dataset.weight
    this.setData({ 'packageInfo.weight': weight })
  },
  selectTime(e: any) {
    const time = e.currentTarget.dataset.time
    this.setData({ 'packageInfo.deliveryTime': time })
  },
  selectGender(e: any) {
    const gender = e.currentTarget.dataset.gender
    this.setData({ 'packageInfo.gender': gender })
  },
  onSwitchChange(e: any) {
    this.setData({ 'packageInfo.needBuilding': e.detail.value })
  },
  onInput(e: any) {
    const field = e.currentTarget.dataset.field
    this.setData({ [`packageInfo.${field}`]: e.detail.value })
  },
  savePackageInfo() {
    console.log(this.data.packageInfo)
    this.setData({ packageText: this.formatPackageInfo(this.data.packageInfo) })
    this.closePackageModal()
  },
  formatPackageInfo(packageInfo: PakcageType) {
    const { type, weight, deliveryTime, needBuilding, gender } = packageInfo

    // 构建描述
    const parts: string[] = []

    if (type) parts.push(type)
    if (weight) parts.push(weight)
    if (deliveryTime) parts.push(deliveryTime)
    // 进楼逻辑：true => “进楼”，false => “不进楼”
    parts.push(needBuilding ? '进楼' : '不进楼')
    if (gender) parts.push(gender)

    return parts.join(' / ')
  },
  go(e: any) {
    const type = e.currentTarget.dataset.type;
    wx.navigateTo({ url: `/pages/address/index?type=${type}` });
  },
});
