App({
  onLaunch() {
    // 小程序初始化时执行
    console.log('ClipFlow 小程序启动');
  },
  
  onHide() {
    // 小程序进入后台时执行
    console.log('ClipFlow 小程序进入后台');
    // 注意：这里不清除缓存，因为用户可能只是切换到其他应用
  },
  
  globalData: {
    userInfo: null,
    shootGuideMediaCache: {} // 存储标准化拍摄页面的媒体数据，格式为 { stepIndex: { subStepIndex: { mediaUrl, mediaType, status } } }
  }
})