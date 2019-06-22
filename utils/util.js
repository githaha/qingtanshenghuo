var promise = require("./es6-promise.min.js");
var wxApi = require("./wxApi.js");
var post = require("./ports.js");
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function getSystemInfo(){
  return new Promise(function(reslolve,reject){
    wx.getSystemInfo({
      success: function(res){reslolve(res)},
      fail: function (res) { reject(res) }
    })
  });
}
/**
 * 过滤掉数组中重复元素
 */
function filterArray(Arr) {
  return Arr.filter(function (currentValue, index, self) {
    return self.indexOf(currentValue) == index;
  });
}
/* 
store封装 
*/
function setStorage(key, value, isSync = true) {
  if (isSync) {
    try {
      wx.setStorageSync(key, value);
    } catch (e) {
      wx.showToast({
        title: e,
        duration: 2000
      });
    }
  } else {
    wx.setStorage({
      key: key,
      data: value
    });
  }
}
function getStorage(key, isSync = true) {
  if (isSync) {
    try {
      var value = wx.getStorageSync(key);
      if (value) {
        return value;
      }
    } catch (e) {
      wx.showToast({
        title: e,
        duration: 2000
      });
    }
  } else {
    wx.getStorage({
      key: key,
      success: function (res) {
        return res.data;
      },
      fail: function () {
        return '';
      }
    });
  }
}
function removeStorage(key, isSync = true) {
  if (isSync) {
    try {
      wx.removeStorageSync(key);
    } catch (e) {
      wx.showToast({
        title: e,
        duration: 2000
      });
    }
  } else {
    wx.removeStorage({
      key: key,
      success: function (res) {
        console.log(res.data)
      }
    });
  }
}
/**
 * 获取图片全名称，
 */
function getImageFullUrl(imgName, isMini = false){
  //图片url-小图
    if (isMini) {
      //小图
      var nameArr = imgName.split(".");
      if(nameArr.length==2){
      var imgPrefix = nameArr[0];
      var imgSuffix = nameArr[1];
        return post.getImgbaseUrl + imgPrefix + "_min." + imgSuffix;
      }else{
        //取小图失败
        return post.getImgbaseUrl + imgName;
      }
    } else {
      return post.getImgbaseUrl + imgName;
    }
  
}
/**
 * 获取视频全url，
 */
function getFullVideoUrl(videoUrl){
  return post.getVideoBaseUrl + videoUrl;
}
function paseInitImgs(imgStr,isMini=false) {
  var imgs = [];
  if (typeof (imgStr) != 'undefined' && imgStr.length > 0) {
    imgStr.split(",").forEach(function (item) {
      var imgStrM = getImageFullUrl(item, isMini);
      imgs.push(imgStrM);
    });
  }
  return imgs;
}

/**
 *1. 时间字符串转时间对象
 */
function paseDateTime(dateStr){
  // var date = '2015-03-05 17:59:00.0';
  dateStr = dateStr.substring(0, 19);
  dateStr = dateStr.replace(/-/g, '/');
  var timestamp = new Date(dateStr);
  return timestamp;
  
}
/**
 *2. 时间字符串于当前时间比较，返回差值字符串
 */
function compareDateWith(dateStr){
  var dateCurrent = new Date();
  var dateIn = paseDateTime(dateStr);
  var resultC = (dateCurrent.getTime() - dateIn.getTime());
  resultC = resultC/1000;
  if (resultC <= 0) { return "";}
  if(resultC/(3600*24)>=1){
    //大于1天显示日期
    var year = dateIn.getFullYear().toString() ;
    var month = (dateIn.getMonth()+1).toString();
    var day = dateIn.getDate().toString();
    return year+"-"+month+"-"+day;
  }else {
    if(resultC/3600>1){
      //小时
      return parseInt(resultC/3600).toString()+"小时之前";
    }else{
      //分钟
      
      return parseInt(resultC / 60).toString() + "分钟之前";
    }
  }

}


module.exports = {
  formatTime: formatTime,
  getSystemInfo: getSystemInfo,
  filterDuplicateArray: filterArray,
  SetStorage: setStorage,
  GetStorage: getStorage,
  RemoveStorage: removeStorage,
  GetImageFullUrl: getImageFullUrl,
  PaseInitImgs: paseInitImgs,
  PaseDateTime: paseDateTime,
  CompareDateWith: compareDateWith,
  GetVideoUrl: getFullVideoUrl
}

