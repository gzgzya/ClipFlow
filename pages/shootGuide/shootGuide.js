// pages/shootGuide/shootGuide.js

// 定义常量
const STEP_STATUS = {
  PENDING: 'pending',
  ACTIVE: 'active',
  COMPLETED: 'completed'
};

const MEDIA_TYPE = {
  IMAGE: 'image',
  VIDEO: 'video'
};

const CAMERA_POSITION = {
  FRONT: 'front',
  BACK: 'back'
};

// 防抖时间（毫秒）
const DEBOUNCE_TIME = 500;

// 滑动相关常量
const SWIPE_THRESHOLD = 50; // 滑动阈值（像素）
const SWIPE_FORBIDDEN_CLASS = 'no-swipe'; // 禁止滑动的元素类名

/**
 * 步骤管理器
 * 统一管理主步骤和子步骤的状态
 */
class StepManager {
  /**
   * 构造函数
   * @param {Page} page - 页面实例
   */
  constructor(page) {
    this.page = page;
  }
  
  /**
   * 更新进度显示
   */
  updateProgress() {
    const shootProgress = {...this.page.data.shootProgress};
    
    // 根据已完成步骤数量更新状态
    shootProgress.steps.forEach((step, index) => {
      if (index < shootProgress.completedSteps) {
        step.status = STEP_STATUS.COMPLETED;
      } else if (index === shootProgress.completedSteps) {
        step.status = STEP_STATUS.ACTIVE;
      } else {
        step.status = STEP_STATUS.PENDING;
      }
    });
    
    // 同步更新步骤状态数组
    const stepStatuses = shootProgress.steps.map(step => step.status);
    
    this.page.setData({
      shootProgress,
      stepStatuses
    });
  }
  
  /**
   * 初始化当前步骤
   */
  initCurrentStep() {
    const currentStep = this.page.data.shootProgress.currentStep;
    const subSteps = this.page.data.stepSubSteps[currentStep] || [];
    
    this.page.setData({
      currentStepSubSteps: subSteps
    });
  }
  
  /**
   * 切换到指定步骤
   * @param {number} step - 目标步骤编号
   */
  switchToStep(step) {
    // 边界检查
    if (step < 1 || step > this.page.data.shootProgress.totalSteps) {
      return;
    }
    
    const shootProgress = {...this.page.data.shootProgress};
    shootProgress.currentStep = step;
    
    this.page.setData({
      shootProgress
    });
    
    // 更新当前步骤的子步骤
    this.initCurrentStep();
    
    // 更新提示信息为当前步骤的第一个子步骤
    const currentSubSteps = this.page.data.stepSubSteps[step] || [];
    if (currentSubSteps.length > 0) {
      const firstSubStep = currentSubSteps[0];
      let newTip = "";
      let newSubStepTitle = `步骤 ${firstSubStep.id} / ${currentSubSteps.length} · ${this.page.data.shootProgress.steps[step-1].name} · ${firstSubStep.title}`;
      let newSubStepDesc = "";
      
      if (step === 1) { // 外观步骤
        switch(firstSubStep.id) {
          case 1: // 车头 45° 远景
            newTip = "建议：车头 45° 远景，保证光线充足";
            newSubStepDesc = "对准车头与前脸标志，稍微侧一点角度拍摄，\n尽量避免逆光，画面保持稳定。";
            break;
          case 2: // 侧面环绕拍摄
            newTip = "建议：沿车身侧面缓慢移动，展示整体线条";
            newSubStepDesc = "从车头向车尾缓慢平移，保持镜头高度一致，\n突出车身比例与轮毂。";
            break;
          case 3: // 车尾特写
            newTip = "建议：近距离拍摄车尾，突出尾灯与设计细节";
            newSubStepDesc = "靠近车尾拍摄，对准尾灯与品牌标识，\n画面尽量居中。";
            break;
          default:
            newTip = "建议：按要求拍摄";
            newSubStepDesc = "请按照拍摄要求进行拍摄";
        }
      } else if (step === 2) { // 内饰步骤
        switch(firstSubStep.id) {
          case 1: // 主驾视角 · 中控&方向盘
            newTip = "建议：主驾视角拍摄中控与方向盘";
            newSubStepDesc = "坐在驾驶位，对准方向盘与中控屏，\n轻微左右平移，避免快速晃动。";
            break;
          case 2: // 后排空间 & 地台
            newTip = "建议：拍摄后排腿部空间与地台高度";
            newSubStepDesc = "镜头放在后排中间位置，对准座椅与腿部空间，\n展示真实乘坐感受。";
            break;
          case 3: // 细节 & 配置展示
            newTip = "建议：拍摄常用配置与细节设计";
            newSubStepDesc = "选择方向盘、座椅、音响或氛围灯，\n逐个特写拍摄，每个画面保持 2–3 秒。";
            break;
          default:
            newTip = "建议：按要求拍摄";
            newSubStepDesc = "请按照拍摄要求进行拍摄";
        }
      } else if (step === 3) { // 亮点步骤
        switch(firstSubStep.id) {
          case 1: // 动力系统展示
            newTip = "建议：展示发动机舱或启动过程";
            newSubStepDesc = "打开发动机舱或拍摄启动车辆过程，\n镜头保持固定，记录真实声音与细节。";
            break;
          case 2: // 科技配置演示
            newTip = "建议：演示科技配置功能";
            newSubStepDesc = "展示辅助驾驶与智能互联功能，\n确保功能正常运行并记录操作过程。";
            break;
          case 3: // 安全配置展示
            newTip = "建议：展示安全配置或相关功能";
            newSubStepDesc = "拍摄安全气囊标识、雷达、摄像头等，\n画面清晰即可，无需复杂运镜。";
            break;
          default:
            newTip = "建议：按要求拍摄";
            newSubStepDesc = "请按照拍摄要求进行拍摄";
        }
      }
      
      this.page.setData({
        currentTip: newTip,
        currentSubStepTitle: newSubStepTitle,
        currentSubStepDesc: newSubStepDesc
      });
    }
  }
  
