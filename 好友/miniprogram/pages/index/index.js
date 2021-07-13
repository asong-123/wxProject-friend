// pages/index/index.js
const db=wx.cloud.database()
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[
      "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201812%2F13%2F20181213110202_strvd.thumb.700_0.jpg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1627697646&t=5871c146f2c90713558f30eb15992ae4",
      "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201610%2F25%2F20161025172115_xYcTS.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1627697646&t=56d26fcaec78e0ad7da485c9504cafdd",
      "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201808%2F22%2F20180822234348_lkspe.jpg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1627697646&t=d8083b7d89dad60bc6d16ed4e749b4c1"
    ],
    listData:[],
    current:'links'
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
    this.getListData()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
  //用云函数实现点赞自增
  handleLinks(e){
    let id=e.target.dataset.id;
    wx.cloud.callFunction({
      name:'update',
      data:{
        collection:'users',
        doc:id,
        data:"{links: _.inc(1)}"
      }
    }).then((res)=>{
      //页面同步变化
      let updated=res.result.stats.updated;
      if(updated){
        let cloneListData=[...this.data.listData];
        for(let i =0;i<cloneListData.length;i++){
          if(cloneListData[i]._id == id){
            cloneListData[i].links++
          }
        }
        this.setData({
          listData:cloneListData
        })
      }
    })
  },
  //tap切换
  handleCurrent(ev){
    let current=ev.target.dataset.current;
    if(current == this.data.current){
      return false;
    }
    this.setData({
      current
    },()=>{
      this.getListData()
    })
  },
  getListData(){
    db.collection('users').field({
      userPhoto:true,
      nickName:true,
      links:true
    })
    //排序 按current 属性排序
    .orderBy(this.data.current,'desc')
    .get().then((res)=>{
      console.log(res.data);
      this.setData({
        listData:res.data
      })
    })
  },
  handleDetail(e){
    let id = e.target.dataset.id
    wx.navigateTo({
      url:'../detail/detail?userId='+id
    })
  }
})