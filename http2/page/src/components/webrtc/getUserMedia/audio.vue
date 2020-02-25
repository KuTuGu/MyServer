<template>
  <div class="audioContainer">
    <div class="selectContainer progressContainer">
      Instant: <Progress status="active" :stroke-width="14" :percent="instantMeter" hide-info :stroke-color="['#4e54c8', '#8f94fb']" />
    </div>
    <div class="selectContainer progressContainer">
      Slow: <Progress status="active" :stroke-width="14" :percent="slowMeter" hide-info :stroke-color="['#108ee9', '#87d068']" />
    </div>
    <div class="selectContainer progressContainer">
      Clip: <Progress status="active" :stroke-width="14" :percent="clipMeter" hide-info :stroke-color="['#f83600', '#f9d423']" />
    </div>
    <div class="selectContainer">
      <div>
        InputDevices :
        <Select prefix="ios-microphone" style="width:200px" clearable filterable @on-change="val => {if(val){this.inputAudio=JSON.parse(val);this.openAudio();}}">
          <Option v-for="item in inputDevices" :value="JSON.stringify(item)" :key="item.deviceId">{{ item.label }}</Option>
        </Select>
      </div>
      <div>
        OutputDevices :
        <Select prefix="ios-headset" style="width:200px" clearable filterable @on-change="val => {if(val){this.outputAudio=JSON.parse(val);changeOutputAudio();}}">
          <Option v-for="item in outputDevices" :value="JSON.stringify(item)" :key="item.deviceId">{{ item.label }}</Option>
        </Select>
      </div>
    </div>
    <audio id="audio" ref="audio" controls></audio>
  </div>
</template>

<script>
import { Progress, Select, Option, } from 'view-design';
import SoundMeter from './soundMeter';

export default {
  name: 'Audio',
  components: {
    Progress, Select, Option,
  },
  data () {
    return {
      audioOn: false,
      audioTrack: {},
      inputAudio: {},
      outputAudio: {},
      inputDevices: [],
      outputDevices: [],
      clipMeter: 0,
      instantMeter: 0,
      slowMeter: 0,
    }
  },
  mounted(){
    navigator.mediaDevices.enumerateDevices().then(devices => {
      this.inputDevices = devices.filter(dev => dev.kind === "audioinput")
      this.outputDevices = devices.filter(dev => dev.kind === "audiooutput")
      this.inputAudio = this.inputDevices[0]
      this.outputAudio = this.outputDevices[0]
      this.$Notice.open({
        title: 'Noise',
        desc: 'Best to use headphones, there may be harsh noise.'
      });
      this.$refs.audio.volume = 0.2;
      this.openAudio();
    }).catch(err => {
      this.$Message.error({
        background: true,
        content: `GetUserMedia error: ${err}`
      });
    });
  },
  methods: {
    async openAudio() {
      const audio = this.$refs.audio;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
                video: false,
                audio:  {
                  deviceId: {
                    exact: this.inputAudio.deviceId
                  },
                  echoCancellation: true,
                  noiseSuppression: true,
                }
              });
        this.audioTrack = stream.getAudioTracks()[0];
            
        this.$Message.success({
          background: true,
          content: `Using audio device: ${this.audioTrack.label}`
        });

        audio.srcObject = stream;
        audio.play();
        this.getSoundMeter(stream);

        this.audioOn = true;
      } catch (err) {
        this.$Message.error({
          background: true,
          content: `GetUserMedia error: ${err}`
        });
      }
    },
    closeAudio(){
      this.$refs.audio.src = '';
      this.audioTrack.stop();
      this.audioOn = false;
    },
    getSoundMeter(stream){
      const audioContext = new window.AudioContext(),
            soundMeter = new SoundMeter(audioContext),
            _this = this;

      soundMeter.connectToSource(stream, err => {
        if (err) {
          this.$Message.error({
            background: true,
            content: `GetSoundMeter error: ${err}`
          });
          return;
        }
        setInterval(() => {
          _this.instantMeter = parseInt(soundMeter.instant.toFixed(2) * 100);
          _this.slowMeter = parseInt(soundMeter.slow.toFixed(2) * 100);
          _this.clipMeter = parseInt(soundMeter.clip.toFixed(2) * 100);
        }, 200);
      });
    },
    changeOutputAudio(){
      if (typeof this.$refs.audio.sinkId !== 'undefined') {
        this.$refs.audio.setSinkId(this.outputAudio.deviceId)
            .then(() => {
              this.$Message.success({
                background: true,
                content: `Change outputAudio to: ${this.outputAudio.label}`
              });
            })
            .catch(error => {
              if (error.name === 'SecurityError') {
                this.$Message.error({
                  background: true,
                  content: `You need to use HTTPS for selecting audio output device: ${error}`
                });
              }
              else{
                this.$Message.error({
                  background: true,
                  content: `Change outputAudio error: ${error}`
                });
              }
            });
      } else {
        this.$Message.error({
          background: true,
          content: 'Browser may not support output device selection.'
        });
      }
    }
  }
}
</script>

<style scoped>
.audioContainer{
  width: 100%;
  height: 100%;
  padding: 15% 20px;
}
#audio{
  width: 60%;
  margin: 40px;
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
.progressContainer{
  justify-content: space-between;
  padding: 0 30%;
  margin: 40px 0;
}
.progressContainer > div{
  width: 80%;
}
</style>
