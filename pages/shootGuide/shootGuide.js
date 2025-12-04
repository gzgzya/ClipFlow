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
        { id: 1, title: '主驾视角 · 中控&方向盘', subtitle: '建议突出液晶仪表、中控大屏', status: STEP_STATUS.PENDING, mediaUrl: '' },
        { id: 2, title: '后排空间 & 地台', subtitle: '建议拍摄腿部空间、地台凸起情况', status: STEP_STATUS.PENDING, mediaUrl: '' },
        { id: 3, title: '细节 & 配置展示', subtitle: '方向盘、座椅、音响、氛围灯等高频关注点', status: STEP_STATUS.PENDING, mediaUrl: '' }
      ],
      3: [ // 亮点步骤
        { id: 1, title: '动力系统展示', subtitle: '发动机舱与启动声浪演示', status: STEP_STATUS.PENDING, mediaUrl: '' },
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
    currentSubStepTitle: "主驾视角",
    currentSubStepDesc: "对准中控与方向盘，缓慢平移，避免晃动。",
    
    // 片段时间信息
    currentFragmentTime: "10",
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
    
    // 录制状态
    isRecording: false,
    
    // 长按定时器
    longPressTimer: null,
    
    // 当前选中查看的媒体信息
    selectedMedia: {
      url: "",
      type: MEDIA_TYPE.IMAGE,
      shouldPlay: false // 是否应该播放
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 初始化当前步骤的子步骤
    this.initCurrentStep();
    
    // 创建相机上下文
    this.cameraContext = wx.createCameraContext();
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
        step.status = STEP_STATUS.COMPLETED;
      } else if (index === shootProgress.completedSteps) {
        step.status = STEP_STATUS.ACTIVE;
      } else {
        step.status = STEP_STATUS.PENDING;
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
    // 清理定时器
    if (this.data.longPressTimer) {
      clearTimeout(this.data.longPressTimer);
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
    }
  },

  // 点击预览区域的播放按钮
  onPlayMedia() {
    if (this.data.selectedMedia.url) {
      this.setData({
        'selectedMedia.shouldPlay': true
      });
    }
  },

  // 去拍摄事件
  onShoot(e) {
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
    
    // 显示底部相机控制栏和摄像头预览
    this.setData({
      showCameraControls: true,
      showCameraPreview: true,
      selectedMedia: {
        url: "",
        type: MEDIA_TYPE.IMAGE,
        shouldPlay: false
      }, // 清除选中的媒体
      activeSubStepId: subStepId
    });
    
    wx.showToast({
      title: '开始拍摄...',
      icon: 'none'
    });
  },

  // 跳转到下一步事件
  onNextStep() {
    const shootProgress = {...this.data.shootProgress};
    
    // 如果正在录制，不允许切换步骤
    if (this.data.isRecording) {
      wx.showToast({
        title: '请先停止当前录制',
        icon: 'none'
      });
      return;
    }
    
    // 直接跳转到下一步
    if (shootProgress.currentStep < shootProgress.totalSteps) {
      // 标记当前步骤为完成
      shootProgress.completedSteps = shootProgress.currentStep;
      shootProgress.currentStep++;
      
      this.setData({
        shootProgress,
        // 重置媒体选择状态
        selectedMedia: {
          url: "",
          type: MEDIA_TYPE.IMAGE,
          shouldPlay: false
        },
        showCameraPreview: false
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
    // 如果已经处于录制状态，不做任何操作
    if (this.data.isRecording) return;
    
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
      } else {
        // 如果正在录制，则停止录制
        this.stopRecording();
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

  // 拍照流程: takePhoto → 保存 → 更新子步骤状态 → 退出相机模式
  takePicture() {
    console.log('拍照');
    
    // 拍照
    this.cameraContext.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log('拍照成功', res);
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
        this.saveMediaAndExitCameraMode(mediaData);
      },
      fail: (err) => {
        console.error('拍照失败', err);
        wx.showToast({
          title: '拍照失败',
          icon: 'none'
        });
        
        // 退出相机模式
        this.exitCameraMode();
      }
    });
  },

  // 录制流程: startRecord → stopRecord → 保存 → 更新状态 → 退出相机模式
  startRecording() {
    this.setData({
      isRecording: true
    });
    
    wx.showToast({
      title: '开始录制视频',
      icon: 'none'
    });
    
    // 开始录制视频
    this.cameraContext.startRecord({
      success: (res) => {
        console.log('开始录制成功', res);
      },
      fail: (err) => {
        console.error('开始录制失败', err);
        wx.showToast({
          title: '录制失败',
          icon: 'none'
        });
        this.setData({
          isRecording: false
        });
        
        // 退出相机模式
        this.exitCameraMode();
      }
    });
  },

  // 停止录制
  stopRecording() {
    // 如果未在录制状态，不做任何操作
    if (!this.data.isRecording) return;
    
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
        this.saveMediaAndExitCameraMode(mediaData);
      },
      fail: (err) => {
        console.error('停止录制失败', err);
        wx.showToast({
          title: '录制失败',
          icon: 'none'
        });
        
        // 退出相机模式
        this.exitCameraMode();
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
          this.saveMediaAndPreview(mediaData);
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
        }
      }
    });
  },
  
  // 保存媒体并完成拍摄流程，然后退出相机模式
  saveMediaAndExitCameraMode(mediaData) {
    // 更新当前子步骤的媒体信息
    this.updateSubStepWithMedia(mediaData);
    
    // 退出相机模式
    this.exitCameraMode();
    
    // 检查是否所有子步骤都已完成
    this.checkAndProceedToNextStep();
  },
  
  // 保存媒体并自动进入媒体预览模式
  saveMediaAndPreview(mediaData) {
    // 更新当前子步骤的媒体信息
    this.updateSubStepWithMedia(mediaData);
    
    // 自动进入媒体预览模式
    this.setData({
      selectedMedia: mediaData,
      showCameraPreview: false,
      showCameraControls: false
    });
    
    // 检查是否所有子步骤都已完成
    this.checkAndProceedToNextStep();
  },
  
  // 更新子步骤的媒体信息
  updateSubStepWithMedia(mediaData) {
    const subStepId = this.data.activeSubStepId;
    if (subStepId) {
      const updatedSubSteps = this.data.currentStepSubSteps.map(step => {
        if (step.id === subStepId) {
          return {
            ...step,
            status: STEP_STATUS.COMPLETED,
            mediaUrl: mediaData.url,
            mediaType: mediaData.type
          };
        }
        return step;
      });
      
      this.setData({
        currentStepSubSteps: updatedSubSteps
      });
    }
  },
  
  // 退出相机模式
  exitCameraMode() {
    this.setData({
      showCameraControls: false,
      showCameraPreview: false,
      activeSubStepId: null
    });
  },
  
  // 检查并继续到下一步（如果所有子步骤已完成）
  checkAndProceedToNextStep() {
    const updatedSubSteps = this.data.currentStepSubSteps;
    const allCompleted = updatedSubSteps.every(step => step.status === STEP_STATUS.COMPLETED);
    
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
    }
  }
})