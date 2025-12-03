Component({
  properties: {
    vehicle: {
      type: Object,
      value: {}
    },
    showAction: {
      type: Boolean,
      value: true
    }
  },

  data: {

  },

  methods: {
    onActionTap() {
      this.triggerEvent('actiontap', { id: this.data.vehicle.id });
    }
  }
})