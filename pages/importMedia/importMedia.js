Page({
  data: {
    currentVehicle: {
      image: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=400',
      name: '宝马 325Li',
      plate: '苏A88888',
      description: '将导入的素材默认归属到此车辆'
    },
    
    enableSmartRecognition: true,
    
    importSources: [
      {
        id: 'album',
        icon: 'photo',
        name: '手机相册',
        active: true,
        color: 'blue'
      },
      {
        id: 'wechat',
        icon: 'weixin',
        name: '微信聊天',
        active: false,
        color: 'emerald'
      },
      {
        id: 'local',
        icon: 'folder',
        name: '本地文件',
        active: false,
        color: 'amber'
      }
    ],
    
    classificationRules: [
      {
        id: 'exterior',
        name: '外观',
        time: '约 10-20s',
        description: '识别车身、车头车尾、侧面等画面',
        bgColor: '#1e293b',
        borderColor: '#334155'
      },
      {
        id: 'interior',
        name: '内饰',
        time: '约 8-15s',
        description: '中控、方向盘、座椅、后排等画面',
        bgColor: '#1e293b',
        borderColor: '#334155'
      },
      {
        id: 'highlight',
        name: '亮点',
        time: '约 3-8s',
        description: 'HUD、音响、改装件等近景细节',
        bgColor: '#1e293b',
        borderColor: '#334155'
      }
    ],
    
    mediaItems: [
      {
        id: 1,
        image: 'https://images.pexels.com/photos/3752169/pexels-photo-3752169.jpeg?auto=compress&cs=tinysrgb&w=400',
        duration: '00:12',
        name: 'IMG_2025_0901.MP4',
        source: '手机相册',
        time: '今天 14:22',
        classification: '外观',
        classificationColor: 'blue',
        targetVehicle: '宝马 325Li',
        action: '修改归属'
      },
      {
        id: 2,
        image: 'https://images.pexels.com/photos/97079/pexels-photo-97079.jpeg?auto=compress&cs=tinysrgb&w=400',
        duration: '00:09',
        name: 'WeChat_2025_0901.MP4',
        source: '微信聊天',
        time: '今天 13:58',
        classification: '内饰',
        classificationColor: 'emerald',
        suggestion: 'AI 建议保留 · 清晰度高',
        action: '标记为备选'
      }
    ],
    
    summary: {
      count: 6,
      size: '1.2GB'
    }
  },

  onLoad() {
    // 页面加载时执行
  },

  onBack() {
    // 返回上一页
    console.log('返回上一页');
  },

  onFinish() {
    // 完成导入
    console.log('完成导入');
  },

  onSelectSource(e) {
    const sourceId = e.currentTarget.dataset.id;
    const importSources = this.data.importSources.map(source => ({
      ...source,
      active: source.id === sourceId
    }));
    
    this.setData({
      importSources
    });
  },

  switchVehicle() {
    // 切换车辆
    console.log('切换车辆');
  },

  toggleSmartRecognition() {
    this.setData({
      enableSmartRecognition: !this.data.enableSmartRecognition
    });
  },

  removeMedia(e) {
    const mediaId = e.currentTarget.dataset.id;
    console.log('移除素材:', mediaId);
  },

  modifyOwnership(e) {
    const mediaId = e.currentTarget.dataset.id;
    console.log('修改归属:', mediaId);
  },

  markAsAlternative(e) {
    const mediaId = e.currentTarget.dataset.id;
    console.log('标记为备选:', mediaId);
  }
});