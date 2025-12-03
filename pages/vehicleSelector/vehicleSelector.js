// pages/vehicleSelector/vehicleSelector.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    selectedCount: 3,
    vehicles: [
      {
        id: 1,
        plate: '苏A · 88888',
        status: '在售',
        model: '2021 宝马 325Li M运动曜夜',
        features: '无钥匙进入 · 座椅加热 · 首保已做 · 一手车源',
        materials: 12,
        clips: 3,
        imageUrl: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=800',
        selected: true,
        inQueue: true
      },
      {
        id: 2,
        plate: '沪B · 66666',
        status: '在售',
        model: '2019 奔驰 C200L 运动版',
        features: '原厂漆 · 无事故 · 按时保养',
        materials: 8,
        clips: 2,
        imageUrl: 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=800',
        selected: true,
        inQueue: true
      },
      {
        id: 3,
        plate: '浙C · 12345',
        status: '在售',
        model: '2020 奥迪 A4L 40 TFSI',
        features: '全景天窗 · 无重大事故 · 支持检测',
        materials: 4,
        clips: 1,
        imageUrl: 'https://images.pexels.com/photos/3075526/pexels-photo-3075526.jpeg?auto=compress&cs=tinysrgb&w=800',
        selected: true,
        inQueue: true
      },
      {
        id: 4,
        plate: '京A · 99999',
        status: '在售',
        model: '2022 特斯拉 Model 3',
        features: '长续航版 · 白色 · 一手车源',
        materials: 6,
        clips: 0,
        imageUrl: 'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=800',
        selected: false,
        inQueue: false
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

  // 全选事件
  onSelectAll() {
    console.log('全选');
  },

  // 搜索输入事件
  onSearchInput(e) {
    console.log('搜索输入:', e.detail.value);
  },

  // 筛选事件
  onFilter() {
    console.log('筛选');
  },

  // 清空选择事件
  onClearSelection() {
    console.log('清空选择');
  },

  // 车辆选择事件
  onVehicleSelect(e) {
    const vehicleId = e.detail.id;
    console.log('车辆选择:', vehicleId);
  },

  // 取消事件
  onCancel() {
    console.log('取消选择');
  },

  // 确认事件
  onConfirm() {
    console.log('确认选择');
  }
});