import { useCache } from 'src/hooks/useCache'
import type { AddressType } from 'src/type'

const { setCache, getCache } = useCache()

Page({
  data: {
    type: 'pickup',
    pageTitle: '取件信息',
    typeText: '取件',
    address: '',
    name: '',
    phone: '',
    statusBarHeight: 40,
    navHeight: 64
  },

  onLoad(options: any) {
    // 根据参数区分是取件还是送件
    const type = options.type || 'pickup';
    const typeText = type === 'pickup' ? '取件' : '送件';
    const pageTitle = typeText + '信息';

    // 获取状态栏高度
    const windowInfo = wx.getWindowInfo();
    const statusBarHeight = windowInfo.statusBarHeight;
    const navHeight = statusBarHeight + 40;

    // 尝试加载已保存的数据
    const savedData = getCache(`${type}Data`) as AddressType;

    if (savedData) {
      this.setData({
        address: savedData.address || '',
        name: savedData.name || '',
        phone: savedData.phone || ''
      })
    }

    this.setData({
      type,
      typeText,
      pageTitle,
      statusBarHeight,
      navHeight,
    });
  },

  onInput(e: any) {
    const field = e.currentTarget.dataset.field;
    this.setData({ [field]: e.detail.value });
  },

  onSubmit() {
    const { type, address, name, phone } = this.data;

    setCache(`${type}Data`, { address, name, phone }, 86400);

    wx.showToast({ title: '保存成功', icon: 'success', duration: 1500 });
    wx.navigateBack();
  }
});
