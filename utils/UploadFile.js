var wxApi = require("./wxApi.js");
var wxPost = require("./ports.js");
var wxUploadfilePromisify = wxApi.wxPromisify(wx.uploadFile);

/**
 * 上传单多个文件
 */
function uploadFiles(filePaths, successNum, failNum, length, index) {
  
  if (length>0){
    let PromiseArr = [];
    filePaths.forEach(function (filePath){
      var promisex = uploadSingleFile(filePath);
      PromiseArr.push(promisex);
    });
   return Promise.all(PromiseArr);
  }else{
    return Promise.resolve([]);
  }
  
}
/**
 * 上传单个个文件
 */
function uploadSingleFile(filePath){
 return new Promise(function(resolve,reject){
   wx.uploadFile({
     url: wxPost.uploadImgFile,
     filePath: filePath,
     name: 'picFile',
     header: {
       'content-type': 'multipart/form-data'
     },
     success:function(res){
       var JsonData = JSON.parse(res.data);
       var objStr = JsonData.objValue;
       resolve(objStr);
     },
     fail:function(err){
       var JsonData = JSON.parse(err.data);
       reject(JsonData);
     }
   })
  });
}
/**
 * 上传视频文件
 */
function uploadVideoFile(filePath) {
  wx.showLoading({
    title: '正在上传视频...',
  });
  return new Promise(function (resolve, reject) {
    wx.uploadFile({
      url: wxPost.uploadVideoFile,
      filePath: filePath,
      name: 'file',
      header: {
        'content-type': 'multipart/form-data'
      },
      success: function (res) {
        wx.hideLoading();
        var JsonData = JSON.parse(res.data);
        var objStr = JsonData.objValue;
        if (JsonData.result){
          resolve(objStr);
        }else{
          reject(objStr);
        }
       
      },
      fail: function (err) {
        wx.hideLoading();
        var JsonData = JSON.parse(err.data);
        reject(JsonData);
      }
    })
  });
}
module.exports = {
  UploadFiles: uploadFiles,
  UploadFile: uploadSingleFile,
  UploadVideoFile: uploadVideoFile
}