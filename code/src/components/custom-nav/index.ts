Component({
  options: {
    styleIsolation: 'shared'
  },
  properties: {
    title: {
      type: String,
      value: '默认标题'
    }
  },
  data: {
    statusBarHeight: 20,
    navHeight: 64
  },
  lifetimes: {
    attached() {
      const info = wx.getWindowInfo();
      const statusBarHeight = info.statusBarHeight || 20;
      const navHeight = statusBarHeight + 44;
      this.setData({ statusBarHeight, navHeight });
    }
  }
});
