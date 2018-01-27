//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    longitude: 0,
    latitude: 0,
    count: 1,
    switch_id_prefix: "sel-",
    objectArray: [
      { unique: '钱  多', value: true },
      { unique: '事  少', value: false },
      { unique: '离家近', value: false },
//      { unique: '年  轻', value: false },
//      { unique: '娇  妻', value: false },
//      { unique: '父母健在', value: false },
    ]
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
  add: function(e){
    this.setData({
      count: this.data.count + 1
    })
  },

  selectCondition: function(e){
    console.log(this.data.objectArray)
    console.log(e)

    var sel_idx = e.target.id.substr(this.data.switch_id_prefix.length) 

    this.data.objectArray[sel_idx].value = e.detail.value
    var cnt = 0
    for (let el of this.data.objectArray){
      if (el.value == true)
       cnt++
    }
    console.log("sel idx: " + sel_idx + ", selected cnt:" + cnt)
    if (cnt == this.data.objectArray.length){
      console.log("in loop. ")
      var unsel_idx = sel_idx
      if (this.data.objectArray.length == 1){
        console.log("single switch ")
        return
      }
      else if (this.data.objectArray.length == 2){
        unsel_idx = (sel_idx == 0) ? 1 : 0
      }
      else {
        while (unsel_idx == sel_idx) {
          unsel_idx = parseInt(Math.random() * this.data.objectArray.length)
          console.log("random: " + unsel_idx)
        }
      }
      this.data.objectArray[unsel_idx].value = false
      console.log("unslect: " + unsel_idx)
    }
    
    this.setData({
      objectArray: this.data.objectArray
    })
    
  },

  switch: function (e) {
    const length = this.data.objectArray.length
    for (let i = 0; i < length; ++i) {
      const x = Math.floor(Math.random() * length)
      const y = Math.floor(Math.random() * length)
      const temp = this.data.objectArray[x]
      this.data.objectArray[x] = this.data.objectArray[y]
      this.data.objectArray[y] = temp
    }
    this.setData({
      objectArray: this.data.objectArray
    })
  },
})
