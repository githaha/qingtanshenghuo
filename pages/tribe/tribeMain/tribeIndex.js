// pages/tribe/tribeMain/tribeIndex.js
var ApiTestDemo = require("../../../utils/demoTest.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperImgs: [
      "http://www.shuoshuokong.com/d/file/2018-08/9ae4eddebe5c0b8acc5ae427bdf9bb66.png",
      "http://up.enterdesk.com/edpic/f2/5a/02/f25a023527b243f0096186ca0198913e.jpg",
      "http://pic1.win4000.com/wallpaper/2018-01-04/5a4dbf462944b.jpg"
    ],
    listCircles:[
      {
        icon: "/common/icons/tree.jpg",
        title:"记录美好生活",
        subTitle:"已有1202位好友在加入"
      },
      {
        icon: "/common/icons/calendar.jpg",
        title: "记录美好生活",
        subTitle: "已有1202位好友在加入"
      },
      {
        icon: "/common/icons/bike.jpg",
        title: "坚持锻炼",
        subTitle: "已有102位好友在加入"
      },
      {
        icon: "/common/icons/tree.jpg",
        title: "坚持吃早餐",
        subTitle: "已有202位好友在加入"
      },
      {
        icon: "/common/icons/ege.jpg",
        title: "户外运动",
        subTitle: "已有122位好友在加入"
      },
      {
        icon: "/common/icons/light.jpg",
        title: "夜跑",
        subTitle: "已有432位好友在加入"
      },
      {
        icon: "/common/icons/calendar.jpg",
        title: "休息10分钟",
        subTitle: "已有12位好友在加入"
      }

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '瘦身部落'
    })
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

  }
})