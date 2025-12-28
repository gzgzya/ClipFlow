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
    },
    currentVehiclePlate: {
      type: String,
      value: ''
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
    // 选择事件（点击车辆内容区域）
    onSelect(e) {
      // 为了保持向后兼容，仍然触发选择事件
      this.triggerEvent('select', { id: this.properties.vehicle.id });
    },
    
    // 选择按钮点击事件
    onSelectButtonClick(e) {
      // 阻止事件冒泡，防止触发外层的onSelect
      e.stopPropagation();
      // 触发选择按钮点击事件
      this.triggerEvent('select', { id: this.properties.vehicle.id });
    }
  }
})