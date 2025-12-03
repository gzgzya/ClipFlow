Page({
  data: {
    remainingVehicles: 3,
    completedToday: 2,
    
    continuingVehicles: [
      {
        id: 1,
        image: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=400',
        name: '宝马 325Li',
        plate: '苏A88888',
        status: '已完成：外观 · 内饰 ｜ 待拍：亮点',
        materials: 12,
        lastTime: '10 分钟前',
        actionText: '继续拍摄',
        actionType: 'continue'
      },
      {
        id: 2,
        image: 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=400',
        name: '奔驰 C200L',
        plate: '沪B66666',
        status: '已完成：外观 ｜ 待拍：内饰 · 亮点',
        materials: 5,
        suggestion: '建议补拍内饰',
        actionText: '去拍内饰',
        actionType: 'interior'
      }
    ],
    
    quickVehicles: [
      {
        id: 3,
        image: 'https://images.pexels.com/photos/3075526/pexels-photo-3075526.jpeg?auto=compress&cs=tinysrgb&w=400',
        name: '奥迪 A4L',
        plate: '浙C12345',
        status: '未拍摄 ｜ 建议先拍「外观三段」',
        actionText: '开始拍摄',
        actionType: 'start'
      }
    ]
  },

  onLoad() {
    // 页面加载时执行
  },

  onSearchInput(e) {
    // 搜索输入处理
    console.log('搜索关键词:', e.detail.value);
  },

  onViewList() {
    // 查看列表
    console.log('查看未完成拍摄车辆列表');
  },

  onAllVehicles() {
    // 全部车辆
    console.log('跳转到全部车辆页面');
  },

  onSwitchCamera() {
    // 切换摄像头
    console.log('切换摄像头');
  },

  onVehicleAction(e) {
    const id = e.currentTarget.dataset.id;
    console.log('车辆操作:', id);
    // 根据车辆ID和操作类型执行相应动作
  },
  
  onNavToHome() {
    wx.switchTab({
      url: '/pages/home/home'
    });
  },
  
  onNavToShoot() {
    // 当前页面，无需跳转
  },
  
  onNavToClips() {
    wx.switchTab({
      url: '/pages/clips/clips'
    });
  },
  
  onNavToProfile() {
    wx.switchTab({
      url: '/pages/profile/profile'
    });
  }
});