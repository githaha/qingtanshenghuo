
var wxPost = require("../../../utils/ports.js");
var wxApi = require("../../../utils/wxApi.js");
module.exports ={
  /**
    * 帖子点赞
   *  userId,forumId
   */
  forumZanEvent: function (userId,forumId) {
    return  wxApi.wxRequest({
      url: wxPost.forumZan,
      data: {
        userId: userId,
        problemId: forumId
      }
    }, "正在提交", false);
  },
   /**
    * 
   * 评论点赞
   */
  forumCommentZanEvent: function (userId,commentId) {

  return  wxApi.wxRequest({
      url: wxPost.commentZan,
      data: {
        userId: userId,
        commentId: commentId
      }
    }, "正在提交", false);
  },
  /**
    * 
   * 回复点赞
   */
  forumReplyZanEvent: function (userId, replyId) {

    return wxApi.wxRequest({
      url: wxPost.forumReplyZan,
      data: {
        userId: userId,
        replyId: replyId
      }
    }, "正在提交", false);
  },


}