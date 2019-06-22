// components/DrImgEdit.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgUrl:String
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
    deleIconTap:function(){
      this.triggerEvent("deleteImg", { imgUrl: this.properties.imgUrl});
    }
  }
})
