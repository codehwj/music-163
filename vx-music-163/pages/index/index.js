//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    navList: [{
      title: "推荐音乐",
      path: "recommend",
      hide: false,
      icon: "",
    },
    {
      title: "热歌榜",
      path: "hotMusic",
      hide: false,
      icon: "",
    },
    {
      title: "搜索",
      path: "search",
      hide: false,
      icon: "",
    }],
    navIndex: 0,
    navActivePath: "recommend"
  },
  clickMe: function() {
    wx.navigateTo({url: `../compoment/text/text`})
  },
  switchNav(e) {
    console.log(e.currentTarget.dataset["item"].path);
    this.setData({
      navIndex: e.currentTarget.dataset["index"],
      navActivePath: e.currentTarget.dataset["item"].path
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          console.log(res);
          
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
