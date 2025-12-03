Page({
  data: {
    clipInfo: {
      image: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=400',
      title: '宝马 325Li 外观讲解',
      duration: '00:35',
      plate: '苏A88888',
      template: '30s 爆款竖屏'
    },
    
    selectedPlatformsCount: 3,
    
    platforms: [
      {
        id: 'douyin',
        icon: 'douyin',
        name: '抖音',
        account: '门店官方号',
        status: '已授权',
        detail: '昨日发布 8 条',
        checked: true,
        iconBg: 'douyin'
      },
      {
        id: 'kuaishou',
        icon: 'kuaishou',
        name: '快手',
        account: '老李讲二手车',
        status: '已授权',
        detail: '今日未发布',
        checked: true,
        iconBg: 'orange'
      },
      {
        id: 'shipinhao',
        icon: 'weixin',
        name: '视频号',
        account: 'XX名车行',
        status: '需审核标题规范',
        detail: '',
        checked: true,
        iconBg: 'emerald'
      },
      {
        id: 'xiaohongshu',
        icon: 'book',
        name: '小红书',
        account: '车圈分享号',
        status: '未登录',
        detail: '请先绑定',
        checked: false,
        iconBg: 'red'
      }
    ],
    
    caption: '一手车源 2021 宝马 325Li，3.8 万公里，无重大事故，配置丰富（全景天窗、HUD、自动泊车等），支持第三方检测。诚心价，可分期，想看车 / 想了解详细车况欢迎私聊我～',
    
    records: [
      {
        id: 1,
        platformIcon: 'douyin',
        platform: '抖音',
        title: '宝马 320Li 外观讲解',
        time: '昨日 19:23',
        views: '1.2 万',
        likes: 324,
        status: '发布成功',
        statusType: 'success'
      },
      {
        id: 2,
        platformIcon: 'weixin',
        platform: '视频号',
        title: '奔驰 C200L 内饰体验',
        time: '今天 09:12',
        status: '审核中',
        statusType: 'pending'
      },
      {
        id: 3,
        platformIcon: 'kuaishou',
        platform: '快手',
        title: '奥迪 A4L 综合讲解',
        time: '今天 08:45',
        status: '标题包含敏感词',
        statusType: 'failed'
      }
    ]
  },

  onLoad() {
    // 页面加载时执行
  },

  onBack() {
    // 返回上一页
    console.log('返回上一页');
  },

  onSettings() {
    // 设置
    console.log('打开设置');
  },

  onBindAccount() {
    // 绑定新账号
    console.log('绑定新账号');
  },

  onEditCaption() {
    // 编辑文案
    console.log('编辑文案');
  },

  onViewAllRecords() {
    // 查看全部记录
    console.log('查看全部发布记录');
  },

  onTogglePlatform(e) {
    const platformId = e.currentTarget.dataset.id;
    const platforms = this.data.platforms.map(platform => {
      if (platform.id === platformId) {
        return { ...platform, checked: !platform.checked };
      }
      return platform;
    });
    
    // 计算选中的平台数量
    const selectedPlatformsCount = platforms.filter(p => p.checked).length;
    
    this.setData({
      platforms,
      selectedPlatformsCount
    });
  },

  onRetryPublish(e) {
    const recordId = e.currentTarget.dataset.id;
    console.log('重新发布记录:', recordId);
  }
});