  /**
   * 检查并继续到下一步（如果所有子步骤已完成）
   * @param {Array} updatedSubSteps - 更新后的子步骤数组
   */
  checkAndProceedToNextStep(updatedSubSteps) {
    // 检查是否所有子步骤都已完成
    const allCompleted = updatedSubSteps.every(step => step.status === STEP_STATUS.COMPLETED);
    
    if (allCompleted) {
      // 更新主步骤进度
      const shootProgress = {...this.page.data.shootProgress};
      shootProgress.completedSteps = shootProgress.currentStep - 1;
      
      // 如果还有下一步，激活下一步
      if (shootProgress.currentStep < shootProgress.totalSteps) {
        shootProgress.currentStep++;
      }
      
      this.page.setData({
        shootProgress
      });
      
      // 更新当前步骤的子步骤
      this.initCurrentStep();
      
      wx.showToast({
        title: `已完成${shootProgress.steps[shootProgress.currentStep-2].name}拍摄`,
        icon: 'none'
      });
      
      // 检查是否所有步骤都已完成，如果是则跳转到下一个流程
      if (shootProgress.completedSteps >= shootProgress.totalSteps) {
        // 所有步骤完成，自动跳转到下一个流程
        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/editPreview/editPreview'
          });
        }, 1500);
      }
    }
  }
}

