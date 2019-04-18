// pages/home/homeMain/homeIndex.js
var utils = require("../../../utils/util.js");
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
    swiperData:
      [
        "http://www.shuoshuokong.com/d/file/2018-08/9ae4eddebe5c0b8acc5ae427bdf9bb66.png",
        "http://up.enterdesk.com/edpic/f2/5a/02/f25a023527b243f0096186ca0198913e.jpg",
        "http://pic1.win4000.com/wallpaper/2018-01-04/5a4dbf462944b.jpg"
      ],
      listForumData:[
        {
          avator:"icon",
          nickname:"瘦身小美",
          subNickname:"瘦身达人",
          forumTitle:"春季减肥方法",
          zanNum:"99",
          createTime:"24分钟之前",
          shareNum:"520",
          commentNum:"39",
          forumImages: ["http://h.hiphotos.baidu.com/zhidao/pic/item/6d81800a19d8bc3ed69473cb848ba61ea8d34516.jpg", "https://imgsa.baidu.com/exp/w=200/sign=85539b73828ba61edfeecf2f713597cc/80cb39dbb6fd5266e470a1adab18972bd407362b.jpg",
            "http://h.hiphotos.baidu.com/zhidao/pic/item/6d81800a19d8bc3ed69473cb848ba61ea8d34516.jpg", "https://imgsa.baidu.com/exp/w=200/sign=85539b73828ba61edfeecf2f713597cc/80cb39dbb6fd5266e470a1adab18972bd407362b.jpg"

          ],
          forumContetnShort:"今天就和大家分享下春节快速减肥的一些小秘诀，都是我个人的经验所得呀，虽然不是那种立竿见影，但是还是能有效地看出效果，希望对减肥的朋友们有帮助。"
        }, {
          avator: "icon",
          nickname: "千里之行",
          subNickname: "瘦身小能手",
          forumTitle: "春季减肥方法",
          zanNum: "1024",
          createTime: "2分钟之前",
          shareNum: "20",
          commentNum: "139",
          forumImages: ["https://imgsa.baidu.com/exp/w=200/sign=85539b73828ba61edfeecf2f713597cc/80cb39dbb6fd5266e470a1adab18972bd407362b.jpg"

          ],
          forumContetnShort: "又到一年减肥时，所谓春季不减肥，夏季徒伤悲，趁着春季的尾巴开始进行减肥吧，就能在夏季穿上美美的衣服。今天就和大家分享下春节快速减肥的一些小秘诀，都是我个人的经验所得呀，虽然不是那种立竿见影，但是还是能有效地看出效果，希望对减肥的朋友们有帮助。"
        }, {
          avator: "icon",
          nickname: "西域之行",
          subNickname: "瘦身小能手",
          forumTitle: "哈哈",
          zanNum: "124",
          createTime: "1分钟之前",
          shareNum: "24",
          commentNum: "119",
          forumImages: [],
          forumContetnShort: "趁着春季的尾巴开始进行减肥吧，就能在夏季穿上美美的衣服。今天就和大家分享下春节快速减肥的一些小秘诀，都是我个人的经验所得呀，虽然不是那种立竿见影，但是还是能有效地看出效果，希望对减肥的朋友们有帮助。"
        }
      ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: "首页" });
    
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
  }
})