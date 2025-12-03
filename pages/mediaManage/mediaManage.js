// pages/mediaManage/mediaManage.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    materials: [
      {
        id: 1,
        image: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=400',
        duration: '00:08',
        type: '外观',
        title: '车头 45° 远景',
        quality: '曝光正常 · 清晰度良好',
        time: '今天 14:22 · iPhone 15 Pro',
        status: '已入时间线'
      },
      {
        id: 2,
        image: 'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=400',
        duration: '00:12',
        type: '内饰',
        title: '主驾视角中控',
        quality: '建议保留 · 可用于功能展示',
        time: '今天 14:18 · 稳定度良好',
        status: '加入时间线'
      },
      {
        id: 3,
        image: 'https://images.pexels.com/photos/3075526/pexels-photo-3075526.jpeg?auto=compress&cs=tinysrgb&w=400',
        duration: '00:06',
        type: '亮点',
        title: 'HUD 抬头显示',
        quality: '建议配合"安全性/科技感"话术',
        time: '昨天 17:40 · AI 推荐保留',
        status: '加入时间线'
      }
    ],
    timelineItems: [
      {
        id: 1,
        type: '外观',
        duration: '08s'
      },
      {
        id: 2,
        type: '内饰',
        duration: '12s'
      },
      {
        id: 3,
        type: '内饰',
        duration: '08s'
      },
      {
        id: 4,
        type: '亮点',
        duration: '04s'
      },
      {
        id: 5,
        type: '亮点',
        duration: '03s'
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

  // 完成事件
  onDone() {
    console.log('完成素材管理');
  },

  // 排序事件
  onSort() {
    console.log('按拍摄时间排序');
  },

  // 素材点击事件
  onMaterialTap(e) {
    console.log('点击素材', e);
  },

  // 自动剪辑事件
  onAutoEdit() {
    console.log('去自动剪辑');
  },

  // 添加到时间线事件
  onAddToTimeline() {
    console.log('添加到时间线');
  }
});