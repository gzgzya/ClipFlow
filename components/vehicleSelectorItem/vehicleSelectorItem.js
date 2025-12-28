// components/vehicleSelectorItem/vehicleSelectorItem.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    vehicle: {
      type: Object,
      value: {}
    },
    selectSingle: {
      type: Boolean,
      value: false
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
    // 选择事件
    onSelect(e) {
      this.triggerEvent('select', { id: this.properties.vehicle.id });
    },

    // 复选框变化事件
    onCheckboxChange(e) {
      // 阻止事件冒泡
      e.stopPropagation();
      this.triggerEvent('select', { id: this.properties.vehicle.id });
    },
    
    // 单选按钮变化事件
    onRadioChange(e) {
      // 阻止事件冒泡
      e.stopPropagation();
      this.triggerEvent('select', { id: this.properties.vehicle.id });
    }
  }
})