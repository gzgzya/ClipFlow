// components/aiOption/aiOption.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    option: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击事件
    onTap(e) {
      this.triggerEvent('tap', { id: this.properties.option.id });
    },

    // 开关变化事件
    onSwitchChange(e) {
      this.triggerEvent('change', { 
        id: this.properties.option.id, 
        value: e.detail.value 
      });
    }
  }
})