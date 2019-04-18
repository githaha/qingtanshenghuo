// pages/diary/diarySub/diaryDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: String,
    avator: String,
    nickname: String,
    subNickname: String,
    forumTitle: String, 
    attention:Boolean,
    forumContent:String,
    forumArgument:Array,
    createTime: String,
    commentNum: String,
    zanNum: String
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      this.setData({
        title: "减肥怎么戒糖有效？"
      })
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

  }
})