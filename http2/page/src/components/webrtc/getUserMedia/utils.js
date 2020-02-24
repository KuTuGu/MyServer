export default {
  HandleError(error, constraints) {
    if (error.name === 'ConstraintNotSatisfiedError') {
      const v = constraints.video;
      this.$Message.error({
        background: true,
        content: `The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`
      });
    } else if (error.name === 'PermissionDeniedError') {
      this.$Message.error({
        background: true,
        content: 'Permissions have not been granted to use your camera and ' +
        'microphone, you need to allow the page access to your devices in ' +
        'order for the demo to work.'
      });
    }
    this.$Message.error({
      background: true,
      content: `getUserMedia error: ${error}`
    });
  }
}