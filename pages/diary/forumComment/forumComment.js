// pages/diary/forumComment/forumComment.js
var wxApi = require("../../../utils/wxApi.js");
var wxPost = require("../../../utils/ports.js");
var utils = require("../../../utils/util.js");
var forumCommonJs = require("../../diary/commonDiary/commonDiary.js");
var app = getApp();

Page({
  data:{
    forumId:'',
    commentId:'',
    requireSet: {
      pageSize: 20,
      pageIndex: 1,
      pageTotal: 1,
      replyComment:true
    },
    userSimple:{},
    btnActionShow: true,
    isZanComment:false,
    comment:{},
    listCommentLike:[],
    forumReplyList:[],
    keyboardShow:true,
    replyTo: {
      placeholder: "写评论",
      toUserId:'',
      commentId:''
    },

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var commentId = options.commentId;
    // var that = this;
    // that.data.commentId = commentId;
    this.getReplyDetail(commentId);
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
   * 点赞--评论main
   */
  tapActive:function(){

  },
  showOrHiddleKeyboard: function (isShow) {
    this.setData({
      keyboardShow: isShow
    });
  },
  onPageScroll: function () {
    this.showOrHiddleKeyboard(false);
    this.requireClear();
  },
  requireClear: function () {
    //重置回复的
    var requireSetN = this.data.requireSet;
    requireSetN.replyComment = true;
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
   * 请求评论详情内容
   */
  getReplyDetail: function (commentId){
    var that = this;
    wxApi.wxRequest({
      url: wxPost.postCommentReplyList,
      data: {
        userId: app.globalData.userId,
        commentId: commentId,
        pageNum: that.data.requireSet.pageIndex,
        pageSize: that.data.requireSet.pageSize
      }
    }).then(res=>{
      if (res.result) {
        var value = res.objValue;
        var listReplys = value.listReply;
        var listReply = that.paseReply(listReplys.list);
        var comment = value.comment;
        var createTimeT = utils.CompareDateWith(comment.createTime);
        comment.createTime = createTimeT;
        that.setData({
          comment: comment,
          listCommentLike: value.comment.listLikeUser,
          forumReplyList: listReply,
          userSimple: comment.userSimple,
          isZanComment:comment.isLike       
        });
        that.data.forumId = value.comment.problemId;
        that.data.commentId = comment.id;
        that.data.replyTo.commentId = comment.id;
        that.data.replyTo.toUserId = comment.userSimple.id;
        that.data.requireSet.pageNum = listReply.pageNum;
        that.data.requireSet.pageTotal = listReply.pages;
      } else {
        return Promise.reject(res.value);
      }
    }).catch(err=>{

    })
  },
  /**
   * 帖子点赞
  * 评论点赞
  */
  tapZanEvent: function (e) {
    var typeE = e.type;
    if (typeE == "commentZanEvent") {//列表点赞
      forumCommonJs.forumReplyZanEvent(app.globalData.userId, e.detail.commentId).then(res => {
        if (res.result) {
          this.getReplyDetail(this.data.commentId);
        } else {
          return Promise.reject();
        }
      });

    } else if (typeE == "tap") {//楼主点赞
      forumCommonJs.forumCommentZanEvent(app.globalData.userId, this.data.commentId).then(res => {
        if (res.result) {
          this.getReplyDetail(this.data.commentId);
        } else {
          return Promise.reject();
        }
      });
    }
    
  }
  ,
  /**
   * 处理回复列表
   */
  paseReply: function (list) {
    for(var index in list ){
      var dic = list[index];
      var createTimeT = utils.CompareDateWith(dic.createTime);
      dic.createTime = createTimeT;
    }
    return list;
  },
  /**
   * 删除回复
   */
  deleteComment: function (e) {
    wxApi.wxRequest({
      url: wxPost.postReplyDel,
      data: {
        userId: app.globalData.userId,
        replyId: e.detail.commentId
      }
    }, "正在删除", true).then(res => {
      if (res.result) {
        this.getReplyDetail(this.data.commentId);
      } else {
        return Promise.reject();
      }
    }).catch(err => {
      // console.log("err", err);
    });
  },
  /**
   * 1。评论回帖
   */
  bindconfirm: function (e) {
    var that = this;
    var param = {};
    var urlStr = wxPost.postCommentReply;
    var replyContent = e.detail.content;
    var requireSetN = this.data.requireSet;
    var toUserId = requireSetN.replyComment ? '' : that.data.replyTo.toUserId;
    param = {
      "userId": app.globalData.userId,
      "problemId": that.data.forumId,
      "content": replyContent,
      "toUserId": toUserId,
      "commentId": that.data.commentId
    };
    that.requireClear();
    if (replyContent.length > 0) {
      wxApi.wxRequest({
        url: urlStr,
        data: param
      }, "正在提交").then(res => {
        if (res.result) {
          wx.showToast({
            title: '评论成功',
          });
          that.getReplyDetail(this.data.commentId);

        }
      }).catch(err => {
        console.log("err", err);
      });
    } else {
      wx.showModal({
        title: '',
        content: '还未输入内容',
      })
    }
  },
  /***
  * 点击回复-别人的回复
  */

  tapReplyItem: function (e) {

    var requireSetN = this.data.requireSet;
    requireSetN.replyComment = false;
    this.setData({
      replyTo: {
        placeholder: "回复 " + e.detail.userNickname,
        toUserId: e.detail.toUserId,
        commentId: e.detail.commentId
      },
      replyForum: requireSetN
    });
    this.showOrHiddleKeyboard(true);

  },

})