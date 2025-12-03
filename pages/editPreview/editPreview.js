// pages/editPreview/editPreview.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    templates: [
      {
        id: 1,
        title: "30s 爆款竖屏",
        subtitle: "推荐 · 通用获客",
        description: "外观 / 内饰 / 亮点 / 价格"
      },
      {
        id: 2,
        title: "60s 全面解读",
        subtitle: "讲解详细",
        description: "适合精细介绍，成交导向"
      },
      {
        id: 3,
        title: "车源合集海报",
        subtitle: "多车合集",
        description: "适合朋友圈、社群"
      }
    ],
    aiOptions: [
      {
        id: 1,
        title: "AI 字幕 & 车况信息",
        description: "自动根据车辆信息和话术生成字幕，支持行驶里程、车况描述。",
        enabled: true
      },
      {
        id: 2,
        title: "AI 语音讲解",
        description: "使用自然人声自动配音，可在生成后手动替换或关掉。",
        enabled: true
      },
      {
        id: 3,
        title: "自动 BGM & 品牌片头片尾",
        description: "根据视频节奏自动匹配免版权 BGM，可加入自定义门店片头片尾。",
        enabled: true
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

  // 历史记录事件
  onHistory() {
    console.log('查看历史记录');
  },

  // 倒退事件
  onRewind() {
    console.log('倒退');
  },

  // 播放事件
  onPlay() {
    console.log('播放/暂停');
  },

  // 快进事件
  onForward() {
    console.log('快进');
  },

  // 管理模板事件
  onManageTemplate() {
    console.log('管理模板');
  },

  // AI选项变化事件
  onAIOptionChange(e) {
    console.log('AI选项变化', e);
  },

  // AI生成文案事件
  onAIGenerate() {
    console.log('AI生成文案');
  },

  // 文案输入事件
  onCopyInput(e) {
    console.log('文案输入', e.detail.value);
  },

  // 生成成片事件
  onGenerate() {
    console.log('一键生成成片');
  }
});