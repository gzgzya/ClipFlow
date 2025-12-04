// pages/vehicleEdit/vehicleEdit.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    statusOptions: ['在售', '已售'],
    statusIndex: 0,
    photos: [],
    // 添加表单数据字段
    plateNumber: '', // 车牌号
    brand: '', // 品牌
    series: '', // 车系
    year: '', // 年款
    engine: '', // 排量/能源
    mileage: '', // 表显里程
    color: '' // 车身颜色
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 初始化空的图片数组
    this.setData({
      photos: []
    });
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

  // 保存事件
  onSave() {
    console.log('保存车辆信息');
  },

  // 车牌号输入事件
  onPlateInput(e) {
    this.setData({
      plateNumber: e.detail.value
    });
    console.log('车牌号输入:', e.detail.value);
  },

  // 车辆状态选择事件
  onStatusChange(e) {
    this.setData({
      statusIndex: e.detail.value
    });
    console.log('车辆状态选择:', e.detail.value);
  },

  // 品牌输入事件
  onBrandInput(e) {
    this.setData({
      brand: e.detail.value
    });
    console.log('品牌输入:', e.detail.value);
  },

  // 车系输入事件
  onSeriesInput(e) {
    this.setData({
      series: e.detail.value
    });
    console.log('车系输入:', e.detail.value);
  },

  // 年款输入事件
  onYearInput(e) {
    this.setData({
      year: e.detail.value
    });
    console.log('年款输入:', e.detail.value);
  },

  // 排量/能源输入事件
  onEngineInput(e) {
    this.setData({
      engine: e.detail.value
    });
    console.log('排量/能源输入:', e.detail.value);
  },

  // 表显里程输入事件
  onMileageInput(e) {
    this.setData({
      mileage: e.detail.value
    });
    console.log('表显里程输入:', e.detail.value);
  },

  // 车身颜色输入事件
  onColorInput(e) {
    this.setData({
      color: e.detail.value
    });
    console.log('车身颜色输入:', e.detail.value);
  },

  // 卖点亮点输入事件
  onHighlightsInput(e) {
    console.log('卖点亮点输入:', e.detail.value);
  },

  // 推荐话术输入事件
  onDescriptionInput(e) {
    console.log('推荐话术输入:', e.detail.value);
  },

  // AI生成推荐话术事件
  onGenerateDescription() {
    console.log('AI生成推荐话术');
    // 这里可以添加AI生成话术的逻辑
  },

  // 添加照片事件
  onAddPhoto() {
    console.log('添加照片');
    
    // 使用微信小程序的API选择图片
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机
      success: (res) => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        
        // 添加新图片到数组
        const photos = this.data.photos;
        const isFirst = photos.length === 0; // 如果是第一张图片，则设为封面
        
        photos.push({ 
          url: tempFilePaths[0], 
          cover: isFirst
        });
        
        this.setData({
          photos: photos
        });
      },
      fail: (err) => {
        console.error('选择图片失败', err);
      }
    });
  },

  // 删除照片事件
  onDeletePhoto(e) {
    // 阻止事件冒泡
    e.stopPropagation();
    
    const index = e.currentTarget.dataset.index;
    const photos = this.data.photos;
    
    // 从数组中移除指定索引的图片
    photos.splice(index, 1);
    
    // 如果第一张图片被删除且还有其他图片，将新第一张设为封面
    if (photos.length > 0 && index === 0) {
      photos[0].cover = true;
    }
    
    this.setData({
      photos: photos
    });
  },

  // 设置封面图片
  onSetCover(e) {
    const url = e.currentTarget.dataset.url;
    const photos = this.data.photos;
    
    // 如果点击的是添加按钮或无效图片，则不处理
    if (!url) return;
    
    // 重置所有图片的封面标记
    photos.forEach(photo => {
      photo.cover = false;
    });
    
    // 设置当前点击的图片为封面
    const clickedPhoto = photos.find(photo => photo.url === url);
    if (clickedPhoto) {
      clickedPhoto.cover = true;
    }
    
    this.setData({
      photos: photos
    });
  },

  // 验证必填字段
  validateRequiredFields() {
    const {
      plateNumber,
      brand,
      series,
      year,
      engine,
      mileage,
      color,
      photos
    } = this.data;

    // 验证车牌号
    if (!plateNumber || plateNumber.trim() === '') {
      wx.showToast({
        title: '请输入车牌号',
        icon: 'none'
      });
      return false;
    }

    // 验证品牌
    if (!brand || brand.trim() === '') {
      wx.showToast({
        title: '请输入品牌',
        icon: 'none'
      });
      return false;
    }

    // 验证车系
    if (!series || series.trim() === '') {
      wx.showToast({
        title: '请输入车系',
        icon: 'none'
      });
      return false;
    }

    // 验证年款
    if (!year || year.trim() === '') {
      wx.showToast({
        title: '请输入年款',
        icon: 'none'
      });
      return false;
    }

    // 验证排量/能源
    if (!engine || engine.trim() === '') {
      wx.showToast({
        title: '请输入排量或能源类型',
        icon: 'none'
      });
      return false;
    }

    // 验证表显里程
    if (!mileage || mileage.trim() === '') {
      wx.showToast({
        title: '请输入表显里程',
        icon: 'none'
      });
      return false;
    }

    // 验证车身颜色
    if (!color || color.trim() === '') {
      wx.showToast({
        title: '请输入车身颜色',
        icon: 'none'
      });
      return false;
    }

    // 验证车辆照片
    if (!photos || photos.length === 0) {
      wx.showToast({
        title: '请至少上传一张车辆照片',
        icon: 'none'
      });
      return false;
    }

    // 所有验证通过
    return true;
  },

  // 保存并开始拍摄事件
  onSaveAndShoot() {
    console.log('保存并开始拍摄');
    
    // 验证必填字段
    if (!this.validateRequiredFields()) {
      return;
    }
    
    // 验证通过后的处理逻辑
    // 保存车辆信息并跳转到标准化拍摄页面
    console.log('所有必填字段已验证通过，保存车辆信息并跳转到标准化拍摄页面');
    
    // 跳转到标准化拍摄页面
    wx.navigateTo({
      url: '/pages/shootGuide/shootGuide'
    });
  }
});