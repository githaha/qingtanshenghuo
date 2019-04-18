var Promise = require("./es6-promise.min.js");
/**对微信api调用的封装
 * obj={}
 * ,scope,重新指定作用域
 */
function wxPromisify(fn,scope){
  return function(obj={}){
    return new Promise(function(resolve,reject){
      obj.success = function(res){
        //成功
        resolve(res);
      }
      obj.fail = function(res){
        return reject(res);
      }
      if(scope){
        var newFn = fn.bind(scope);
        newFn(obj);
      }else{
      fn(obj);
      }
      
    })
  }
}
/**
 * 封装request
 */
var wxrequest = wxPromisify(wx.request);
function wxRequest(options){
  return wxrequest(options).then(res =>{
    var data = res.data;
    return Promise.resolve(data);
  }).catch(err =>{
    return Promise.reject(err);
  })
}
module.exports = {
  wxPromisify: wxPromisify,
  wxRequest: wxRequest
}