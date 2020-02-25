<template>
  <div class="videoContainer">
    <video id="video" ref="video" :style='filterStyle' controls></video>
    <div class="selectContainer">
      <div>
        Devices :
        <Select prefix="ios-camera" style="width:200px" clearable filterable @on-change="val => {if(val){this.closeCamera();this.camera=JSON.parse(val)}}">
          <Option v-for="item in devices" :value="JSON.stringify(item)" :key="item.deviceId">{{ item.label }}</Option>
        </Select>
      </div>
      <div>
        Filter :
        <Select prefix="ios-color-filter" style="width:200px" clearable filterable @on-change="val => {if(val){this.filter=val}}">
          <Option v-for="item in Object.keys(filterList)" :value="item" :key="item">{{ item }}</Option>
        </Select>
      </div>
    </div>
    <Slider v-model="percent" show-input :tip-format="val => `Percent: ${val}%`"></Slider>
    <Tooltip max-width="200" :content="this.camera.label">
      <Button v-if="!cameraOn" type="primary" @click.native="openCamera">Open camera</Button>
      <Button v-else type="error" @click.native="closeCamera">Close camera</Button>
    </Tooltip>
  </div>
</template>

<script>
import { Button, Select, Option, Slider, Tooltip } from 'view-design';

export default {
  name: 'Video',
  components: {
    Button, Select, Option, Slider, Tooltip
  },
  data () {
    return {
      cameraOn: false,
      camera: {},
      devices: [],
      videoTrack: {},
      filter: 'Normal',
      filterList: {
        Normal: null,
        Blur: {
          max: 20,
          unit: 'px',
        },
        Grayscale: {},
        Invert: {},
        Opacity: {},
        HueRotate: {
          name: 'hue-rotate',
          unit: 'turn',
        },
        sepia: {},
      },
      percent: 100,
    }
  },
  computed: {
    filterStyle(){
      const { filter, filterList, percent } = this;
      if(filter === 'Normal')
        return 'filter: none';
      return `filter: ${filterList[filter].name || filter.toLowerCase()}(${percent * 0.01 * (filterList[filter].max || 1)}${filterList[filter].unit || ''})`;
    }
  },
  mounted(){
    navigator.mediaDevices.enumerateDevices().then(devices => {
      this.devices = devices.filter(dev => dev.kind === "videoinput")
      this.camera = this.devices[0];
    }).catch(err => {
      this.$Message.error({
        background: true,
        content: `GetUserMedia error: ${err}`
      });
    });
  },
  methods: {
    async openCamera() {
      const video = this.$refs.video;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                  deviceId: {
                    exact: this.camera.deviceId
                  }
                },
                audio: false
              });
        this.videoTrack = stream.getVideoTracks()[0];
            
        this.$Message.success({
          background: true,
          content: `Using video device: ${this.videoTrack.label}`
        });

        video.srcObject = stream;
        video.play();

        this.cameraOn = true;
      } catch (err) {
        this.$Message.error({
          background: true,
          content: `GetUserMedia error: ${err}`
        });
      }
    },
    closeCamera(){
      this.$refs.video.src = '';
      this.videoTrack.stop();
      this.cameraOn = false;
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
}
</style>
