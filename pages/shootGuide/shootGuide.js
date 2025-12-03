// pages/shootGuide/shootGuide.js
Page({
  /**
   * 页面的初始数据
   */
  data: {

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