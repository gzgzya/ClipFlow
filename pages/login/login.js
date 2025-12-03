// pages/login/login.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    captcha: '',
    agreed: true,
    selectedRole: '二手车商'
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

  // 手机号输入事件
  onPhoneInput(e) {
    this.setData({
      phone: e.detail.value
    });
  },

  // 验证码输入事件
  onCaptchaInput(e) {
    this.setData({
      captcha: e.detail.value
    });
  },

  // 获取验证码事件
  onGetCaptcha() {
    console.log('获取验证码');
  },

  // 微信登录事件
  onWechatLogin() {
    console.log('微信登录');
  },

  // 角色选择事件
  onRoleSelect(e) {
    const role = e.currentTarget.dataset.role;
    this.setData({
      selectedRole: role
    });
    console.log('选择角色:', role);
  },

  // 协议勾选事件
  onAgreementChange(e) {
    this.setData({
      agreed: e.detail.value
    });
    console.log('协议勾选状态:', e.detail.value);
  },

  // 查看用户协议
  onShowAgreement() {
    console.log('查看用户协议');
  },

  // 查看隐私政策
  onShowPrivacy() {
    console.log('查看隐私政策');
  },

  // 登录事件
  onLogin() {
    if (!this.data.agreed) {
      wx.showToast({
        title: '请先同意用户协议和隐私政策',
        icon: 'none'
      });
      return;
    }

    if (!this.data.phone) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      });
      return;
    }

    if (!this.data.captcha) {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none'
      });
      return;
    }

    console.log('执行登录操作', {
      phone: this.data.phone,
      captcha: this.data.captcha,
      role: this.data.selectedRole
    });

    // 跳转到首页
    wx.redirectTo({
      url: '/pages/home/home'
    });
  }
});