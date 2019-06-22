// pages/diary/diarySub/diaryDetail.js

var wxApi = require("../../../utils/wxApi.js");
var wxPost = require("../../../utils/ports.js");
var utils = require("../../../utils/util.js");
var app = getApp();
var forumCommonJs = require("../commonDiary/commonDiary.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idd:String,
    title: String,
    avator: String,
    userIdForum:String,
    nickname: String,
    isLike:Boolean,
    isFollow:Boolean,
    subNickname: String,
    forumTitle: String, 
    attention:Boolean,
    forumContent:String,
    forumImages:Array,
    forumArgument:Array,
    createTime: String,
    commentNum: String,
    zanNum: String,
    requireSet:{
      pageSize:20,
      pageIndex:1,
      pageTotal:1,
      replyForum: true
    },
    replyTo:{
      placeholder:"写评论"
    },
    keyboardShow: Boolean,
    btnActionShow:true

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var detailId = options.idd;
    this.data.idd = detailId;
    console.log("detailId" + this.idd);
    this.getForumDetailData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onPageScroll:function(){
    this.showOrHiddleKeyboard(false);
    this.requireClear();
  },
  requireClear:function(){
    //重置回复的
    var requireSetN = this.data.requireSet;
    requireSetN.replyForum = true;
    this.setData({
      replyTo: {
        placeholder: "发评论",
        toUserId: "",
        commentId: ""
      },
      requireSet: requireSetN
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      this.setData({
        title: ""
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
    this.data.requireSet.pageIndex = 1;
    this.getForumDetailData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.requireSet.pageIndex < this.data.requireSet.pageTotal) {
      this.data.requireSet.pageIndex++;
      this.getForumDetailData();
    } else {
      wx.showToast({
        title: '没有更多内容',
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (option) {
    var from = option.from;
    wxApi.wxRequest({
      url: wxPost.postForumShare,
      data: {
        userId: app.globalData.userId,
        problemId: this.data.idd
      }
    }).then(res => {
      // console.log(res.value);
    }).catch(err => {
      // console.log("errr");
    });
  
    return {
      title: "转发",
      path: '/pages/diary/diarySub/diaryDetail'
    }
  },
  getForumDetailData:function(){
    var that = this;
    wxApi.wxRequest({
      url: wxPost.forumDetail,
        data:{
          userId: app.globalData.userId,
          problemId: that.data.idd,
          pageNum: that.data.requireSet.pageIndex,
          pageSize: that.data.requireSet.pageSize
        }
    }).then(res=>{
        console.log("res",res);
        if(res.result){
        that.paseInitForumData(res.objValue);
        }else{
          return Promise.reject(res.value);
        }
    
    }).catch(err=>{
      console.log("res", err);
    })
  },
  /**
   * 处理接口返回的帖子数据
   */
  paseInitForumData:function(res){
    var that = this;
    var problemDetail = res.problem;
    var  problemType = problemDetail.type;
    var vimgArr="";
    var videoUrl="";
    if(problemType=="1"){
      //图文贴
      vimgArr = utils.PaseInitImgs(problemDetail.imgs);
    }else if(problemType=="2"){
      //视频贴
      videoUrl = utils.GetVideoUrl(problemDetail.imgs);
    }
    var actionShow = false;
    if(app.globalData.userId==res.problem.userId){
      actionShow = true;
    }else{
      actionShow = false;
    }
    that.setData({
      title:problemDetail.title,
      forumContent:problemDetail.content,
      forumImages: vimgArr,
      zanNum:problemDetail.likeCount,
      createTime:problemDetail.createTime,
      nickname: problemDetail.userSimple.nickname,
      userIdForum: problemDetail.userSimple.id,
      avator: problemDetail.userSimple.headerImg,
      commentNum:res.listComment.total,
      btnActionShow: actionShow,
      isLike:problemDetail.isLike,
      isFollow:problemDetail.isFollow,
      videoUrl: videoUrl,
      problemType: problemType
    });




    that.data.pageTotal = res.listComment.pages;
    var forumReplyList = res.listComment.list;
    that.data.requireSet.pageTotal = res.listComment.pages;
    if (typeof(forumReplyList)!="undefined"){
      that.paseForumReplyData(forumReplyList,that);
    }
  },
  /**
   * 处理接口返回的帖子-评论-数据
   */
  paseForumReplyData:(res,scope)=>{
    var foruMArr = [];
    if (scope.data.requireSet.pageIndex > 1) {
      foruMArr = scope.data.forumArgument;
    }
    res.forEach((item)=>{
      var itemP = scope.paseReply(item);
      foruMArr.push(itemP);
    });
    scope.setData({
      forumArgument: foruMArr
    });
  },
  paseReply:function(dic){
    var dicC = dic;
    dicC.idd = dic.id;
    var createTimeT = utils.CompareDateWith(dic.createTime);
    dicC.createTime = createTimeT;
    return dicC;
  },
  /**
   * 1。发评论--评论帖子;2.评论回帖
   */
  bindconfirm:function(e){
    var that = this;
    var param = {};
    var urlStr = "";
    var replyContent = e.detail.content;
    if (that.data.requireSet.replyForum){
      param = {//评论帖子
        "userId": app.globalData.userId,
        "problemId": that.data.idd,
        "content": replyContent
      }; 
      urlStr = wxPost.postComment;
    } else {//评论回帖
      param = {
        "userId": app.globalData.userId,
        "problemId": that.data.idd,
        "content": replyContent,
        "toUserId": that.data.replyTo.toUserId,
        "commentId": that.data.replyTo.commentId
      };
      urlStr = wxPost.postCommentReply;
    }
    that.requireClear();
    if(replyContent.length>0){
      wxApi.wxRequest({
        url: urlStr,
        data: param
      },"正在提交").then(res=>{
          if(res.result){
            wx.showToast({
              title: '评论成功',
            });
            that.refreshDetail();
            
          }
      }).catch(err=>{
          console.log("err",err);
      });
    }else{
      wx.showModal({
        title: '',
        content: '还未输入内容',
      })
    }
  },
  /***
   * 延时刷新详情
   */
  refreshDetail:function(){
    setTimeout(() => {
      this.getForumDetailData();
    }, 1000);
  },

  /***
   * 点击回复-别人的回复
   */

  tapReplyItem:function(e){
    
    var requireSetN = this.data.requireSet;
    requireSetN.replyForum = false;
    this.setData({
      replyTo:{
        placeholder: "回复 " + e.detail.userNickname,
        toUserId:e.detail.toUserId,
        commentId:e.detail.commentId
      },
      replyForum: requireSetN
    });
    this.showOrHiddleKeyboard(true);

  },

  showOrHiddleKeyboard:function(isShow){
    this.setData({
      keyboardShow:isShow
    });
  },
  /**
   * 添加关注
   */
  addAction:function(){
    var that = this;
    wxApi.wxRequest({
      url: wxPost.userAddFollow,
      data: {
        userId: app.globalData.userId,
        followUserId:this.data.userIdForum
      }
    }, "正在提交").then(res => {
      if (res.result) {
       //
      that.setData({
        isFollow: !that.data.isFollow
      });
      }else{
        return Promise.reject();
      }
    }).catch(err => {
      console.log("err", err);
    });
  },
   /**
    * 帖子点赞
   * 评论点赞
   */
  tapZanEvent:function(e){

    var typeE = e.type;
    if(typeE=="commentZanEvent"){//评论点赞
      forumCommonJs.forumCommentZanEvent(app.globalData.userId, e.detail.commentId).then(res => {
        if (res.result) {
          this.refreshDetail();
        } else {
          return Promise.reject();
        }
      });;
    }else if(typeE == "forumZanEvent") {//帖子点赞
      forumCommonJs.forumZanEvent(app.globalData.userId, this.data.idd).then(res => {
        if (res.result) {
          this.refreshDetail();
        } else {
          return Promise.reject();
        }
      });
    };
  },
  /**
   * 删除评论
   */
  deleteComment:function(e){
    wxApi.wxRequest({
      url: wxPost.postCommentDel,
      data: {
        userId:app.globalData.userId,
        commentId:e.detail.commentId
      }
    }, "正在删除", true).then(res => {
      if (res.result) {
        this.refreshDetail();
      } else {
        return Promise.reject();
      }
    }).catch(err => {
      // console.log("err", err);
    });
  }

})


