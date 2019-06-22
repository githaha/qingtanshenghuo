// pages/commonPage/getUserLoginAuthor/getUserLoginAuthor.js
var userInfo = require("../../../utils/UserInfo.js");
var utils = require("../../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {

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
  /***
   * 获取用户授权
   * e.detail:{encryptedData,userInfo,rawData,signature}
   * 
   */
  getUserAuthor:function(e){
    if (e.detail.userInfo) {

      userInfo.SaveUserDetail(e.detail);
      userInfo.SaveUserInfo(e.detail.userInfo);
      userInfo.WxLoginPro().then(res=>{
        var code = res.code;
       return userInfo.ResignUser(e.detail,code);
      }).then(data=>{
        var userId = data.objValue;
        var appInstance = getApp();
        appInstance.globalData.userId = userId;
        utils.SetStorage("userId", userId, true);
        //注册成功，
        var pages = getCurrentPages();
        if (pages.length > 1) {
          var beforePage = pages[pages.length - 2];
          if (beforePage.changeData) {
            beforePage.changeData();
          }
        }
        wx.navigateBack({});
      }).catch(err=>{
          console.log("err----");
      })
      
  }else{
    console.log("shibai");
  }
  }
  
})