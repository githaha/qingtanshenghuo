// components/DrPubTypeShow/DrPubTypeShow.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    is_show:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   * typeVideo,typeTW
   */
  methods: {
      slectedType:function(e){
        let info = e.currentTarget.dataset.typeselected;
        console.log("点击了--" + info);
          this.setData({
            is_show:false
          });
          this.triggerEvent("hiddleSelect");
          if(info=="typeTW"){
          wx.navigateTo({
            url: '/pages/diary/publishContent/publishContent',
            })
          } else if (info == "typeVideo") {
            wx.navigateTo({
              url: '/pages/diary/publishVideo/publishVideo',
            })
          }
      }
      }
})
