<template>
  <div class="videoContainer">
    <video id="video" :src="recording" controls></video>
    <div class="selectContainer">
      <Button v-if="!capture" type="primary" @click.native="startCapturing">Start screen capture</Button>
      <Button v-else type="error" @click.native="stopCapturing">Stop screen capture</Button>
      <Button type="success" @click.native="downloadRecording" :disabled="capture">Download recording</Button>
    </div>
    <a ref="link" style="display: none;" />
  </div>
</template>

<script>
export default {
  name: 'Screen',
  data () {
    return {
      capture: false,
      recording: '',
      chunks: [],
      stream: null,
      mediaRecorder: null,
      format: 'video/webm',
    }
  },
  methods: {
    async startCapturing() {
      try {
        if (this.recording) {
          window.URL.revokeObjectURL(this.recording);
        }

        this.stream = await navigator.mediaDevices.getDisplayMedia({ 
          video: true,
          audio: true
        });
        this.stream.addEventListener('inactive', () => {
          this.$Message.warning({
            background: true,
            content: "Capture stream inactive. Stop recording!"          
          });
          this.stopCapturing();
        });

        this.mediaRecorder = new MediaRecorder(this.stream, {mimeType: this.format});
        this.mediaRecorder.addEventListener('dataavailable', event => {
          if (event.data && event.data.size > 0) {
            this.chunks.push(event.data);
          }
        });
        this.mediaRecorder.start(10);

        this.capture = true;
      } catch (err) {
        this.$Message.error({
          background: true,
          content: `Capturing error: ${err}`
        });
      }
    },
    stopCapturing(){
      if (this.mediaRecorder)
        this.mediaRecorder.stop();
      this.mediaRecorder = null;
      this.stream.getTracks().map(track => track.stop());
      this.stream = null;

      this.recording = window.URL.createObjectURL(new Blob(this.chunks, {type: this.format}));

      this.capture = false;
    },
    downloadRecording(){
      this.$refs.link.href = this.recording;
      this.$refs.link.download = 'recording.webm';
      this.$refs.link.click();
    }
  }
}
</script>

<style scoped>
.videoContainer{
  width: 100%;
  height: 100%;
  padding: 20px;
}
#video{
  width: 80%;
  height: 80%;
  margin: 10px 10%;
}
.selectContainer{
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 14px;
  color: white;
  padding: 0 20%;
  margin: 20px 0;
}
</style>
