/**
 * 获取用户的OpenId,
 */

var wxApi = require("./wxApi.js");
var wxPost = require("./ports.js");
var util = require("./util.js");



/*
*微信登录:
*back:Promise
*/
function wxLoginPro(){
 return wxApi.wxPromisify(wx.login)({});
}
/**
 * 用户注册；根据后台要求，1，获取code,2,获取用户加密信息encryptedData，3
加密方式ivStr

 * 获取wx.login---code
*/
function resignUser(){
  return getUserInfo().then(res=>{
    var userInfo = res.userInfo;
    var encryptedData = res.encryptedData;
    var ivStr = res.iv;
    wxLoginPro().then(res=>{
      var code = res.code;
      wxApi.wxRequest(
        {
          url: wxPost.getUserAuthorCode, 
          data: {
            "code": code,
            "phone": '',
            "encryptedData": encryptedData,
            "ivStr": ivStr,
          },
          header: {
            'content-type': 'application/json'
          }
        }
      ).then(data => {
        
        if(data.result==true){
          //授权成功，
          var userId = data.objValue;
          var appInstance = getApp();
          appInstance.globalData.userId = userId;
          util.SetStorage("userId", userId, true);
         return Promise.resolve(userId);
        }else{
          return Promise.resolve("userId");
        }
      }).catch(error => {
        return Promise.reject("用户注册失败");
      })
    })
  });

}

function resignUserN(userDetail,code) {
  var userInfo = userDetail.userInfo;
  var encryptedData = userDetail.encryptedData;
  var ivStr = userDetail.iv;
  var code = code;
  return  wxApi.wxRequest(
      {
        url: wxPost.getUserAuthorCode,
        data: {
          "code": code,
          "phone": '',
          "encryptedData": encryptedData,
          "ivStr": ivStr,
        },
        header: {
          'content-type': 'application/json'
        }
      }
    )
}



/**
 * 保存用户信息
*/
function saveUserInfo(value){
  util.SetStorage("userInfo", value,true);
  var appInstance = getApp();
  appInstance.globalData.userInfo = value;
  
}
function saveUserDetail(value){
  util.SetStorage("userDetail", value, true);
}
function getUserDetail(){
 return util.GetStorage("userDetail", true);
}
function removeUserInfo(){
  util.RemoveStorage("userInfo", true);
}
/***
 * 根据传入的api查询用户是否已授权
 * 如option：{scope: "scope.userInfo"}
 * 获取用户设置信息，
 *
 */


/**
 * 1.获取用户信息
*/

var wxGettingPromisify = wxApi.wxPromisify(wx.getSetting);

function getUserInfo(){
  var that = this;
  var userInfoDetail = getUserDetail();
  if(userInfoDetail){
    return Promise.resolve(userInfoDetail);
  }else{
  return wxGettingPromisify({}).then(res=>{
      var authSetting = res.authSetting["scope.userInfo"];
    if (authSetting) {
      //用户已授权
      return   wxApi.wxPromisify(wx.getUserInfo)({}).then(resI=>{
        //获取用户信息，
        const userInfoG = resI.userInfo;
        saveUserInfo(resI);
        console.log("用户信息:" + userInfoG);
       return Promise.resolve(userInfoG);
      })
    } else {
      //用户未授权
      wx.navigateTo({
        url: "/pages/commonPage/getUserLoginAuthor/getUserLoginAuthor",
      })
    }
  })

  }
}
function getUserInfoN() {
  var that = this;
  var userInfoDetail = getUserDetail();
  if (userInfoDetail) {
    return Promise.resolve(userInfoDetail);
  } else {
    return wxGettingPromisify({}).then(res => {
      var authSetting = res.authSetting["scope.userInfo"];
      if (authSetting) {
        //用户已授权
        return wxApi.wxPromisify(wx.getUserInfo)({}).then(resI => {
          //获取用户信息，
          const userInfoG = resI.userInfo;
          saveUserInfo(resI);
          console.log("用户信息:" + userInfoG);
          return Promise.resolve(userInfoG);
        })
      } else {
        return Promise.reject({"auth":false});
      }
    })

  }
}
module.exports = {
  SaveUserInfo: saveUserInfo,
  RemoveUserInfo:removeUserInfo,
  GetUserInfo: getUserInfo,
  SaveUserDetail:saveUserDetail,
  GetUserDetail:getUserDetail,
  ResignUser: resignUserN,
  GetUserInfoN: getUserInfoN,
  WxLoginPro: wxLoginPro
}