// components/templateItem/templateItem.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    template: {
      type: Object,
      value: {}
    },
    active: {
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
    // 点击事件
    onTap(e) {
      this.triggerEvent('tap', { id: this.properties.template.id });
    }
  }
})