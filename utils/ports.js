/***接口api */

var baseUrl = "http://www.qtsh.bestfree360.com/lightcarbonlife/";

module.exports = {
  //--------1.通用---------
  //上传图片文件：1.1
  uploadImgFile:baseUrl + "picFile",
  //批量上传图片文件：1.2
  uploadImgFiles: baseUrl + "picFiles",


  //--------2.用户相关---------
  //2.1发送验证码
  getMobileCode: baseUrl + "getCode",
  //2.2注册
  userRegister: baseUrl + "user/register",
  //2.3获取所有用户列表
  getAllUserList: baseUrl + "user/getUsers",

  //--------3.论坛相关---------
  //3.1发帖
  postForum: baseUrl + "forum/addProblem",
  //3.2所有帖子列表
  postForum: baseUrl + "forum/listAllProblem",
  //3.3 帖子详情
  forumDetail: baseUrl + "forum/getProblem",
  //3.4 发表评论
  postComment: baseUrl + "forum/addReply",

}