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
        action: '修改归属',
        size: 0.22
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
        action: '标记为备选',
        size: 0.18
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
    wx.showToast({
      title: '开始导入素材',
      icon: 'success'
    });
  },

  onSelectSource(e) {
    const sourceId = e.currentTarget.dataset.id;
    
    // 根据不同的导入源执行不同的操作
    switch (sourceId) {
      case 'album':
        this.selectFromAlbum();
        break;
      case 'wechat':
        this.selectFromWeChat();
        break;
      case 'local':
        this.selectFromLocal();
        break;
      default:
        // 更新选中状态
        const importSources = this.data.importSources.map(source => ({
          ...source,
          active: source.id === sourceId
        }));
        
        this.setData({
          importSources
        });
    }
  },

  // 从手机相册选择素材
  selectFromAlbum() {
    wx.chooseMedia({
      count: 9,
      mediaType: ['video'],
      sourceType: ['album'],
      maxDuration: 60,
      camera: 'back',
      success: (res) => {
        console.log('从相册选择的素材:', res.tempFiles);
        wx.showToast({
          title: `选择了${res.tempFiles.length}个素材`,
          icon: 'success'
        });
        // 在实际应用中，这里会更新mediaItems列表
        // this.updateMediaList(res.tempFiles);
      },
      fail: (err) => {
        console.error('选择素材失败:', err);
        wx.showToast({
          title: '选择素材失败',
          icon: 'error'
        });
      }
    });
    
    // 更新选中状态
    const importSources = this.data.importSources.map(source => ({
      ...source,
      active: source.id === 'album'
    }));
    
    this.setData({
      importSources
    });
  },

  // 从微信聊天记录选择素材
  selectFromWeChat() {
    wx.chooseMessageFile({
      count: 10,
      type: 'video',
      extension: ['mp4', 'mov', 'avi'],
      success: (res) => {
        console.log('从微信选择的素材:', res.tempFiles);
        wx.showToast({
          title: `选择了${res.tempFiles.length}个素材`,
          icon: 'success'
        });
        // 在实际应用中，这里会更新mediaItems列表
        // this.updateMediaList(res.tempFiles);
      },
      fail: (err) => {
        console.error('选择微信素材失败:', err);
        wx.showToast({
          title: '选择微信素材失败',
          icon: 'error'
        });
      }
    });
    
    // 更新选中状态
    const importSources = this.data.importSources.map(source => ({
      ...source,
      active: source.id === 'wechat'
    }));
    
    this.setData({
      importSources
    });
  },

  // 从本地文件选择素材
  selectFromLocal() {
    wx.chooseMessageFile({
      count: 10,
      type: 'video',
      extension: ['mp4', 'mov', 'avi'],
      success: (res) => {
        console.log('从本地选择的素材:', res.tempFiles);
        wx.showToast({
          title: `选择了${res.tempFiles.length}个素材`,
          icon: 'success'
        });
        // 在实际应用中，这里会更新mediaItems列表
        // this.updateMediaList(res.tempFiles);
      },
      fail: (err) => {
        console.error('选择本地素材失败:', err);
        wx.showToast({
          title: '选择本地素材失败',
          icon: 'error'
        });
      }
    });
    
    // 更新选中状态
    const importSources = this.data.importSources.map(source => ({
      ...source,
      active: source.id === 'local'
    }));
    
    this.setData({
      importSources
    });
  },

  switchVehicle() {
    // 切换车辆
    wx.navigateTo({
      url: `../vehicleSelector/vehicleSelector?mode=selectSingle&currentVehiclePlate=${encodeURIComponent(this.data.currentVehicle.plate)}`,
      events: {
        // 为页面参数接收一个回调函数
        acceptDataFromOpenedPage: function(data) {
          console.log('从车辆选择页面返回的数据:', data);
          if (data && data.selectedVehicle) {
            this.setData({
              currentVehicle: {
                image: data.selectedVehicle.imageUrl,
                name: data.selectedVehicle.model.split(' ')[1] || '车辆',
                plate: data.selectedVehicle.plate,
                description: '将导入的素材默认归属到此车辆'
              }
            });
          }
        }.bind(this)
      }
    });
  },

  toggleSmartRecognition() {
    this.setData({
      enableSmartRecognition: !this.data.enableSmartRecognition
    });
    
    wx.showToast({
      title: this.data.enableSmartRecognition ? '已开启智能识别' : '已关闭智能识别',
      icon: 'none'
    });
  },

  removeMedia(e) {
    const mediaId = e.currentTarget.dataset.id;
    console.log('移除素材:', mediaId);
    
    // 从mediaItems中移除指定id的素材
    const updatedMediaItems = this.data.mediaItems.filter(item => item.id !== mediaId);
    
    // 计算移除素材后的总大小
    const totalSize = updatedMediaItems.reduce((total, item) => {
      return total + (item.size || 0.2); // 默认每段0.2GB
    }, 0);
    
    // 更新summary信息
    const updatedSummary = {
      count: updatedMediaItems.length,
      size: totalSize.toFixed(1) + 'GB'
    };
    
    this.setData({
      mediaItems: updatedMediaItems,
      summary: updatedSummary
    });
    
    wx.showToast({
      title: '素材已移除',
      icon: 'success'
    });
  },

  modifyOwnership(e) {
    const mediaId = e.currentTarget.dataset.id;
    console.log('修改归属:', mediaId);
    wx.showToast({
      title: '修改归属功能待实现',
      icon: 'none'
    });
  },

  markAsAlternative(e) {
    const mediaId = e.currentTarget.dataset.id;
    console.log('标记为备选:', mediaId);
    wx.showToast({
      title: '标记为备选功能待实现',
      icon: 'none'
    });
  },
  

});