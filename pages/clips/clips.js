Page({
  data: {
    totalCount: 128,
    searchKeyword: '',
    activeTab: 'all',
    activeSort: 'time',
    activePlatform: 'all',
    showBackButton: false, // 是否显示返回按钮
    
    tabs: [
      { id: 'all', name: '全部' },
      { id: 'pending', name: '待发布' },
      { id: 'published', name: '已发布' },
      { id: 'draft', name: '草稿' }
    ],
    
    platforms: [
      { id: 'all', name: '全部平台' },
      { id: 'douyin', name: '抖音', icon: 'video_fill', iconClass: 'douyin' },
      { id: 'kuaishou', name: '快手', icon: 'video_fill', iconClass: 'kuaishou' },
      { id: 'shipinhao', name: '视频号', icon: 'video_fill', iconClass: 'weixin' },
      { id: 'xiaohongshu', name: '小红书', icon: 'book', iconClass: 'xiaohongshu' }
    ],
    
    clips: [
      {
        id: 1,
        image: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=600',
        duration: '00:32',
        template: '标准讲车',
        templateClass: 'standard',
        title: '宝马 325Li ｜ 外观+内饰+亮点讲解',
        time: '昨天 19:23',
        description: '一手 2021 年宝马 325Li，3.8 万公里，无重大事故，配置丰富，主打家用兼顾操控。',
        status: '已发布 2 / 4 平台',
        statusClass: 'published',
        vehiclePlate: '苏A88888',
        platformStatus: [
          { id: 'douyin', icon: 'video_fill', iconClass: 'douyin', textClass: 'published', statusText: '已发 · 播放 1.2 万' },
          { id: 'kuaishou', icon: 'video_fill', iconClass: 'kuaishou', textClass: 'published', statusText: '已发 · 播放 8,934' },
          { id: 'shipinhao', icon: 'video_fill', iconClass: 'weixin', textClass: 'pending', statusText: '待发' },
          { id: 'xiaohongshu', icon: 'book', iconClass: 'xiaohongshu', textClass: 'unconfigured', statusText: '未配置' }
        ]
      },
      {
        id: 2,
        image: 'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=600',
        duration: '00:18',
        template: '内饰体验',
        templateClass: 'interior',
        title: '奔驰 C200L ｜ 内饰空间体验',
        time: '待发布',
        description: '重点展示后排空间、乘坐舒适性以及用料做工，适合家用人群参考。',
        status: '草稿 · 未分发',
        statusClass: 'pending',
        vehiclePlate: '沪B66666'
      },
      {
        id: 3,
        image: 'https://images.pexels.com/photos/3075526/pexels-photo-3075526.jpeg?auto=compress&cs=tinysrgb&w=600',
        duration: '00:12',
        template: '亮点合集',
        templateClass: 'highlight',
        title: '多车亮点合集 ｜ 适合发朋友圈/社群',
        time: '今天 10:05',
        description: '汇总多辆车的配置亮点，一条视频带出多台车源，提升咨询转化。',
        status: '发布失败 · 标题含敏感词',
        statusClass: 'failed',
        vehiclePlate: '多辆车',
        platformStatus: [
          { id: 'shipinhao', icon: 'video_fill', iconClass: 'weixin', textClass: 'pending', statusText: '审核中' },
          { id: 'douyin', icon: 'video_fill', iconClass: 'douyin', textClass: 'failed', statusText: '发布失败 · 标题含敏感词' }
        ]
      }
    ]
  },

  onLoad(options) {
    // 页面加载时执行
    // 检查是否有来自首页的参数
    if (options.from === 'home') {
      this.setData({
        showBackButton: true
      });
    }
  },

  onSearchInput(e) {
    this.setData({
      searchKeyword: e.detail.value
    });
  },

  onFilter() {
    // 筛选功能
    console.log('筛选功能');
  },

  onTabChange(e) {
    const tabId = e.currentTarget.dataset.id;
    this.setData({
      activeTab: tabId
    });
  },

  onSortChange() {
    // 排序功能
    console.log('排序功能');
  },

  onPlatformChange(e) {
    const platformId = e.currentTarget.dataset.id;
    this.setData({
      activePlatform: platformId
    });
  },

  onClipClick(e) {
    const id = e.currentTarget.dataset.id;
    // 跳转到成片详情页
    console.log('点击成片卡片:', id);
  },

  onClipPublish(e) {
    const id = e.currentTarget.dataset.id;
    // 发布成片
    console.log('发布成片:', id);
  },

  onClipCopy(e) {
    const id = e.currentTarget.dataset.id;
    // 复制文案
    console.log('复制文案:', id);
  },

  onClipRetry(e) {
    const id = e.currentTarget.dataset.id;
    // 重新发布
    console.log('重新发布:', id);
  },
  
  // 返回上一页
  onBack() {
    wx.navigateBack();
  },
  
  onNavToVehicles() {
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
    // 当前页面，无需跳转
  },
  
  onNavToProfile() {
    wx.switchTab({
      url: '/pages/profile/profile'
    });
  }
});