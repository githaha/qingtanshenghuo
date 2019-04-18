// pages/diary/publishContent/publishContent.js

var utils = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    editImages:[]
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

  /**
   * 获取图片
   */
   getImageTap: function(){
     var that = this;
     wx.chooseImage({
       count:6,
       sizeType:"original",
       success: function(res) {
         const tempFilePaths = res.tempFilePaths;
         var imageFile = that.data.editImages;
         var newImgArr = imageFile.concat(tempFilePaths).slice(0,6);
         newImgArr = utils.filterDuplicateArray(newImgArr);
         that.setData({
           editImages: newImgArr
         });
       }
     })
  }






})