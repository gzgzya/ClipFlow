// pages/vehicleSelector/vehicleSelector.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    selectedCount: 1,
    selectedVehicleId: null,
    currentVehiclePlate: '', // 当前车辆的车牌号
    mode: 'multi', // 默认多选模式，'selectSingle' 为单选模式
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
        selected: false,
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
        selected: false,
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
        selected: false,
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
    // 检查传入的模式参数
    if (options.mode === 'selectSingle') {
      this.setData({
        mode: 'selectSingle'
      });
    }
    
    // 如果传入了当前车辆信息，设置当前车辆的车牌
    if (options.currentVehiclePlate) {
      this.setData({
        currentVehiclePlate: options.currentVehiclePlate
      });
      
      // 找到当前车辆并将其设置为选中状态
      const updatedVehicles = this.data.vehicles.map(vehicle => ({
        ...vehicle,
        selected: vehicle.plate === options.currentVehiclePlate
      }));
      
      // 获取当前选中车辆的ID
      const currentVehicle = this.data.vehicles.find(v => v.plate === options.currentVehiclePlate);
      const selectedVehicleId = currentVehicle ? currentVehicle.id : null;
      
      this.setData({
        vehicles: updatedVehicles,
        selectedVehicleId: selectedVehicleId
      });
    }
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
    
    if (this.data.mode === 'selectSingle') {
      // 单选模式：选择一个车辆
      const selectedVehicle = this.data.vehicles.find(v => v.id === vehicleId);
      if (selectedVehicle) {
        // 检查是否是当前车辆，如果是则不执行任何操作
        if (selectedVehicle.plate === this.data.currentVehiclePlate) {
          wx.showToast({
            title: '已是当前车辆',
            icon: 'none'
          });
          return;
        }
        
        // 返回数据给上一个页面
        const eventChannel = this.getOpenerEventChannel();
        eventChannel.emit('acceptDataFromOpenedPage', {
          selectedVehicle: selectedVehicle
        });
        wx.navigateBack();
      }
    } else {
      // 多选模式：切换选择状态
      const updatedVehicles = this.data.vehicles.map(vehicle => {
        if (vehicle.id === vehicleId) {
          return { ...vehicle, selected: !vehicle.selected };
        }
        return vehicle;
      });
      
      // 计算选中的数量
      const selectedCount = updatedVehicles.filter(v => v.selected).length;
      
      this.setData({
        vehicles: updatedVehicles,
        selectedCount: selectedCount
      });
    }
  },


});