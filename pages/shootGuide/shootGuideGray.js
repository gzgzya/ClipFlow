// pages/shootGuide/shootGuideGray.js
Page({
  /**
   * 页面的初始数据 - 用于演示没有拍摄信息的情况
   */
  data: {
    // 添加拍摄进度状态数据
    shootProgress: {
      currentStep: 1, // 当前步骤（1-外观，2-内饰，3-亮点）
      totalSteps: 3,
      completedSteps: 0,
      steps: [
        { id: 1, name: '外观', status: 'pending' },
        { id: 2, name: '内饰', status: 'pending' },
        { id: 3, name: '亮点', status: 'pending' }
      ]
    },
    
    // 当前子步骤
    currentSubStep: 1,
    
    // 子步骤列表
    subSteps: [
      { id: 1, title: '主驾视角 · 中控&方向盘', subtitle: '建议突出液晶仪表、中控大屏', status: 'pending' },
      { id: 2, title: '后排空间 & 地台', subtitle: '建议拍摄腿部空间、地台凸起情况', status: 'pending' },
      { id: 3, title: '细节 & 配置展示', subtitle: '方向盘、座椅、音响、氛围灯等高频关注点', status: 'pending' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 页面显示时更新数据
    this.updateProgress();
  },

  /**
   * 更新进度显示
   */
  updateProgress() {
    const shootProgress = this.data.shootProgress;
    
    // 根据已完成步骤数量更新状态
    shootProgress.steps.forEach((step, index) => {
      if (index < shootProgress.completedSteps) {
        step.status = 'completed';
      } else if (index === shootProgress.completedSteps) {
        step.status = 'active';
      } else {
        step.status = 'pending';
      }
    });
    
    this.setData({
      shootProgress
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  // 返回事件
  onBack() {
    wx.navigateBack();
  },

  // 素材管理事件
  onMediaManage() {
    console.log('跳转到素材管理页面');
  },

  // 规范说明事件
  onStandard() {
    console.log('查看拍摄规范');
  },

  // 重拍本段事件
  onRetake() {
    console.log('重拍当前片段');
  },

  // 去拍摄事件
  onShoot(e) {
    console.log('开始拍摄');
  },

  // 跳转到下一步事件
  onNextStep() {
    console.log('跳转到下一步');
  },

  // 旋转镜头事件
  onRotate() {
    console.log('旋转镜头');
  },

  // 录制事件
  onRecord() {
    console.log('开始录制');
  },

  // 拍照事件
  onCapture() {
    console.log('拍照');
  }
});