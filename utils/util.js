var promise = require("./es6-promise.min.js");

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


module.exports = {
  formatTime: formatTime,
  getSystemInfo: getSystemInfo,
  filterDuplicateArray: filterArray
}

