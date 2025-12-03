// pages/vehicleDetail/vehicleDetail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    clipList: [
      {
        id: 1,
        image: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: '320Li 全景外观讲解',
        time: '昨日 15:23',
        description: '主打无事故、一手车源，适合注重性价比的家用用户。',
        status: '已发',
        platforms: [
          { name: '抖音', status: '已发' },
          { name: '视频号', status: '待发' }
        ]
      },
      {
        id: 2,
        image: 'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: '内饰体验细节展示',
        time: '待发布',
        description: '重点突出车内做工、配置、后排空间及乘坐体验。',
        status: '待发布',
        platforms: [
          { name: '快手', status: '待发布' }
        ]
      }
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

  // 编辑事件
  onEdit() {
    console.log('编辑车辆信息');
  },

  // 继续拍摄事件
  onContinueShoot() {
    console.log('继续拍摄');
  },

  // 智能剪辑事件
  onSmartEdit() {
    console.log('智能剪辑');
  },

  // 一键分发事件
  onPublish() {
    console.log('一键分发');
  },

  // 编辑车辆信息事件
  onEditInfo() {
    console.log('编辑车辆信息');
  },

  // 管理素材事件
  onManageMaterials() {
    console.log('管理素材');
  },

  // 新建成片事件
  onCreateClip() {
    console.log('新建成片');
  },

  // 成片点击事件
  onClipTap(e) {
    console.log('点击成片', e);
  }
});