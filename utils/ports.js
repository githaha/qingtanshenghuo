/***接口api */

var baseUrl = "https://qtsh.bestfree360.com/lightcarbonlife/";

module.exports = {
  //--------1.通用---------file/upload 

  //上传图片文件：1.1
  uploadImgFile: baseUrl + "file/upload",
  //批量上传图片文件：1.2
  uploadImgFiles: baseUrl + "file/uploads",
  //上传视频
  uploadVideoFile: baseUrl + "file/uploadVideo",

  //--------2.用户相关---------
  
  //2.1发送验证码
  getMobileCode: baseUrl + "getCode",
  //2.2注册
  userRegister: baseUrl + "user/register",
  //2.3获取所有用户列表
  getAllUserList: baseUrl + "user/getUsers",
  //2.4用户授权
  getUserAuthorCode: baseUrl + "user/accredit",
  //2.6用户关注
  userAddFollow: baseUrl + "user/addFollow", 

  //2.7用户个人中心
  userCenter: baseUrl + "user/myroom",
  //2.8 我关注的人
  userFollows: baseUrl + "user/listFollow",
  //2.9 我粉丝
  userFans: baseUrl + "user/listFans",
  //--------3.论坛相关---------
  //3.1发帖
  postForum: baseUrl + "forum/addProblem",
  //3.11帖子分享
  postForumShare: baseUrl + "forum/addProblemShare",
  //3.12 评论点赞
  commentZan: baseUrl + "forum/addCommentLike",
  //3.10 帖子点赞
  forumZan: baseUrl + "forum/addProblemLike",
  //3.13 回复点赞
  forumReplyZan: baseUrl + "forum/addReplyLike",
  //3.14 用户发帖列表
  userPublicForumList: baseUrl + "forum/listUserProblem",
  //3.2所有帖子列表
  getForumList: baseUrl + "forum/listAllProblem",
  //3.3 帖子详情
  forumDetail: baseUrl + "forum/getProblem",
  //3.4 发表评论
  postComment: baseUrl + "forum/addComment",
  //3.5 回复评论
  postCommentReply: baseUrl + "forum/addReply",
  //3.6 回复列表
  postCommentReplyList: baseUrl + "forum/getComment",
  //3.8删除评论
  postCommentDel: baseUrl + "forum/deleteComment",
  //3.9删除回复
  postReplyDel: baseUrl + "forum/deleteReply",
  //图片url-大图
  getImgbaseUrl: "http://www.bestfree360.com:20383/PIC/",
  //图片url-大图
  getVideoBaseUrl: "http://www.bestfree360.com:20383/VIDEO/",

}