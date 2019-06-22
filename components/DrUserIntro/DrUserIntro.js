// components/DrUserIntro/DrUserIntro.js
var commonJs = require("../../utils/commonRequire.js");

Component({
  /**
   * 组件的属性列表
   */
  properties: {
      userId :String,
      userAvatar:String,
      userNickname:String,
      userSubInfo:String,
      userType:{
        type:String,
        value:""
      },
      canClickHeadImg:{
        type:Boolean,
        value:true
      }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    
    tapForumItemUserInfo: function () {
      if (this.properties.canClickHeadImg){
      if (this.data.userId == commonJs.App.globalData.userId){
        wx.switchTab({
          url: '/pages/myCenter/myCenterMain/myCenterIndex?toUserId=' + this.data.userId,
        })
      }else{
        wx.navigateTo({
          url: '/pages/myCenter/userInfoGuestCenter/userInfoGuestCenter?toUserId=' + this.data.userId,
        });
        }
      }
      
    }
  }
})
