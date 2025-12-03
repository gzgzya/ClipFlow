Page({
  data: {
    useSameTemplate: true,
    autoSubtitle: true,
    uniformVoice: true,
    autoBgm: true,
    
    templates: [
      {
        id: 1,
        title: '30s 爆款竖屏',
        subtitle: '推荐 · 快速出片',
        description: '每车 1 条 · 外观+内饰+亮点',
        bgColor: 'blue',
        active: true
      },
      {
        id: 2,
        title: '60s 深度讲车',
        subtitle: '讲解更详细',
        description: '适合重点车源与老客户',
        bgColor: 'slate',
        active: false
      },
      {
        id: 3,
        title: '多车合集短视频',
        subtitle: '朋友圈/社群',
        description: '多车同屏轮播展示',
        bgColor: 'slate',
        active: false
      }
    ],
    
    vehicles: [
      {
        id: 1,
        image: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=400',
        name: '宝马 325Li',
        plate: '苏A88888',
        status: '素材充足 · 外观/内饰/亮点已完成',
        materials: 12,
        clips: 3,
        estimatedTime: '18s',
        recommendation: '推荐加入',
        actionType: 'remove'
      },
      {
        id: 2,
        image: 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=400',
        name: '奔驰 C200L',
        plate: '沪B66666',
        status: '内饰素材不足 1 段 · 可先生成外观亮点版',
        materials: 7,
        warning: '内饰不足',
        estimatedTime: '15s',
        actionText: '调整策略',
        actionType: 'adjust'
      },
      {
        id: 3,
        image: 'https://images.pexels.com/photos/3075526/pexels-photo-3075526.jpeg?auto=compress&cs=tinysrgb&w=400',
        name: '奥迪 A4L',
        plate: '浙C12345',
        status: '仅亮点素材 · 适合做"亮点合集短视频"',
        materials: 4,
        feature: '自动生成亮点短视频',
        actionText: '调整模板',
        actionType: 'template'
      }
    ],
    
    summary: {
      vehiclesCount: 3,
      clipsCount: 3,
      estimatedMinutes: 1
    }
  },

  onLoad() {
    // 页面加载时执行
  },

  onBack() {
    // 返回上一页
    console.log('返回上一页');
  },

  onHistory() {
    // 查看历史记录
    console.log('查看历史记录');
  },

  onAdvancedSettings() {
    // 高级设置
    console.log('打开高级设置');
  },

  toggleSameTemplate() {
    this.setData({
      useSameTemplate: !this.data.useSameTemplate
    });
  },

  toggleAutoSubtitle() {
    this.setData({
      autoSubtitle: !this.data.autoSubtitle
    });
  },

  toggleUniformVoice() {
    this.setData({
      uniformVoice: !this.data.uniformVoice
    });
  },

  toggleAutoBgm() {
    this.setData({
      autoBgm: !this.data.autoBgm
    });
  },

  selectTemplate(e) {
    const templateId = e.currentTarget.dataset.id;
    const templates = this.data.templates.map(template => ({
      ...template,
      active: template.id === templateId
    }));
    
    this.setData({
      templates
    });
  },

  onSelectVehicles() {
    // 从车库选择车辆
    console.log('从车库选择车辆');
  },

  onRemoveVehicle(e) {
    const vehicleId = e.currentTarget.dataset.id;
    console.log('移除车辆:', vehicleId);
  },

  onAdjustStrategy(e) {
    const vehicleId = e.currentTarget.dataset.id;
    console.log('调整策略:', vehicleId);
  },

  onChangeTemplate(e) {
    const vehicleId = e.currentTarget.dataset.id;
    console.log('更改模板:', vehicleId);
  },

  onGenerate() {
    // 立即一键成片
    console.log('立即一键成片');
  }
});