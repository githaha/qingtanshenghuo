
//测试工具js

//js函数--柯里化

function curryingAdd(x){
  return function(y){
    return x + y;
  }
}
function promiseDemo(time){
  return new Promise(
    function (resolve, reject){
      setTimeout(function(){
        console.log("--异步执行--第一次"+time);
        if(time<5){
          reject("时间太短了---reject");
        }else{
          resolve("时间足够----success");
        }
        
      },time*1000);
    }
  );
}
function ArrayDemo(){
  var arr = [1,2,3];
  console.log("argument:",arr);
  var arrARm = arr.slice(2);
  console.log(arrARm);
}
module.exports={
  curryingAdd:curryingAdd,
  promiseDemo:promiseDemo,
  arrayDemo: ArrayDemo
}