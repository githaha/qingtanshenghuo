// components/DrKeyboardForum/DrKeyboardForum.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    placeText:{
      type:String,
      value:"写评论"
    },
    commentNum:{
      type:String,
      value:'0'
    },
    isLike:{
      type:Boolean,
      value:false
    },
    focus:{
      type: Boolean,
      value: false
    },
    isShowCount:{
      type:Boolean,
      value:true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    inputValue:""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindconfirm:function(e){
      this.triggerEvent("confirm",{content:e.detail.value});
      this.setData({
        inputValue:""
      });
    },
    tapZanEvent:function(e){
      this.triggerEvent("forumZanEvent");
    }
  }
})
