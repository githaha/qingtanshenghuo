// components/DrVideoRecord/DrVideoRecord.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      selectCamera:{
        type: Boolean,
        value:false
      },
    recordTime:{//录像时间
      type:Number,
      value:10
    },
    recordTimeStr:String
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show() { 
      this.clickCameraType("camera");
    },
    hide() { },
    resize() {},
  },
  /**
   * 组件的初始数据
   */
  data: {
    recordStatusImg:"",
    //recordStatus:none,recording,pause,finish,
    recordStatus:"none",
    recordVideoImgSrc:"",//视频封面截图
    recordVideoSrc: "",//视频地址,
    isRecordFinish:false

  },
  ready() {
    this.cameraContext = wx.createCameraContext('myCamera');
  },
  /**
   * 组件的方法列表
   */
  methods: {
   
    clickCameraType:function(e){
      var typeS;
      if(e=="camera"){
        typeS = "camera"
      }else{
        typeS = e.currentTarget.dataset.type;
      }
      var that = this;
      if (typeS =='library'){//打开相册
        this.setData({
          selectCamera:true
        });
        wx.chooseVideo({
          sourceType: ['album','camera'],
          maxDuration:10,
          camera: 'back',
          success(res) {
            console.log(res.tempFilePath);
            var srcGet = res.tempFilePath;
            var size = res.size;//视频大小
            that.setData({
              recordVideoImgSrc: "restempThumbPath",
              recordVideoSrc: srcGet
            });
            //跳转到发布页面
            var videoSrc = srcGet;
            var videoScreenShotImg = "";
            wx.navigateTo({
              url: './publishVideoDetail/publishVIdeoDetail?videoSrc=' + videoSrc + '&videoScreenShotImg=' + videoScreenShotImg,
            })

          }

        })
      }else if(typeS=='camera'){
        this.setData({
          selectCamera: false
        });

      }
    },
    takeVideoClick:function(e){
      var that = this;
      if (typeof (this.cameraContext)=='undefined'){
        this.cameraContext = wx.createCameraContext('myCamera'); 
      }
      var status = this.data.recordStatus;
      var statusImg = this.data.recordStatusImg;
      switch (status){
          case "none":{
          
          this.clickSartRecord();
          }
          break;
        case "recording": {
          
          this.clickFinishRecord();
        }
          break;
        case "reStart": {
          wx.showModal({
            title: '提示',
            content: '是否重新录制视频？',
            success(res){
              if(res.confirm){
                statusImg = "";
                status = "none";
                that.data.recordStatusImg = "";
                that.data.recordVideoImgSrc = "";
              }else if(res.cancel){
                
              }
              that.setData({
                recordStatusImg: statusImg,
                recordStatus: status,
                recordTimeStr: ''
              });
            }
          })
          
        }
          break;
        case "finish": {
          statusImg = "/common/icons/videoReStart.png";
          status = "finish";
          this.setData({
            recordStatusImg: statusImg,
            recordStatus: status
          });
          this.clickFinishRecord();
        }
          break;
      }
      
    },
    clickFinish:function(){
      this.triggerEvent("recordVideoFinish", {
        "recordVideoImgSrc": this.data.recordVideoImgSrc,
        "recordVideoSrc": this.data.recordVideoSrc
      });
    }
    ,
    clickFinishRecord:function(){
      var that = this;
      clearInterval(that.timeInterval);
      //完成录制视频
      if (that.data.recordStatus == 'reStart' || that.data.recordStatus == 'finish'){
        return;
      }
      if(!that.cameraContext._isRecording){
        return;
      }
      that.cameraContext.stopRecord({
        success: (res) => {
          var  statusImg = "/common/icons/RecordReStart.png";
          var  status = "reStart";
          that.setData({
            recordStatusImg: statusImg,
            recordStatus: status,
            recordVideoImgSrc: res.tempThumbPath,
            recordVideoSrc: res.tempVideoPath,
            isRecordFinish:true
          });
        
         
        },
        error(e) {
          console.log(e.detail)
        }

      });
    },
    clickSartRecord:function(){
      var that = this;
      //开始录制视频
      this.cameraContext.startRecord({
        success: (res) => {
         var  statusImg = "/common/icons/videoRecording.png";
        var  status = "recording";
          that.setData({
            recordStatusImg: statusImg,
            recordStatus: status,
            isRecordFinish:false
          });
          var time = that.properties.recordTime;
          var index = 0;
          that.timeInterval  = setInterval(()=>{
            index++;
            time --;
          that.setData({
            recordTimeStr: index + 's'
          });  
          if(time<=0){
            
            that.clickFinishRecord();
            
          }
          },1000);
       
        }
      })
    }


  }
})
