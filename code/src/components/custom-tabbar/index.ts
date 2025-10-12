Component({
  options: {
    styleIsolation: 'shared'
  },
  properties: {
    active: {
      type: String,
      value: 'home'
    },
  },
  methods: {
    goHome() {
      wx.switchTab({ url: "/pages/index/index" })
    },
    goTask() {
      wx.switchTab({ url: "/pages/task/index" })
    },
    goProfile() {
      wx.switchTab({ url: "/pages/profile/index" })
    }    
  }
});
