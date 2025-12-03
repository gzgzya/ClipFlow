Component({
  properties: {
    clip: {
      type: Object,
      value: {}
    }
  },
  
  data: {

  },

  methods: {
    onTap() {
      this.triggerEvent('click', { id: this.data.clip.id });
    },

    onPublish() {
      this.triggerEvent('publish', { id: this.data.clip.id });
    },

    onCopy() {
      this.triggerEvent('copy', { id: this.data.clip.id });
    },

    onRetry() {
      this.triggerEvent('retry', { id: this.data.clip.id });
    }
  }
})