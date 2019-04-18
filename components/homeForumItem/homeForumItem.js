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
    avator: String,
    nickname: String,
    subNickname: String,
    forumTitle: String,
    forumImages: Array,
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

  /**
   * 组件的初始数据
   */
  data: {
    forumImagesType: {
      type: String,
      value: "default"
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tapForumItemCell:function(e){
        wx.navigateTo({
          url: '/pages/diary/diarySub/diaryDetail',
        })
    },
    tapForumItemUserInfo:function(){
      wx.navigateTo({
        url: '/pages/myCenter/userInfoGuestCenter/userInfoGuestCenter',
      })
    }
    
  },
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
      if(this.properties.forumImages.length>1){
        console.log("imgs.count=" + this.properties.forumImages);
        
        this.setData({
          forumImagesType:"multi"
        });
      }
      
    }}
})
