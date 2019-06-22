
//测试工具js
var wxApi = require("./wxApi.js");
var wxPost = require("./ports.js");
var uploadFile = require("./UploadFile.js");
var utils = require("./util.js");
var userInfoJs = require("./UserInfo.js");
module.exports={

  APITest:function(option){
    this.resignUser();
  },
  resignUser: function () {
    var that = this;
    userInfoJs.GetUserInfoN().then(userDetail => {
      //获取了用户信息，再调用微信登陆接口获取code,最后注册
      userInfoJs.WxLoginPro().then(userCode => {
        userInfoJs.ResignUser(userDetail, userCode.code).then(data => {
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
  }

}