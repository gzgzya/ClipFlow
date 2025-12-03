// components/materialItem/materialItem.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    material: {
      type: Object,
      value: {
        id: '',
        image: '',
        duration: '00:00',
        type: 'exterior', // exterior, interior, highlight
        title: '素材标题',
        quality: '1080P',
        status: '已入时间线', // 已入时间线, 添加
        time: '2023-01-01 12:00'
      }
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
      this.triggerEvent('tap', { id: this.properties.material.id });
    },

    // 重拍事件
    onRetry(e) {
      e.stopPropagation();
      this.triggerEvent('retry', { id: this.properties.material.id });
    },

    // 删除事件
    onDelete(e) {
      e.stopPropagation();
      this.triggerEvent('delete', { id: this.properties.material.id });
    }
  }
})