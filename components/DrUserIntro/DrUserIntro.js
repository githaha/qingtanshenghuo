// components/DrUserIntro/DrUserIntro.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      userAvatar:String,
      userNickname:String,
      userSubInfo:String,
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
      wx.navigateTo({
        url: '/pages/myCenter/userInfoGuestCenter/userInfoGuestCenter',
      });
    }
  }
})
