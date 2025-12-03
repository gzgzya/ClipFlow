Page({
  data: {
    userInfo: {
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      name: '老李 · 二手车商',
      store: '门店：XX 名车行（主账号）'
    },
    
    stats: [
      { title: '本周成片', value: 24, change: '+ 36%', desc: '' },
      { title: '平均制作时长', value: '3.2', unit: '分', desc: '节省 18 分钟/条' },
      { title: '团队成员', value: 5, desc: '支持协作拍摄' }
    ],
    
    sections: [
      {
        title: '账号 & 团队',
        items: [
          { icon: 'person', text: '个人信息', url: '' },
          { icon: 'friend', text: '团队成员管理', url: '' },
          { icon: 'shop', text: '门店信息 & 品牌片头', url: '' }
        ]
      },
      {
        title: '剪辑 & 发布偏好',
        items: [
          { icon: 'voice', text: '口播音色 & 语速偏好', url: '' },
          { icon: 'music', text: 'BGM 风格偏好', url: '' },
          { icon: 'text', text: '字幕样式 & 字体', url: '' },
          { icon: 'send', text: '默认分发平台 & 规则', url: '' }
        ]
      },
      {
        title: '系统',
        items: [
          { icon: 'notification', text: '消息通知设置', url: '' },
          { icon: 'lock', text: '隐私 & 权限', url: '' },
          { icon: 'info', text: '关于 ClipFlow', url: '' }
        ]
      }
    ]
  },

  onLoad() {
    // 页面加载时执行
  },

  onHelpFeedback() {
    // 帮助与反馈
    console.log('跳转到帮助与反馈页面');
  },

  onSwitchStore() {
    // 切换门店
    console.log('切换门店');
  },

  onLogout() {
    // 退出登录
    console.log('退出登录');
  },

  onItemClick(e) {
    const { index, subindex } = e.currentTarget.dataset;
    const item = this.data.sections[index].items[subindex];
    console.log('点击设置项:', item.text);
  },
  
  onNavToHome() {
    wx.switchTab({
      url: '/pages/home/home'
    });
  },
  
  onNavToShoot() {
    wx.switchTab({
      url: '/pages/shootHome/shootHome'
    });
  },
  
  onNavToClips() {
    wx.switchTab({
      url: '/pages/clips/clips'
    });
  },
  
  onNavToProfile() {
    // 当前页面，无需跳转
  }
});