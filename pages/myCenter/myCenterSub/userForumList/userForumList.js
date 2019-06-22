var commonJs = require("../../../../utils/commonRequire.js");
Page({

  /**
   * 用户发帖列表
   * 页面的初始数据
   */
  data: {
    // 
    userId:"",
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
    this.data.userId = options.userId;
    wx.setNavigationBarTitle({ title: "我的发布" });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getForumList();
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
    this.getForumList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.requestInitData.pageIndex < this.data.requestInitData.pageAll) {
      this.data.requestInitData.pageIndex++;
      this.getForumList();
    } else {
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
  getForumList: function () {
    var that = this;
    commonJs.WxApi.wxRequest({
      url: commonJs.WxPost.userPublicForumList,
      data: {
        "userId": that.data.userId,
        "pageNum": that.data.requestInitData.pageIndex,
        "pageSize": that.data.requestInitData.pageSize
      }

    }, "加载中..").then(res => {
      if (res.result) {
        var forumList = res.objValue.list;
        that.data.requestInitData.pageAll = res.objValue.pages;
        if (forumList.length) {
          var foruMArr = [];
          if (that.data.requestInitData.pageIndex > 1) {
            foruMArr = that.data.listForumData;
          }
          forumList.forEach(function (value) {
            var forumI = that.parseForumItem(value);
            foruMArr.push(forumI);
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


  parseForumItem: function (dic) {
    var imgsMini = "";
    var imgsOrigin = "";
    var audioSrc = "";
    var contentType = "text";
    if (dic.type == 2) {
      audioSrc = commonJs.Utils.GetVideoUrl(dic.imgs);
      contentType = "video";
    } else if (dic.type == 1) {
      imgsMini = commonJs.Utils.PaseInitImgs(dic.imgs, true);
      imgsOrigin = commonJs.Utils.PaseInitImgs(dic.imgs, false);
      contentType = "text";
    }
    return {
      idd: dic.id,
      type: dic.type,
      userId: dic.userId,
      isTop: dic.isTop,
      avator: dic.userSimple.headerImg,
      nickname: dic.userSimple.nickname,
      subNickname: "瘦身小能手",
      forumTitle: dic.title,
      zanNum: dic.likeCount,
      createTime: commonJs.Utils.CompareDateWith(dic.createTime),
      shareNum: dic.shareCount,
      commentNum: dic.commentCount,
      forumContetnShort: dic.content,
      forumImages: imgsMini,
      forumImagesOrigin: imgsOrigin,
      isLike: dic.isLike,
      contentType: contentType,
      videoSrc: audioSrc
    }
  }
})