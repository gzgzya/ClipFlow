// pages/shootGuide/shootGuide.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 添加拍摄进度状态数据
    shootProgress: {
      currentStep: 1, // 当前步骤（1-外观，2-内饰，3-亮点）
      totalSteps: 3,
      completedSteps: 0,
      steps: [
        { id: 1, name: '外观', status: 'active' },
        { id: 2, name: '内饰', status: 'pending' },
        { id: 3, name: '亮点', status: 'pending' }
      ]
    },
    
    // 当前子步骤
    currentSubStep: 1,
    
    // 不同步骤的子步骤列表
    stepSubSteps: {
      1: [ // 外观步骤
        { id: 1, title: '车头 45° 远景', subtitle: '建议拍摄车头全貌，保证光线充足', status: 'pending' },
        { id: 2, title: '侧面环绕拍摄', subtitle: '展示车身线条与轮毂细节', status: 'pending' },
        { id: 3, title: '车尾特写', subtitle: '重点展示尾灯与排气设计', status: 'pending' }
      ],
      2: [ // 内饰步骤
        { id: 1, title: '主驾视角 · 中控&方向盘', subtitle: '建议突出液晶仪表、中控大屏', status: 'pending' },
        { id: 2, title: '后排空间 & 地台', subtitle: '建议拍摄腿部空间、地台凸起情况', status: 'pending' },
        { id: 3, title: '细节 & 配置展示', subtitle: '方向盘、座椅、音响、氛围灯等高频关注点', status: 'pending' }
      ],
      3: [ // 亮点步骤
        { id: 1, title: '动力系统展示', subtitle: '发动机舱与启动声浪演示', status: 'pending' },
        { id: 2, title: '科技配置演示', subtitle: '辅助驾驶与智能互联功能', status: 'pending' },
        { id: 3, title: '安全配置展示', subtitle: '主动安全与被动安全配置', status: 'pending' }
      ]
    },

    // 当前步骤的子步骤
    currentStepSubSteps: [],

    // 预览图片
    currentPreviewImage: "https://images.pexels.com/photos/3752169/pexels-photo-3752169.jpeg?auto=compress&cs=tinysrgb&w=1200",

    // 当前提示信息
    currentTip: "建议：车头 45° 远景，保证光线充足",
    currentSubStepTitle: "主驾视角",
    currentSubStepDesc: "对准中控与方向盘，缓慢平移，避免晃动。",
    
    // 片段时间信息
    currentFragmentTime: "10",
    recommendedFragmentTime: "12",
    
    // 总时长信息
    totalDuration: "00:28",
    recommendedTotalDuration: "00:35"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 初始化当前步骤的子步骤
    this.initCurrentStep();
  },

  /**
   * 初始化当前步骤
   */
  initCurrentStep() {
    const currentStep = this.data.shootProgress.currentStep;
    const subSteps = this.data.stepSubSteps[currentStep] || [];
    
    this.setData({
      currentStepSubSteps: subSteps
    });
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
    // 页面显示时更新数据
    this.updateProgress();
  },

  /**
   * 更新进度显示
   */
  updateProgress() {
    const shootProgress = {...this.data.shootProgress};
    
    // 根据已完成步骤数量更新状态
    shootProgress.steps.forEach((step, index) => {
      if (index < shootProgress.completedSteps) {
        step.status = 'completed';
      } else if (index === shootProgress.completedSteps) {
        step.status = 'active';
      } else {
        step.status = 'pending';
      }
    });
    
    this.setData({
      shootProgress
    });
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

  // 素材管理事件
  onMediaManage() {
    wx.navigateTo({
      url: '/pages/mediaManage/mediaManage'
    });
  },

  // 规范说明事件
  onStandard() {
    console.log('查看拍摄规范');
  },

  // 重拍本段事件
  onRetake() {
    console.log('重拍当前片段');
    wx.showToast({
      title: '重新拍摄当前片段',
      icon: 'none'
    });
  },

  // 去拍摄事件
  onShoot(e) {
    const subStepId = e.currentTarget.dataset.substepId;
    console.log('开始拍摄子步骤:', subStepId);
    
    // 更新当前子步骤状态
    const updatedSubSteps = this.data.currentStepSubSteps.map(step => {
      if (step.id === subStepId) {
        return {...step, status: 'completed'};
      }
      return step;
    });
    
    this.setData({
      currentStepSubSteps: updatedSubSteps
    });
    
    // 检查是否所有子步骤都已完成
    const allCompleted = updatedSubSteps.every(step => step.status === 'completed');
    
    if (allCompleted) {
      // 更新主步骤进度
      const shootProgress = {...this.data.shootProgress};
      shootProgress.completedSteps = shootProgress.currentStep;
      
      // 如果还有下一步，激活下一步
      if (shootProgress.currentStep < shootProgress.totalSteps) {
        shootProgress.currentStep++;
      }
      
      this.setData({
        shootProgress
      });
      
      // 更新当前步骤的子步骤
      this.initCurrentStep();
      
      wx.showToast({
        title: `已完成${shootProgress.steps[shootProgress.currentStep-2].name}拍摄`,
        icon: 'none'
      });
    } else {
      wx.showToast({
        title: '开始拍摄...',
        icon: 'none'
      });
    }
  },

  // 跳转到下一步事件
  onNextStep() {
    const shootProgress = {...this.data.shootProgress};
    
    // 直接跳转到下一步
    if (shootProgress.currentStep < shootProgress.totalSteps) {
      // 标记当前步骤为完成
      shootProgress.completedSteps = shootProgress.currentStep;
      shootProgress.currentStep++;
      
      this.setData({
        shootProgress
      });
      
      // 更新当前步骤的子步骤
      this.initCurrentStep();
      
      wx.showToast({
        title: `进入${shootProgress.steps[shootProgress.currentStep-1].name}拍摄`,
        icon: 'none'
      });
    }
  },

  // 旋转镜头事件
  onRotate() {
    console.log('旋转镜头');
    wx.showToast({
      title: '切换摄像头',
      icon: 'none'
    });
  },

  // 录制事件
  onRecord() {
    console.log('开始录制');
    wx.showToast({
      title: '开始录制视频',
      icon: 'none'
    });
  },

  // 拍照事件
  onCapture() {
    console.log('拍照');
    wx.showToast({
      title: '拍照',
      icon: 'none'
    });
  }
});