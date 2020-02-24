<template>
  <div class="basicContainer">
    <video id="video" ref="video"></video>
    <Button v-if="!cameraOn" type="primary" ref="button" @click.native="operateCamera">Open camera</Button>
    <Button v-else type="error" ref="button" @click.native="operateCamera">Close camera</Button>
  </div>
</template>

<script>
import { Button } from 'view-design';
import Utils from "./utils";

export default {
  name: 'GetUserMedia',
  components: {
    Button
  },
  data () {
    return {
      page: 0,
      cameraOn: false,
    }
  },
  mounted(){
    this.$Notice.open({
      title: 'Noise',
      desc: 'Best to use headphones, there may be harsh noise.'
    });
  },
  methods: {
    async operateCamera() {
      const video = this.$refs.video;

      if(!this.cameraOn){
        const constraints = {
          audio: false,
          video: true
        };
        try {
          const stream = await navigator.mediaDevices.getUserMedia(constraints),
                videoTracks = stream.getVideoTracks();
          
          this.$Message.success({
            background: true,
            content: `Using video device: ${videoTracks[0].label}`
          });

          video.srcObject = stream;
          video.play();

          this.cameraOn = true;
        } catch (err) {
          Utils.HandleError.call(this, err);
        }
      }
      else{
        video.src = '';
        this.cameraOn = false;
      }
    }

  }
}
</script>

<style scoped>
.basicContainer{
  width: 100%;
  height: 100%;
  padding: 20px;
}
#video{
  width: 80%;
  height: 85%;
  margin: 0 10%;
  margin-bottom: 20px;
}
</style>
