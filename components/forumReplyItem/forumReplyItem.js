// components/forumReplyItem/forumReplyItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    avator:String,
    userNickname:String,
    userId:String,
    commentId:String,
    zanNum:{
      type:String,
      value:"0"
    },
    isLike:Boolean,
    replyContent:String,
    createTime:String,
    replyCount:Number
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    tapReplyItem:function(){
      var detail = {
        commentId:this.properties.commentId,
        toUserId: this.properties.userId,
        userNickname: this.properties.userNickname
      };
      this.triggerEvent("tapReplyItem", detail);
    },
    tapActive:function(){
      this.triggerEvent("commentZanEvent",{
        commentId: this.properties.commentId
      });
    },
    deleteItem:function(){
      this.triggerEvent("deleteComment", { commentId: this.properties.commentId});
    },
    clickShowAllReply:function(){
      wx.navigateTo({
        url: '/pages/diary/forumComment/forumComment?commentId=' + this.properties.commentId,
      })
    }
  }
})
