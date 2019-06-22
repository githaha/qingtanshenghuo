// pages/myCenter/myCenterMain/myCenterIndex.js
var commonJs = require("../../../utils/commonRequire.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toUserId: '',
    userInfo: {},

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var toUserId = options.toUserId;
    if (typeof (toUserId) == 'undefined') {
      toUserId = commonJs.App.globalData.userId;
    }
    this.getUserData(toUserId);
    this.data.toUserId = toUserId;
    wx.setNavigationBarTitle({ title: "" });
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
  getUserData: function (toUserId) {
    // commonJs
    var toUserID = toUserId;
    commonJs.WxApi.wxRequest({
      url: commonJs.WxPost.userCenter,
      data: {
        "userId": commonJs.App.globalData.userId,
        "roomUserId": toUserID
      }
    }, "加载中..").then((res) => {
      if (res.errorCode == 0) {
        this.setData({
          userInfo: res.objValue
        });
      }
    });
  },
  /**
   * 点击帖子列表
   */
  clickItem: function (e) {
    var clickIndex = e.currentTarget.dataset.index;
    var urlStr = "";
    switch (parseInt(clickIndex)) {
      case 1: { urlStr = '../myCenterSub/userForumList/userForumList?userId='+this.data.toUserId } break;
      case 2: { urlStr = '../myCenterSub/userFollows/userFollows?userId=' + this.data.toUserId } break;
      case 3: { urlStr = '../myCenterSub/userFans/userFans?userId=' + this.data.toUserId } break;
      case 4: { urlStr = '../myCenterSub/userForumList/userForumList' } break;
    }
    wx.navigateTo({
      url: urlStr,
    })
  }
})