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
    }
  },

  methods: {

  }
})