// 创建步骤管理器实例
let stepManager = null;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 拍摄进度状态数据
    shootProgress: {
      currentStep: 1, // 当前主步骤（1-外观，2-内饰，3-亮点）
      totalSteps: 3,
      completedSteps: 0,
      steps: [
        { id: 1, name: '外观', status: STEP_STATUS.ACTIVE },
        { id: 2, name: '内饰', status: STEP_STATUS.PENDING },
        { id: 3, name: '亮点', status: STEP_STATUS.PENDING }
      ]
    },
    
    // 步骤状态数组（用于传递给 stepProgress 组件）
    stepStatuses: ['active', 'pending', 'pending'],
    stepLabels: ['外观', '内饰', '亮点'],
    
    // 当前子步骤
    currentSubStep: 1,
    
    // 不同步骤的子步骤列表
    stepSubSteps: {
      1: [ // 外观步骤
        { id: 1, title: '车头 45° 远景', subtitle: '建议拍摄车头全貌，保证光线充足', status: STEP_STATUS.PENDING, mediaUrl: '' },
        { id: 2, title: '侧面环绕拍摄', subtitle: '展示车身线条与轮毂细节', status: STEP_STATUS.PENDING, mediaUrl: '' },
        { id: 3, title: '车尾特写', subtitle: '重点展示尾灯与排气设计', status: STEP_STATUS.PENDING, mediaUrl: '' }
      ],
      2: [ // 内饰步骤
        { id: 1, title: '主驾视角 · 中控&方向盘', subtitle: '建议拍摄中控与方向盘', status: STEP_STATUS.PENDING, mediaUrl: '' },
        { id: 2, title: '后排空间 & 地台', subtitle: '建议拍摄腿部空间、地台凸起情况', status: STEP_STATUS.PENDING, mediaUrl: '' },
        { id: 3, title: '细节 & 配置展示', subtitle: '方向盘、座椅、音响、氛围灯等高频关注点', status: STEP_STATUS.PENDING, mediaUrl: '' }
      ],
      3: [ // 亮点步骤
        { id: 1, title: '动力系统展示', subtitle: '发动机舱或启动过程演示', status: STEP_STATUS.PENDING, mediaUrl: '' },
        { id: 2, title: '科技配置演示', subtitle: '辅助驾驶与智能互联功能', status: STEP_STATUS.PENDING, mediaUrl: '' },
        { id: 3, title: '安全配置展示', subtitle: '主动安全与被动安全配置', status: STEP_STATUS.PENDING, mediaUrl: '' }
      ]
    },

    // 当前步骤的子步骤
    currentStepSubSteps: [],

    // 预览图片
    currentPreviewImage: "https://images.pexels.com/photos/3752169/pexels-photo-3752169.jpeg?auto=compress&cs=tinysrgb&w=1200",

    // 当前提示信息
    currentTip: "建议：车头 45° 远景，保证光线充足",
    currentSubStepTitle: "步骤 1 / 3 · 外观 · 车头",
    currentSubStepDesc: "对准车头与前脸标志，稍微侧一点角度拍摄，\n尽量避免逆光，画面保持稳定。",
    
    // 片段时间信息
    currentFragmentTime: "0",
    recommendedFragmentTime: "12",
    
    // 总时长信息
    totalDuration: "00:28",
    recommendedTotalDuration: "00:35",
    
    // 控制栏显示状态
    showCameraControls: false,
    
    // 当前正在拍摄的子步骤ID
    activeSubStepId: null,
    
    // 是否显示摄像头预览
    showCameraPreview: false,
    
    // 摄像头位置（前置/后置）
    cameraPosition: CAMERA_POSITION.BACK,
    
    // 拍摄模式
    mode: 'photo', // 'photo' | 'video'
    
    // 录制状态
    isRecording: false,
    
    // 录制时长
    recordingDuration: 0,
    maxRecordingDuration: 15, // 最大录制时长15秒
    recordingTimer: null,
    
    // 长按定时器
    longPressTimer: null,
    
    // 当前选中查看的媒体信息
    selectedMedia: {
      url: "",
      type: MEDIA_TYPE.IMAGE,
      shouldPlay: false // 是否应该播放
    },
    
    // 防抖相关
    lastClickTime: 0,  // 上次点击时间
    
    // 滑动相关数据
    touchStartX: 0,
    touchStartY: 0,
    isSwiping: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 创建步骤管理器实例
    stepManager = new StepManager(this);
    
    // 初始化当前步骤的子步骤
    stepManager.initCurrentStep();
    
    // 在页面加载时检查相机权限
    this.checkCameraPermission();
  },
  
  // 检查相机权限
  checkCameraPermission() {
    // 创建相机上下文
    this.cameraContext = wx.createCameraContext();
    
    // 尝试触发相机授权
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.camera']) {
          // 如果没有相机权限，请求授权
          wx.authorize({
            scope: 'scope.camera',
            success: () => {
              console.log('相机权限授权成功');
            },
            fail: () => {
              console.log('用户拒绝了相机权限');
              wx.showModal({
                title: '提示',
                content: '需要相机权限才能进行拍摄，请在设置中开启相机权限',
                showCancel: false
              });
            }
          });
        }
      },
      fail: () => {
        console.error('获取设置失败');
      }
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
    stepManager.updateProgress();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    // 页面隐藏时如果正在录制，则停止录制
    if (this.data.isRecording) {
      this.stopRecording();
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    // 清理定时器
    if (this.data.longPressTimer) {
      clearTimeout(this.data.longPressTimer);
    }
    
    // 清理录制定时器
    if (this.data.recordingTimer) {
      clearInterval(this.data.recordingTimer);
    }
    
    // 确保录制被正确停止
    if (this.data.isRecording) {
      this.stopRecording();
    }
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
    // 如果正在录制，提示用户并确认是否返回
    if (this.data.isRecording) {
      wx.showModal({
        title: '提示',
        content: '正在录制中，确定要返回吗？',
        confirmText: '确定返回',
        cancelText: '继续录制',
        success: (res) => {
          if (res.confirm) {
            this.stopRecording();
            wx.navigateBack();
          }
        }
      });
    } else {
      wx.navigateBack();
    }
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
    
    // 重置媒体选择状态
    this.setData({
      selectedMedia: {
        url: "",
        type: MEDIA_TYPE.IMAGE,
        shouldPlay: false
      },
      showCameraPreview: true
    });
  },

  // 查看已完成的媒体内容（点击step-info区域）
  onSelectMedia(e) {
    const subStepId = e.currentTarget.dataset.substepId;
    const subStep = this.data.currentStepSubSteps.find(item => item.id === subStepId);
    
    if (subStep && subStep.status === STEP_STATUS.COMPLETED && subStep.mediaUrl) {
      // 自动进入媒体预览模式
      this.setData({
        selectedMedia: {
          url: subStep.mediaUrl,
          type: subStep.mediaType || MEDIA_TYPE.IMAGE,
          shouldPlay: false // 默认不播放，需要点击播放按钮
        },
        showCameraPreview: false, // 确保不显示摄像头预览
        showCameraControls: false // 隐藏相机控制栏
      });
      
      wx.showToast({
        title: '已选中媒体内容，请点击播放按钮',
        icon: 'none'
      });
    } else if (subStep) {
      // 如果是未完成的步骤，更新提示信息
      const currentStep = this.data.shootProgress.currentStep;
      let newTip = "";
      let newSubStepTitle = `步骤 ${subStepId} / ${this.data.currentStepSubSteps.length} · ${this.data.shootProgress.steps[currentStep-1].name} · ${subStep.title}`;
      let newSubStepDesc = "";
      
      if (currentStep === 1) { // 外观步骤
        switch(subStepId) {
          case 1: // 车头 45° 远景
            newTip = "建议：车头 45° 远景，保证光线充足";
            newSubStepDesc = "对准车头与前脸标志，稍微侧一点角度拍摄，\n尽量避免逆光，画面保持稳定。";
            break;
          case 2: // 侧面环绕拍摄
            newTip = "建议：沿车身侧面缓慢移动，展示整体线条";
            newSubStepDesc = "从车头向车尾缓慢平移，保持镜头高度一致，\n突出车身比例与轮毂。";
            break;
          case 3: // 车尾特写
            newTip = "建议：近距离拍摄车尾，突出尾灯与设计细节";
            newSubStepDesc = "靠近车尾拍摄，对准尾灯与品牌标识，\n画面尽量居中。";
            break;
          default:
            newTip = "建议：按要求拍摄";
            newSubStepDesc = "请按照拍摄要求进行拍摄";
        }
      } else if (currentStep === 2) { // 内饰步骤
        switch(subStepId) {
          case 1: // 主驾视角 · 中控&方向盘
            newTip = "建议：主驾视角拍摄中控与方向盘";
            newSubStepDesc = "坐在驾驶位，对准方向盘与中控屏，\n轻微左右平移，避免快速晃动。";
            break;
          case 2: // 后排空间 & 地台
            newTip = "建议：拍摄后排腿部空间与地台高度";
            newSubStepDesc = "镜头放在后排中间位置，对准座椅与腿部空间，\n展示真实乘坐感受。";
            break;
          case 3: // 细节 & 配置展示
            newTip = "建议：拍摄常用配置与细节设计";
            newSubStepDesc = "选择方向盘、座椅、音响或氛围灯，\n逐个特写拍摄，每个画面保持 2–3 秒。";
            break;
          default:
            newTip = "建议：按要求拍摄";
            newSubStepDesc = "请按照拍摄要求进行拍摄";
        }
      } else if (currentStep === 3) { // 亮点步骤
        switch(subStepId) {
          case 1: // 动力系统展示
            newTip = "建议：展示发动机舱或启动过程";
            newSubStepDesc = "打开发动机舱或拍摄启动车辆过程，\n镜头保持固定，记录真实声音与细节。";
            break;
          case 2: // 科技配置演示
            newTip = "建议：演示科技配置功能";
            newSubStepDesc = "展示辅助驾驶与智能互联功能，\n确保功能正常运行并记录操作过程。";
            break;
          case 3: // 安全配置展示
            newTip = "建议：展示安全配置或相关功能";
            newSubStepDesc = "拍摄安全气囊标识、雷达、摄像头等，\n画面清晰即可，无需复杂运镜。";
            break;
          default:
            newTip = "建议：按要求拍摄";
            newSubStepDesc = "请按照拍摄要求进行拍摄";
        }
      }
      
      this.setData({
        currentTip: newTip,
        currentSubStepTitle: newSubStepTitle,
        currentSubStepDesc: newSubStepDesc
      });
    }
  },

  // 点击预览区域的播放按钮
  onPlayMedia() {
    if (this.data.selectedMedia.url) {
      // 确保视频文件路径正确
      const url = this.data.selectedMedia.url;
      this.setData({
        'selectedMedia.shouldPlay': true
      });
      
      // 延迟一点时间确保UI更新后再播放
      setTimeout(() => {
        if (this.data.selectedMedia.type === 'video' && this.data.selectedMedia.shouldPlay) {
          console.log('播放视频:', url);
        }
      }, 100);
    }
  },
  
  // 视频播放事件
  onVideoPlay(e) {
    console.log('视频开始播放', e);
  },
  
  // 视频错误事件
  onVideoError(e) {
    console.error('视频播放错误', e);
    wx.showToast({
      title: '视频加载失败',
      icon: 'none'
    });
  },
  
  // 相机错误事件
  onCameraError(e) {
    console.error('相机初始化错误', e);
    wx.showToast({
      title: '相机初始化失败',
      icon: 'none'
    });
    
    // 退出相机模式，避免页面卡死
    this.exitCameraMode();
  },

  /**
   * 去拍摄事件
   * @param {Object} e - 事件对象
   */
  onShoot(e) {
    // 防抖处理
    const currentTime = Date.now();
    if (currentTime - this.data.lastClickTime < DEBOUNCE_TIME) {
      console.log('操作过于频繁，已阻止');
      return;
    }
    
    const subStepId = e.currentTarget.dataset.substepId;
    console.log('开始拍摄子步骤:', subStepId);
    
    // 如果正在录制，不允许切换步骤
    if (this.data.isRecording) {
      wx.showToast({
        title: '请先停止当前录制',
        icon: 'none'
      });
      return;
    }
    
    // 获取当前步骤和子步骤信息
    const currentStep = this.data.shootProgress.currentStep;
    const currentSubSteps = this.data.stepSubSteps[currentStep] || [];
    const currentSubStep = currentSubSteps.find(step => step.id === subStepId);
    
    // 根据子步骤更新提示信息
    let newTip = "";
    let newSubStepTitle = `步骤 ${subStepId} / ${currentSubSteps.length} · ${this.data.shootProgress.steps[currentStep-1].name} · ${currentSubStep ? currentSubStep.title : '' }`;
    let newSubStepDesc = "";
    
    if (currentStep === 1) { // 外观步骤
      switch(subStepId) {
        case 1: // 车头 45° 远景
          newTip = "建议：车头 45° 远景，保证光线充足";
          newSubStepDesc = "对准车头与前脸标志，稍微侧一点角度拍摄，\n尽量避免逆光，画面保持稳定。";
          break;
        case 2: // 侧面环绕拍摄
          newTip = "建议：沿车身侧面缓慢移动，展示整体线条";
          newSubStepDesc = "从车头向车尾缓慢平移，保持镜头高度一致，\n突出车身比例与轮毂。";
          break;
        case 3: // 车尾特写
          newTip = "建议：近距离拍摄车尾，突出尾灯与设计细节";
          newSubStepDesc = "靠近车尾拍摄，对准尾灯与品牌标识，画面尽量居中。";
          break;
        default:
          newTip = "建议：按要求拍摄";
          newSubStepDesc = "请按照拍摄要求进行拍摄";
      }
    } else if (currentStep === 2) { // 内饰步骤
      switch(subStepId) {
        case 1: // 主驾视角 · 中控&方向盘
          newTip = "建议：主驾视角拍摄中控与方向盘";
          newSubStepDesc = "坐在驾驶位，对准方向盘与中控屏，\n轻微左右平移，避免快速晃动。";
          break;
        case 2: // 后排空间 & 地台
          newTip = "建议：拍摄后排腿部空间与地台高度";
          newSubStepDesc = "镜头放在后排中间位置，对准座椅与腿部空间，\n展示真实乘坐感受。";
          break;
        case 3: // 细节 & 配置展示
          newTip = "建议：拍摄常用配置与细节设计";
          newSubStepDesc = "选择方向盘、座椅、音响或氛围灯，\n逐个特写拍摄，每个画面保持 2–3 秒。";
          break;
        default:
          newTip = "建议：按要求拍摄";
          newSubStepDesc = "请按照拍摄要求进行拍摄";
      }
    } else if (currentStep === 2) { // 内饰步骤
      switch(subStepId) {
        case 1: // 主驾视角 · 中控&方向盘
          newTip = "建议：主驾视角拍摄中控与方向盘";
          newSubStepDesc = "坐在驾驶位，对准方向盘与中控屏，\n轻微左右平移，避免快速晃动。";
          break;
        case 2: // 后排空间 & 地台
          newTip = "建议：拍摄后排腿部空间与地台高度";
          newSubStepDesc = "镜头放在后排中间位置，对准座椅与腿部空间，\n展示真实乘坐感受。";
          break;
        case 3: // 细节 & 配置展示
          newTip = "建议：拍摄常用配置与细节设计";
          newSubStepDesc = "选择方向盘、座椅、音响或氛围灯，\n逐个特写拍摄，每个画面保持 2–3 秒。";
          break;
        default:
          newTip = "建议：按要求拍摄";
          newSubStepDesc = "请按照拍摄要求进行拍摄";
      }
    } else if (currentStep === 3) { // 亮点步骤
      switch(subStepId) {
        case 1: // 动力系统展示
          newTip = "建议：展示发动机舱或启动过程";
          newSubStepDesc = "打开发动机舱或拍摄启动车辆过程，\n镜头保持固定，记录真实声音与细节。";
          break;
        case 2: // 科技配置演示
          newTip = "建议：演示科技配置功能";
          newSubStepDesc = "展示辅助驾驶与智能互联功能，\n确保功能正常运行并记录操作过程。";
          break;
        case 3: // 安全配置展示
          newTip = "建议：展示安全配置或相关功能";
          newSubStepDesc = "拍摄安全气囊标识、雷达、摄像头等，\n画面清晰即可，无需复杂运镜。";
          break;
        default:
          newTip = "建议：按要求拍摄";
          newSubStepDesc = "请按照拍摄要求进行拍摄";
      }
    } else {
      newTip = this.data.currentTip;
      newSubStepDesc = this.data.currentSubStepDesc;
    }
    
    // 显示底部相机控制栏和摄像头预览
    this.setData({
      showCameraControls: true,
      showCameraPreview: true,
      selectedMedia: {
        url: "",
        type: MEDIA_TYPE.IMAGE,
        shouldPlay: false
      }, // 清除选中的媒体
      activeSubStepId: subStepId,
      currentTip: newTip,
      currentSubStepTitle: newSubStepTitle,
      currentSubStepDesc: newSubStepDesc,
      mode: 'video', // 进入拍摄模式后切换到录像模式
      lastClickTime: currentTime  // 更新上次点击时间
    });
    
    wx.showToast({
      title: '开始拍摄...',
      icon: 'none'
    });
  },

  // 旋转镜头事件
  onRotate() {
    // 如果正在录制，不允许切换摄像头
    if (this.data.isRecording) {
      wx.showToast({
        title: '录制中无法切换摄像头',
        icon: 'none'
      });
      return;
    }
    
    const newPosition = this.data.cameraPosition === CAMERA_POSITION.FRONT ? CAMERA_POSITION.BACK : CAMERA_POSITION.FRONT;
    this.setData({
      cameraPosition: newPosition
    });
    
    wx.showToast({
      title: newPosition === CAMERA_POSITION.FRONT ? '前置摄像头' : '后置摄像头',
      icon: 'none'
    });
  },

  // 录制按钮触摸开始 - 支持长按录制
  onRecordTouchStart() {
    // 如果已经处于录制状态，停止录制
    if (this.data.isRecording) {
      this.stopRecording();
      return;
    }
    
    const timer = setTimeout(() => {
      // 长按触发录制
      this.startRecording();
    }, 500); // 500ms长按判定
    
    this.setData({
      longPressTimer: timer
    });
  },

  // 录制按钮触摸结束
  onRecordTouchEnd() {
    // 清除长按定时器
    if (this.data.longPressTimer) {
      clearTimeout(this.data.longPressTimer);
      this.setData({
        longPressTimer: null
      });
      
      // 如果没有开始录制，则执行拍照
      if (!this.data.isRecording) {
        this.takePicture();
      }
    }
  },

  // 录制按钮长按取消
  onRecordTouchCancel() {
    // 清除长按定时器
    if (this.data.longPressTimer) {
      clearTimeout(this.data.longPressTimer);
      this.setData({
        longPressTimer: null
      });
      
      // 如果已经开始录制，则停止录制
      if (this.data.isRecording) {
        this.stopRecording();
      }
    }
  },

  // 开始录制计时器
  startRecordingTimer() {
    // 清理旧的定时器
    if (this.data.recordingTimer) {
      clearInterval(this.data.recordingTimer);
    }
    
    // 创建新的定时器
    const timer = setInterval(() => {
      let newDuration = this.data.recordingDuration + 1;
      
      this.setData({
        recordingDuration: newDuration
      });
      
      // 检查是否达到最大录制时长
      if (newDuration >= this.data.maxRecordingDuration) {
        wx.showToast({
          title: '已达到最大录制时长',
          icon: 'none'
        });
        
        // 自动停止录制
        this.stopRecording();
      }
    }, 1000); // 每秒更新一次
    
    // 保存定时器ID到data中
    this.setData({
      recordingTimer: timer
    });
  },
  
  // 拍照功能
  takePicture() {
    console.log('拍照');
    
    // 拍照
    this.cameraContext.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log('拍照成功', res);
        
        // 触发震动反馈
        wx.vibrateShort({
          type: 'light',
          success: () => {
            console.log('拍照震动反馈成功');
          },
          fail: (err) => {
            console.warn('震动反馈失败:', err);
          }
        });
        
        wx.showToast({
          title: '拍照完成',
          icon: 'success'
        });
        
        // 统一媒体数据结构
        const mediaData = {
          url: res.tempImagePath,
          type: MEDIA_TYPE.IMAGE,
          shouldPlay: false
        };
        
        // 保存媒体并完成拍摄流程
        this.saveMediaAndProcess(mediaData);
      },
      fail: (err) => {
        console.error('拍照失败', err);
        wx.showToast({
          title: '拍照失败',
          icon: 'none'
        });
        
        // 错误恢复处理
        this.handleErrorRecovery();
      }
    });
  },

  // 录制流程: startRecord → stopRecord → 保存 → 更新状态 → 退出相机模式
  startRecording() {
    // 防止重复开始录制
    if (this.data.isRecording) return;
    
    this.setData({
      isRecording: true,
      recordingDuration: 0
    });
    
    // 触发短震动反馈
    wx.vibrateShort({
      type: 'light',
      success: () => {
        console.log('震动反馈成功');
      },
      fail: (err) => {
        console.warn('震动反馈失败:', err);
      }
    });
    
    wx.showToast({
      title: '开始录制视频',
      icon: 'none'
    });
    
    // 开始录制视频
    this.cameraContext.startRecord({
      success: (res) => {
        console.log('开始录制成功', res);
        
        // 开始计时器更新录制时长
        this.startRecordingTimer();
      },
      fail: (err) => {
        console.error('开始录制失败', err);
        wx.showToast({
          title: '录制失败',
          icon: 'none'
        });
        
        // 重置录制状态
        this.setData({
          isRecording: false,
          recordingDuration: 0
        });
        
        // 错误恢复处理
        this.handleErrorRecovery();
      }
    });
  },

  // 停止录制
  stopRecording() {
    // 如果未在录制状态，不做任何操作
    if (!this.data.isRecording) return;
    
    // 清理录制定时器
    if (this.data.recordingTimer) {
      clearInterval(this.data.recordingTimer);
      this.setData({
        recordingTimer: null
      });
    }
    
    this.setData({
      isRecording: false
    });
    
    // 停止录制并保存视频
    this.cameraContext.stopRecord({
      success: (res) => {
        console.log('录制成功', res);
        wx.showToast({
          title: '录制完成',
          icon: 'success'
        });
        
        // 统一媒体数据结构
        const mediaData = {
          url: res.tempVideoPath,
          type: MEDIA_TYPE.VIDEO,
          shouldPlay: false
        };
        
        // 保存媒体并完成拍摄流程
        this.saveMediaAndProcess(mediaData);
      },
      fail: (err) => {
        console.error('停止录制失败', err);
        wx.showToast({
          title: '录制失败',
          icon: 'none'
        });
        
        // 错误恢复处理
        this.handleErrorRecovery();
      }
    });
  },

  // 相册选择流程: wx.chooseMedia → 保存 → 更新状态 → 自动进入媒体预览模式
  onOpenAlbum() {
    // 如果正在录制，不允许打开相册
    if (this.data.isRecording) {
      wx.showToast({
        title: '录制中无法打开相册',
        icon: 'none'
      });
      return;
    }
    
    console.log('打开相册');
    
    // 调用系统相册选择图片或视频
    wx.chooseMedia({
      count: 9, // 最多选择9个文件
      mediaType: [MEDIA_TYPE.IMAGE, MEDIA_TYPE.VIDEO], // 可选择图片和视频
      sourceType: ['album'], // 从相册选择
      maxDuration: 30, // 视频最大时长30秒
      camera: CAMERA_POSITION.BACK, // 使用后置摄像头
      success: (res) => {
        console.log('选择媒体成功', res);
        wx.showToast({
          title: '已选择媒体文件',
          icon: 'success'
        });
        
        // 获取第一个选择的媒体文件
        if (res.tempFiles && res.tempFiles.length > 0) {
          const mediaFile = res.tempFiles[0];
          const mediaType = res.type === MEDIA_TYPE.IMAGE ? MEDIA_TYPE.IMAGE : MEDIA_TYPE.VIDEO;
          
          // 统一媒体数据结构
          const mediaData = {
            url: mediaFile.tempFilePath,
            type: mediaType,
            shouldPlay: false
          };
          
          // 保存媒体并自动进入媒体预览模式
          this.saveMediaAndProcess(mediaData, true);
        }
      },
      fail: (err) => {
        console.error('选择媒体失败', err);
        // 用户取消选择不算错误
        if (err.errMsg && !err.errMsg.includes('cancel')) {
          wx.showToast({
            title: '选择媒体失败',
            icon: 'none'
          });
          
          // 错误恢复处理
          this.handleErrorRecovery();
        }
      }
    });
  },
  
  // 保存媒体并处理后续流程
  saveMediaAndProcess(mediaData, previewMode = false) {
    // 更新当前子步骤的媒体信息
    this.updateSubStepWithMedia(mediaData);
    
    // 根据模式决定是否预览
    if (previewMode) {
      // 自动进入媒体预览模式
      this.setData({
        selectedMedia: mediaData,
        showCameraPreview: false,
        showCameraControls: false
      });
    } else {
      // 退出相机模式
      this.exitCameraMode();
    }
    
    // 检查是否所有子步骤都已完成
    this.checkAndProceedToNextStep();
  },
  
  /**
   * 更新子步骤的媒体信息
   * @param {Object} mediaData - 媒体数据对象
   * @param {string} mediaData.url - 媒体文件路径
   * @param {string} mediaData.type - 媒体类型(image/video)
   * @param {boolean} mediaData.shouldPlay - 是否应该播放
   */
  updateSubStepWithMedia(mediaData) {
    const subStepId = this.data.activeSubStepId;
    if (subStepId) {
      // 更新指定子步骤的状态和媒体信息
      const updatedSubSteps = this.data.currentStepSubSteps.map(step => {
        if (step.id === subStepId) {
          return {
            ...step,
            status: STEP_STATUS.COMPLETED,  // 标记为已完成
            mediaUrl: mediaData.url,       // 保存媒体URL
            mediaType: mediaData.type      // 保存媒体类型
          };
        }
        return step;
      });
      
      // 更新页面数据
      this.setData({
        currentStepSubSteps: updatedSubSteps
      });
    }
  },
  
  /**
   * 退出相机模式
   * 隐藏相机预览和控制栏，重置活动子步骤ID
   */
  exitCameraMode() {
    // 如果正在录制，先停止录制
    if (this.data.isRecording) {
      this.stopRecording();
    }
    
    this.setData({
      showCameraControls: false,     // 隐藏相机控制栏
      showCameraPreview: false,      // 隐藏相机预览
      activeSubStepId: null,         // 重置活动子步骤ID
      mode: 'photo'                  // 重置为拍照模式
    });
  },
  
  /**
   * 错误恢复处理
   * 在发生错误时重置相关状态，恢复UI
   */
  handleErrorRecovery() {
    // 清理录制定时器
    if (this.data.recordingTimer) {
      clearInterval(this.data.recordingTimer);
      this.setData({
        recordingTimer: null,
        recordingDuration: 0
      });
    }
    
    // 重置录制状态
    this.setData({
      isRecording: false,
      recordingDuration: 0,
      showCameraControls: false,
      showCameraPreview: false,
      activeSubStepId: null
    });
    
    wx.showToast({
      title: '操作失败，请重试',
      icon: 'none'
    });
  },
  
  /**
   * 检查并继续到下一步（如果所有子步骤已完成）
   * 当所有子步骤都完成后，自动进入下一个主步骤
   */
  checkAndProceedToNextStep() {
    const updatedSubSteps = this.data.currentStepSubSteps;
    // 检查是否所有子步骤都已完成
    stepManager.checkAndProceedToNextStep(updatedSubSteps);
  },
  
  /**
   * 触摸开始事件 - 记录起始位置
   */
  onTouchStart(e) {
    const touch = e.touches[0];
    this.setData({
      touchStartX: touch.clientX,
      touchStartY: touch.clientY,
      isSwiping: false
    });
  },
  
  /**
   * 触摸移动事件 - 判断是否为滑动操作
   */
  onTouchMove(e) {
    // 如果已经在滑动中，不再处理
    if (this.data.isSwiping) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - this.data.touchStartX;
    const deltaY = touch.clientY - this.data.touchStartY;
    
    // 判断是否为水平滑动（水平位移大于垂直位移且超过阈值）
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
      this.setData({
        isSwiping: true
      });
    }
  },
  
  /**
   * 触摸结束事件 - 处理滑动切换
   */
  onTouchEnd(e) {
    // 如果不是滑动操作，不处理
    if (!this.data.isSwiping) return;
    
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - this.data.touchStartX;
    
    // 滑动距离需要超过阈值才触发切换
    if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
      const currentStep = this.data.shootProgress.currentStep;
      
      // 向左滑动（deltaX为负）切换到下一步
      if (deltaX < 0 && currentStep < this.data.shootProgress.totalSteps) {
        stepManager.switchToStep(currentStep + 1);
        wx.showToast({
          title: `切换到${this.data.shootProgress.steps[currentStep].name}`,
          icon: 'none'
        });
      } 
      // 向右滑动（deltaX为正）切换到上一步
      else if (deltaX > 0 && currentStep > 1) {
        stepManager.switchToStep(currentStep - 1);
        wx.showToast({
          title: `切换到${this.data.shootProgress.steps[currentStep-2].name}`,
          icon: 'none'
        });
      }
    }
    
    // 重置滑动状态
    this.setData({
      isSwiping: false
    });
  }
})