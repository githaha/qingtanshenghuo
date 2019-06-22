// pages/diary/publishContent/publishContent.js

var utils = require("../../../utils/util.js");
var uploadImgJs = require("../../../utils/UploadFile.js");
var wxApi = require("../../../utils/wxApi.js");
var wxPost = require("../../../utils/ports.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    editImages:[],
    textContent:""
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
       sizeType:["original","compressed"],
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
   },
  /**
   * 获取图片
   */
  deleteImgTap:function(e){
    console.log("dele"+ e.detail.imgUrl);
    var imageFile = this.data.editImages;
    var deleUrl = e.detail.imgUrl;
    var index = imageFile.indexOf(deleUrl);
    if(index!=-1){
      imageFile.splice(index,1);
      this.setData({
        editImages: imageFile
      });
    }

  },
  textInputChange:function(e){
    this.data.textContent = e.detail.value;
  },
  /**
   * 发帖子
   */
  publishPost:function(e){

     var that = this;
    var userId = app.globalData.userId;
      var length = this.data.editImages.length;
      uploadImgJs.UploadFiles(this.data.editImages, 0, 0, length, 0).then(result => {
        //返回图片数组，
        return Promise.resolve(result);

      }).then(resPics => {//发帖接口
        var imgStr = resPics.toString();
        console.log("resPics--" + imgStr);
       return wxApi.wxRequest({
         url: wxPost.postForum,
         method:"POST",
         header:{
           "content-type":"application/x-www-form-urlencoded"
         },
         data:{
           "type":"1",
           "userId": userId,
           "title": "--",
           "content": that.data.textContent,
           "imgs": imgStr
         }
         
        });

      }).then(resPostBack=>{
        console.log("发帖返回--" + resPostBack);
        if(resPostBack.result){
          return Promise.resolve(resPostBack);
          
        }else{
          return Promise.reject(resPostBack.value);
        }
      }).then(resBack=>{
        wx.showModal({
          title: resBack.value,
          content: '',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              var pages = getCurrentPages();
              if (pages.length > 1) {
                var beforePage = pages[pages.length - 2];
                beforePage.changeData();
              }
              wx.navigateBack({});
            }
          }
        });
      }).catch(err => {
        var infoE = typeof (err) == "undefined" ? "发帖失败请重试":err.value ; 
        wx.showToast({
          title: infoE
        })
      });
    }






})