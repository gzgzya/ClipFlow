Component({
  properties: {
    title: {
      type: String,
      value: ''
    },
    subtitle: {
      type: String,
      value: ''
    },
    showBack: {
      type: Boolean,
      value: false
    },
    showSettings: {
      type: Boolean,
      value: false
    },
    settingsText: {
      type: String,
      value: '设置'
    }
  },

  data: {

  },

  methods: {
    onBack() {
      this.triggerEvent('back');
    },

    onSettings() {
      this.triggerEvent('settings');
    }
  }
})