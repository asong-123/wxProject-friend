// pages/near/near.js
const app = getApp()
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //经纬度
    longitude:'',
    latitude:'',
    //渲染头像到地图上
    markers:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getLocation();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getLocation();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getLocation(){
    wx.getLocation({
      type:'gcj02',
      success:(res)=>{
        const latitude=res.latitude
        const longitude=res.longitude
        this.setData({
          longitude,
          latitude
        })
        this.getNearUsers()
      }
    })
  },
  getNearUsers(){
    db.collection('users').where({
      location:_.geoNear({
        geometry:db.Geo.Point(this.data.longitude,this.data.latitude),
        minDistance:0,
        maxDistance:10000
      }),
      isLocation:true
    }).field({
      longitude:true,
      latitude:true,
      userPhoto:true
    }).get().then((res)=>{
      let result=[];
      if(res.data.length){
        for(let i=0;i<res.data.length;i++){
          result.push({
            iconPath:res.data[i].userPhoto,
            id:res.data[i]._id,
            latitude:res.data[i].latitude,
            longitude:res.data[i].longitude,
            width:30,
            height:30
          })
        }
        this.setData({
          markers:result
        })
      }
    })
  },
  markertap(e){
    console.log(e);
    wx.navigateTo({
      url: '/pages/detail/detail?userId='+e.detail.markerId
    })
  }
})