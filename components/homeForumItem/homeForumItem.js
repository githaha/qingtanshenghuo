// components/homeForumItem/homeForumItem.js
Component({
  /**
   * 组件的属性列表
   * 
   */
  options:{
    styleIsolation: 'apply-shared'
  },
  properties: {
    idd:String,
    userId:String,
    avator: String,
    nickname: String,
    subNickname: String,
    forumTitle: String,
    isLike:Boolean,
    contentType:{
      //text,图文，video,视频
      type: String,
      value:"text"
    },
    
    videoSrc:String,
    forumImagesOrigin:Array,
    forumImages: {
      type: Array,
      observer: function (newData, oldData) {
        if (newData.length > 1) {
          this.setData({
            forumImagesType: "multi"
          });
        }else{
          this.setData({
            forumImagesType: "default"
          });
        }
      }
    },
    forumContetnShort: String,
    forumImagesType:{
      type:String,
      value:"default"
    },
    shareNum: {
      type: String,
      value: "0"
    },
    createTime: {
      type: String,
      value: "16:34:41 14/12"
    },
    commentNum: {
      type: String,
      value: "0"
    },
     zanNum: {
      type: String,
      value: "0"
    }

  },
  ready(){
    //优化控制加载
    this.observer = this.createIntersectionObserver().relativeToViewport()
    this.observer.observe('.observer', (res) => {
      this.setData({
        observer_status: false
      })
      this.observer.disconnect()
      this.observer = null
    });
    this.videoCtx = wx.createVideoContext('myVideo');
  },
  detached() {
    this.observer && this.observer.disconnect()
  },
  /**
   * 组件的初始数据
   */
  data: {
    observer_status: true,
    forumImagesType: {
      type: String,
      value: "default"
    },
    forumImageDefault:true,
    tab_image:'block',
    hoverImg: "../../common/images/qingtanIcon.jpg",
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
    tapForumItemCell:function(e){
      if (e.target.id =='myVideo'){return;}
      var that = this;
      that.videoCtx.stop();
        wx.navigateTo({
          url: '/pages/diary/diarySub/diaryDetail?idd='+that.properties.idd,
        })
    },
    tapForumItemUserInfo:function(){
      wx.navigateTo({
        url: '/pages/myCenter/userInfoGuestCenter/userInfoGuestCenter?userId='+that.properties.userId,
      })
    },
    itemDataHadChange: function () {
      if (this.properties.forumImages.length > 1) {
        this.setData({
          forumImagesType: "multi"
        });
      } else {
        this.setData({
          forumImagesType: "default"
        });
      }
    },
    tapActive: function () {
      this.triggerEvent("forumZanEvent", {
        forumId: this.properties.idd
      });
    },
    clickImgs: function (event){
      var src = event.currentTarget.dataset.src;//获取data-src
      var imgList = this.properties.forumImagesOrigin;//获取data-list
      //图片预览
      wx.previewImage({
        current: src, // 当前显示图片的http链接
        urls: imgList // 需要预览的图片http链接列表
      })
    },
    
    
  },
  lifetimes: {
    resize() { },
    attached() {
      // 在组件实例进入页面节点树时执行
      this.itemDataHadChange();
    }}
})
