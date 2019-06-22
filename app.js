//app.js
var util = require('./utils/util.js');
App({
  onLaunch: function () {
    var userId = util.GetStorage("userId");
    if (typeof (userId)!='undefined'){
      this.globalData.userId = userId;
    }
  },
  onShow:function(){
  
  },
  globalData: {
    userId:String,
    userInfo: {},
    globaCSSUser:{
      userAvatarW:"80rpx",
      userAvatarH: "80rpx",
      userNicknameFontSize: "30rpx",
      userNicknameSubFontSize: "22rpx",
      userNicknameColor:"#393939",
      userNicknameSubColor: "#7a7979",
    }
  }, 
  
})