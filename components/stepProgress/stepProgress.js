Component({
  properties: {
    // 步骤总数
    steps: {
      type: Number,
      value: 3
    },
    // 当前步骤索引（从0开始）
    stepIndex: {
      type: Number,
      value: 0
    },
    // 步骤状态数组，支持更细粒度的状态控制
    // 每个步骤可以是 'pending'（未开始）, 'active'（进行中）, 'completed'（已完成）
    stepStatuses: {
      type: Array,
      value: []
    },
    // 步骤标签数组
    stepLabels: {
      type: Array,
      value: []
    }
  },

  data: {
    stepArray: []
  },

  observers: {
    'steps': function(newSteps) {
      // 当步骤数变化时，重新生成数组
      let arr = [];
      for (let i = 0; i < newSteps; i++) {
        arr.push(i);
      }
      this.setData({
        stepArray: arr
      });
    },
    
    // 监听步骤状态变化
    'stepStatuses': function(newStatuses) {
      // 如果没有提供状态数组，使用默认状态
      if (!newStatuses || newStatuses.length === 0) {
        const defaultStatuses = [];
        for (let i = 0; i < this.data.steps; i++) {
          if (i === this.properties.stepIndex) {
            defaultStatuses.push('active');
          } else if (i < this.properties.stepIndex) {
            defaultStatuses.push('completed');
          } else {
            defaultStatuses.push('pending');
          }
        }
        this.setData({
          stepStatuses: defaultStatuses
        });
      }
    }
  },

  methods: {
    // 获取步骤状态
    getStepStatus(index) {
      if (this.properties.stepStatuses && this.properties.stepStatuses.length > 0) {
        return this.properties.stepStatuses[index] || 'pending';
      }
      
      // 如果没有提供状态数组，根据索引和当前步骤索引计算状态
      if (index === this.properties.stepIndex) {
        return 'active';
      } else if (index < this.properties.stepIndex) {
        return 'completed';
      } else {
        return 'pending';
      }
    },
    
    // 获取步骤标签
    getStepLabel(index) {
      if (this.properties.stepLabels && this.properties.stepLabels.length > 0) {
        return this.properties.stepLabels[index] || (index + 1).toString();
      }
      return (index + 1).toString();
    }
  }
})