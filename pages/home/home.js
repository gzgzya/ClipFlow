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
    ],
    showFilterPopup: false, // 是否显示筛选弹窗
    filterStatus: 'all', // 车辆状态筛选条件
    filterClips: 'all', // 成片数量筛选条件
    sortOrder: 'time', // 排序方式
    loadingMore: false, // 是否正在加载更多
    currentTab: 'home' // 当前选中的Tab
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
    this.loadMoreVehicles();
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
    this.setData({
      showFilterPopup: true
    });
  },

  // 关闭筛选弹窗
  closeFilterPopup() {
    this.setData({
      showFilterPopup: false
    });
  },

  // 选择车辆状态筛选条件
  selectFilterStatus(e) {
    const status = e.currentTarget.dataset.status;
    this.setData({
      filterStatus: status
    });
  },

  // 选择成片数量筛选条件
  selectFilterClips(e) {
    const clips = e.currentTarget.dataset.clips;
    this.setData({
      filterClips: clips
    });
  },

  // 选择排序方式
  selectSortOrder(e) {
    const order = e.currentTarget.dataset.order;
    this.setData({
      sortOrder: order
    });
  },

  // 应用筛选条件
  applyFilters() {
    console.log('应用筛选条件:', {
      status: this.data.filterStatus,
      clips: this.data.filterClips,
      order: this.data.sortOrder
    });
    
    // 关闭弹窗
    this.closeFilterPopup();
  },

  // 新增车辆事件
  onAddVehicle() {
    // 模拟页面跳转
    console.log('新增车辆');
  },

  // 导入素材事件
  onImportMedia() {
    // 模拟页面跳转
    console.log('导入素材');
  },

  // 批量生成事件
  onBatchGenerate() {
    // 模拟页面跳转
    console.log('批量生成');
  },

  // 车辆点击事件
  onVehicleTap(e) {
    const vehicleId = e.currentTarget.dataset.id;
    console.log('点击车辆:', vehicleId);
  },

  // 加载更多车辆
  loadMoreVehicles() {
    if (this.data.loadingMore) return;
    
    this.setData({
      loadingMore: true
    });
    
    // 模拟网络请求
    setTimeout(() => {
      const newVehicles = [
        {
          id: 3,
          plate: '京C · 99999',
          status: '在售',
          model: '2020 奥迪 A4L 时尚动感型',
          features: '全景天窗 · 自动泊车 · 无钥匙启动',
          materials: 15,
          clips: 4,
          published: 2,
          imageUrl: 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=800',
          statusType: 'available'
        },
        {
          id: 4,
          plate: '粤D · 77777',
          status: '已售',
          model: '2018 宝马 X3 xDrive20i',
          features: '四驱系统 · 电动尾门 · 液晶仪表',
          materials: 10,
          clips: 1,
          published: 3,
          imageUrl: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=800',
          statusType: 'sold'
        }
      ];
      
      this.setData({
        vehicleList: [...this.data.vehicleList, ...newVehicles],
        loadingMore: false
      });
    }, 1000);
  },

  // 首页Tab事件
  onHomeTab() {
    this.setData({
      currentTab: 'home'
    });
    console.log('首页Tab');
  },

  // 拍摄Tab事件
  onShootTab() {
    this.setData({
      currentTab: 'shoot'
    });
    console.log('拍摄Tab');
    wx.switchTab({
      url: '/pages/shootHome/shootHome'
    });
  },

  // 成片Tab事件
  onClipsTab() {
    this.setData({
      currentTab: 'clips'
    });
    console.log('成片Tab');
    wx.switchTab({
      url: '/pages/clips/clips'
    });
  },

  // 我的Tab事件
  onProfileTab() {
    this.setData({
      currentTab: 'profile'
    });
    console.log('我的Tab');
    wx.switchTab({
      url: '/pages/profile/profile'
    });
  }
});