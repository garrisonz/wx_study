//logs.js
const util = require('../../../utils/util.js')

Page({
  data: {
    logs: [],
    longitude: 0,
    latitude: 0,
    count: 1
  },
  onLoad: function () {
    wx.getLocation({
      success: res => {
        this.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
      }
    })
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  handleTap1: function(e) {
    console.log("handleTap1:")
    console.log(e)
  },
  handleTap2: function (e) {
    console.log("handleTap2:")
    console.log(e)
  },
  handleTap3: function (e) {
    console.log("handleTap3:")
    console.log(e)
  },
  handleTap4: function (e) {
    console.log("handleTap4:")
    console.log(e)
  }
})
