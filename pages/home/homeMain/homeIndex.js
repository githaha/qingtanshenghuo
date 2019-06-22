// pages/home/homeMain/homeIndex.js
var utils = require("../../../utils/util.js");
var userInfoJs = require("../../../utils/UserInfo.js");
var wxApi = require("../../../utils/wxApi.js");
var wxPost = require("../../../utils/ports.js");
var app = getApp();
var forumCommonJs = require("../../diary/commonDiary/commonDiary.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showOrHiddleSlectType: false,
    swiperDataProperty:{
      indicatorDots: false,
      autoplay: true,
      interval: 5000,
      duration: 1000,
      circular: true
    },
    requestInitData:{
      pageIndex:1,
      pageSize:10,
      pageAll:1
    },
    swiperData:[],
      listForumData:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: "首页" });
  },
  /**
   * 设置观测视频标签播放
   */
  observeVideo:function(){
    // wx.createIntersectionObserver(this).relativeToViewport({ bottom: 100 }).observe('.contentListCell',res=>{
    //     console.log("res--video");
    // });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    this.resignUser();

  },
  resignUser:function(){
    var that = this;
    userInfoJs.GetUserInfoN().then(userDetail => {
      //获取了用户信息，再调用微信登陆接口获取code,最后注册
      userInfoJs.WxLoginPro().then(userCode=>{
        userInfoJs.ResignUser(userDetail, userCode.code).then(data=>{
         if (data.result == true) {
           var userId = data.objValue;
           var appInstance = getApp();
           appInstance.globalData.userId = userId;
           utils.SetStorage("userId", userId, true);
           that.getForumList();
         }
       })
     });
    }).catch(err => {
      console.log("err" + err);
      if (!err.auth) {
        //用户未授权
        wx.navigateTo({
          url: "/pages/commonPage/getUserLoginAuthor/getUserLoginAuthor",
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("home--onshow");
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
    this.getForumList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.requestInitData.pageIndex<this.data.requestInitData.pageAll){
      this.data.requestInitData.pageIndex++;
    this.getForumList();
  }else{
    wx.showToast({
      title: '没有更多内容',
    });
  }
  },
  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onPageScroll: function () {
    this.setData({
      showOrHiddleSlectType: false
    });
  },
  /**
   * 点击发布帖子
   */
  publicShowSelectType:function(){
    let showO = this.data.showOrHiddleSlectType;
    this.setData({
      showOrHiddleSlectType: !showO
    });
  },
  hiddleSelectBack:function(){
    this.data.showOrHiddleSlectType = false;
  },
  changeData:function(){
    console.log("---changeData---");
    this.getForumList();
  },
  getForumList:function(){
    var that = this;
    console.log(app.globalData.userId, that.data.requestInitData.pageIndex, that.data.requestInitData.pageSize);
    wxApi.wxRequest({
      url: wxPost.getForumList,
      data: {
        "userId": app.globalData.userId,
        "pageNum": that.data.requestInitData.pageIndex,
        "pageSize": that.data.requestInitData.pageSize
      }

    },"加载中..").then(res=>{
      if(res.result){
        var forumList = res.objValue.list;
        that.data.requestInitData.pageAll = res.objValue.pages;
        if(forumList.length){
          var foruMArr =[];
          if (that.data.requestInitData.pageIndex>1){
            foruMArr = that.data.listForumData;
          }
          forumList.forEach(function (value) {
            var forumI = that.parseForumItem(value);
            foruMArr.push(forumI);
          });
        that.setData({
          listForumData:foruMArr
        });
          
        }
      }else{

      }





    }).catch(err=>{
      
    });
  },


  parseForumItem:function(dic){
    var imgsMini = "";
    var imgsOrigin = "";
    var audioSrc = "";
    var contentType = "text";
     if(dic.type==2){
       audioSrc = utils.GetVideoUrl(dic.imgs);
       contentType = "video";
     }else if(dic.type==1){
     imgsMini = utils.PaseInitImgs(dic.imgs,true);
     imgsOrigin = utils.PaseInitImgs(dic.imgs, false);
       contentType = "text";
      }
    return {
      idd:dic.id,
      type:dic.type,
      userId:dic.userId,
      isTop:dic.isTop,
      avator: dic.userSimple.headerImg,
      nickname: dic.userSimple.nickname,
      subNickname: "瘦身小能手",
      forumTitle: dic.title,
      zanNum: dic.likeCount,
      createTime: utils.CompareDateWith(dic.createTime) ,
      shareNum: dic.shareCount,
      commentNum: dic.commentCount,
      forumContetnShort: dic.content,
      forumImages: imgsMini,
      forumImagesOrigin: imgsOrigin,
      isLike:dic.isLike,
      contentType: contentType,
      videoSrc: audioSrc
    }
  },
  clickForumZan:function(e){
    var forumId = e.detail.forumId;
    forumCommonJs.forumZanEvent(app.globalData.userId, forumId).then(res => {
      if (res.result) {
        this.onPullDownRefresh();
      } else {
        return Promise.reject();
      }
    });
  },
  getVideoItem:function(dic){
    dic.contentType = "video";
    dic.hoverImg = "";
    dic.videoSrc = "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400";
    return dic;
  },
  playVideoStart:function(e){
    var videoContext =  e.detail.videoContext;
    if(this.videoContext){
      this.videoContext.stop();
    }
    this.videoContext = videoContext;
  },
  tapItem:function(e){
    var type = e.target.dataset.typec;
    switch(type){
      case "typeFit":{
        wx.navigateTo({
          url: '../homeSub/fitnessKnowledge/fitnessKnowledge',
        })
      } 
      case "typeFoodList": {
        wx.navigateTo({
          url: '../homeSub/fitnessFood/fitnessFood',
        })
      }
      case "typeFitnessTool": {
        wx.navigateTo({
          url: '../homeSub/fitnessTool/fitnessTool',
        })
      }
    }
  }
})