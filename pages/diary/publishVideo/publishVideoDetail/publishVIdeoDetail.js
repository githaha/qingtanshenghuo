// 
var utils = require("../../../../utils/util.js");
var uploadImgJs = require("../../../../utils/UploadFile.js");
var wxApi = require("../../../../utils/wxApi.js");
var wxPost = require("../../../../utils/ports.js"); 
var uploadFileJs = require("../../../../utils/UploadFile.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoSrc:"",
    videoServerUrl:"",
    isShow:false,
    inputAutoHeigh:false,
    videoInputClass:'videoInputSingline',
    textContent:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // videoSrc, videoScreenShotImg
    var thatSelf = this;
    var videoSrc = options.videoSrc;
    var videoScreenShotImg = options.videoScreenShotImg;
    this.setData({
      videoSrc:videoSrc
    });
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
  , 
  editInputlinechange:function(e){
    if (e.detail.lineCount>1){
      this.setData({ 
        inputAutoHeigh:true,
        videoInputClass: 'videoInputDef'
        });
      }else{
      this.setData({ inputAutoHeigh: false,
        videoInputClass:'videoInputSingline'
       });
     }
  },
  textInputChange: function (e) {
    this.data.textContent = e.detail.value;
  },
  videoPublishClick:function(){
      //1.上传视频2，发帖
      var that = this;
    var userId = app.globalData.userId;

    uploadFileJs.UploadVideoFile(that.data.videoSrc).then(res=>{
      //res:视频地址
      console.log("--success--" + res);
      that.data.videoServerUrl = res;
      return wxApi.wxRequest({
        url: wxPost.postForum,
        method: "POST",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: {
          "type": "2",
          "userId": userId,
          "title": "--",
          "content": that.data.textContent,
          "imgs": that.data.videoServerUrl
        }

      });

    }).then(resPostBack=>{
      console.log("发帖返回--" + resPostBack);
      if (resPostBack.result) {
        return Promise.resolve(resPostBack);

      } else {
        return Promise.reject(resPostBack.value);
      }
      }).then(resBack => {
        wx.showModal({
          title: resBack.value,
          content: '',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              var pages = getCurrentPages();
              if (pages.length > 1) {
                for(var i = 0;i< pages.length;i++){
                  var indexPage = pages[i];
                  if (indexPage.route =="pages/home/homeMain/homeIndex"){
                    indexPage.changeData();
                    wx.navigateBack({ delta: 4});
                  }
              break;
                }
              
              }
              
            }
          }
        });
      })
    .catch(err => {
      console.log("--failed--" + err);
    });
   
  }

})