// pages/vehicleEdit/vehicleEdit.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    statusOptions: ['在售', '已售'],
    statusIndex: 0,
    photos: [
      { url: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=400', cover: true },
      { url: 'https://images.pexels.com/photos/3075526/pexels-photo-3075526.jpeg?auto=compress&cs=tinysrgb&w=400', cover: false },
      { url: 'https://images.pexels.com/photos/97079/pexels-photo-97079.jpeg?auto=compress&cs=tinysrgb&w=400', cover: false },
      { url: '', cover: false }
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

  // 保存事件
  onSave() {
    console.log('保存车辆信息');
  },

  // 车牌号输入事件
  onPlateInput(e) {
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
    console.log('品牌输入:', e.detail.value);
  },

  // 车系输入事件
  onSeriesInput(e) {
    console.log('车系输入:', e.detail.value);
  },

  // 年款输入事件
  onYearInput(e) {
    console.log('年款输入:', e.detail.value);
  },

  // 排量/能源输入事件
  onEngineInput(e) {
    console.log('排量/能源输入:', e.detail.value);
  },

  // 表显里程输入事件
  onMileageInput(e) {
    console.log('表显里程输入:', e.detail.value);
  },

  // 车身颜色输入事件
  onColorInput(e) {
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
  },

  // 保存并开始拍摄事件
  onSaveAndShoot() {
    console.log('保存并开始拍摄');
  }
});