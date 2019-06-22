var commonJs = require("../../../../utils/commonRequire.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:'',
    requestInitData: {
      pageIndex: 1,
      pageSize: 10,
      pageAll: 1
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: "关注" });
    this.data.userId = options.userId;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getFollowsList();
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
    this.data.requestInitData.pageIndex = 1;
    this.getFollowsList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.requestInitData.pageIndex < this.data.requestInitData.pageAll) {
      this.data.requestInitData.pageIndex++;
      this.getFollowsList();
    } else {
      wx.showToast({
        title: '没有更多',
      });
    }
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getFollowsList: function () {
    var that = this;
    commonJs.WxApi.wxRequest({
      url: commonJs.WxPost.userFollows,
      data: {
        "userId": that.data.userId,
        "pageNum": that.data.requestInitData.pageIndex,
        "pageSize": that.data.requestInitData.pageSize
      }

    }, "加载中..").then(res => {
      if (res.result) {
        var listArr = res.objValue.list;
        that.data.requestInitData.pageAll = res.objValue.pages;
        if (listArr.length) {
          var foruMArr = [];
          if (that.data.requestInitData.pageIndex > 1) {
            foruMArr = that.data.listForumData;
          }
          listArr.forEach(function (value) {
            foruMArr.push(value);
          });
          that.setData({
            listForumData: foruMArr
          });

        }
      } else {

      }

    }).catch(err => {

    });
  },
  parseForumItem:function(){

  }
})