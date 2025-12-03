// pages/home/home.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    vehicleList: [
      {
        id: 1,
        plate: '苏A · 88888',
        status: '在售',
        model: '2021 宝马 325Li M运动曜夜',
        features: '无钥匙进入 · 座椅加热 · 首保已做 · 一手车源',
        materials: 12,
        clips: 3,
        published: 5,
        imageUrl: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=800',
        statusType: 'available'
      },
      {
        id: 2,
        plate: '沪B · 66666',
        status: '已售',
        model: '2019 奔驰 C200L 运动版',
        features: '原厂漆 · 无事故 · 按时保养',
        materials: 8,
        clips: 2,
        published: 4,
        imageUrl: 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=800',
        statusType: 'sold'
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

  // 搜索输入事件
  onSearchInput(e) {
    console.log('搜索输入:', e.detail.value);
  },

  // 筛选事件
  onFilter() {
    console.log('点击筛选');
  },

  // 扫描二维码事件
  onScanQRCode() {
    console.log('扫描二维码');
  },

  // 新增车辆事件
  onAddVehicle() {
    console.log('新增车辆');
  },

  // 导入素材事件
  onImportMedia() {
    console.log('导入素材');
  },

  // 批量生成事件
  onBatchGenerate() {
    console.log('批量生成');
  },

  // 车辆点击事件
  onVehicleTap(e) {
    const vehicleId = e.currentTarget.dataset.id;
    console.log('点击车辆:', vehicleId);
  },

  // 加载更多事件
  onLoadMore() {
    console.log('加载更多车辆');
  },

  // 首页Tab事件
  onHomeTab() {
    console.log('首页Tab');
  },

  // 拍摄Tab事件
  onShootTab() {
    console.log('拍摄Tab');
    wx.switchTab({
      url: '/pages/shoot/shoot'
    });
  },

  // 成片Tab事件
  onClipsTab() {
    console.log('成片Tab');
    wx.switchTab({
      url: '/pages/clips/clips'
    });
  },

  // 我的Tab事件
  onProfileTab() {
    console.log('我的Tab');
    wx.switchTab({
      url: '/pages/profile/profile'
    });
  }
});