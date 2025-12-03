// components/vehicleCard/vehicleCard.js
Component({
  properties: {
    vehicle: {
      type: Object,
      value: {},
      observer: function(newVal) {
        // 当vehicle属性变化时，更新内部数据
        this.setData({
          processedVehicle: this._processVehicleData(newVal)
        });
      }
    },
    showAction: {
      type: Boolean,
      value: true
    }
  },

  data: {
    processedVehicle: {}
  },

  lifetimes: {
    attached: function() {
      // 组件实例进入页面节点树时执行
      if (this.data.vehicle) {
        this.setData({
          processedVehicle: this._processVehicleData(this.data.vehicle)
        });
      }
    }
  },

  methods: {
    _processVehicleData(vehicle) {
      // 处理车辆数据，添加样式类等
      const processed = {...vehicle};
      
      // 设置状态标签样式类
      if (vehicle.status === '在售') {
        processed.statusClass = 'for-sale';
      } else if (vehicle.status === '已售') {
        processed.statusClass = 'sold';
      } else {
        processed.statusClass = '';
      }
      
      // 设置操作按钮文本和类型
      if (vehicle.status === '在售') {
        processed.actionText = '继续拍摄';
        processed.actionType = 'continue';
      } else {
        processed.actionText = '查看记录';
        processed.actionType = 'record';
      }
      
      // 处理统计数字
      processed.materialCount = vehicle.materials || 0;
      processed.clipCount = vehicle.clips || 0;
      processed.publishCount = vehicle.published || 0;
      
      return processed;
    },

    onActionTap() {
      this.triggerEvent('actiontap', { id: this.data.vehicle.id });
    }
  }
})