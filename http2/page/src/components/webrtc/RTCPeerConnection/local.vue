<template>
  <div style="width: 100%;padding: 20px;">
    <div class="fullSize">
      <Split v-model="splitValue">
        <div slot="left">
          <video ref="clientA" class="fullSize" controls></video>
        </div>
        <div slot="right">
          <video ref="clientB" class="fullSize" controls></video>
        </div>
      </Split>
    </div>
    <Button v-if="!cameraOn" type="primary" @click.native="openCamera">Connect</Button>
    <Button v-else type="error" @click.native="closeCamera">Close</Button>
  </div>
</template>

<script>
export default {
  name: 'RTCPeerLocal',
  data () {
    return {
      splitValue: 0.5,
      cameraOn: false,
      stream: {},
      configuration: {
        // sdpSemantics: 
      },
      offerOptions: {
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1
      }
    }
  },
  mounted(){
    this.$Notice.warning({
      title: 'Noise',
      desc: `<ul>
      <li>Best to use headphones, there may be harsh noise.</li>
      <li>The voice volume is 0 defaultly.</li>
      </ul>`
    });
  },
  methods: {
    async openCamera() {
      const video = this.$refs.clientA;
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: {
                  echoCancellation: true,
                  noiseSuppression: true,
                }
              });
            
        this.$Message.success({
          background: true,
          content: `Using video device: ${this.stream.getVideoTracks()[0].label}`
        });
        this.$Message.success({
          background: true,
          content: `Using audio device: ${this.stream.getAudioTracks()[0].label}`
        });

        video.srcObject = this.stream;
        video.volume = 0.1;
        video.play();

        this.cameraOn = true;

        this.connect();
      } catch (err) {
        this.$Message.error({
          background: true,
          content: `GetUserMedia error: ${err}`
        });
      }
    },
    closeCamera(){
      Reflect.deleteProperty(this.$refs.clientA, 'src')
      Reflect.deleteProperty(this.$refs.clientB, 'src')
      this.stream.getTracks().forEach(track => track.stop());
      this.pc1 && this.pc1.close();
      this.pc2 && this.pc2.close();
      this.pc1 = null;
      this.pc2 = null;
      this.cameraOn = false;
    },
    async onIceCandidate(pc, event) {
      if(event && event.candidate){
        const AnotherPC = (pc === this.pc1) ? this.pc2 : this.pc1,
              name = (pc === this.pc1) ? 'pc1' : 'pc2';
        try {
          await (AnotherPC.addIceCandidate(event.candidate));
        } catch (err) {
          this.$Message.error({
            background: true,
            content: `${name} failed to add ICE Candidate: ${err.toString()}`
          });
        }
      }
    },
    async connect(){
      this.pc1 = new RTCPeerConnection(this.configuration),
      this.pc2 = new RTCPeerConnection(this.configuration);
      
      // listen
      this.pc1.addEventListener('icecandidate', e => this.onIceCandidate(this.pc1, e));
      this.pc2.addEventListener('icecandidate', e => this.onIceCandidate(this.pc2, e));
      this.pc2.addEventListener('track', e => {
        const video = this.$refs.clientB;

        if (video.srcObject !== e.streams[0]) {
          video.srcObject = e.streams[0];
          video.volume = 0.1;
          video.play();
        }
      });
      
      // add stream
      this.stream.getTracks().forEach(track => this.pc1.addTrack(track, this.stream));

      // request
      try {
        const offer = await this.pc1.createOffer(this.offerOptions);
        await this.onCreateOfferSuccess(offer);
      } catch (err) {
        this.$Message.error({
          background: true,
          content: `Failed to create offer: ${err.toString()}`
        });
      }
    },
    // request
    async onCreateOfferSuccess(desc) {
      try {
        await this.pc1.setLocalDescription(desc);
      } catch (err) {
        this.$Message.error({
          background: true,
          content: `Failed to set local session description: ${err.toString()}`
        });
      }
      try {
        await this.pc2.setRemoteDescription(desc);
      } catch (err) {
        this.$Message.error({
          background: true,
          content: `Failed to set remote session description: ${err.toString()}`
        });
      }

      // answer
      try {
        const answer = await this.pc2.createAnswer();
        await this.onCreateAnswerSuccess(answer);
      } catch (err) {
        this.$Message.error({
          background: true,
          content: `Failed to create answer: ${err.toString()}`
        });
      }
    },
    // answer
    async onCreateAnswerSuccess(desc) {
      try {
        await this.pc2.setLocalDescription(desc);
      } catch (err) {
        this.$Message.error({
          background: true,
          content: `Failed to set local session description: ${err.toString()}`
        });
      }
      try {
        await this.pc1.setRemoteDescription(desc);
      } catch (err) {
        this.$Message.error({
          background: true,
          content: `Failed to set remote session description: ${err.toString()}`
        });
      }
    }
  },
}
</script>

<style scoped>
.fullSize{
  width: 100%;
  height: calc(80vh - 50px);
}
button{
  margin: 10px 0;
}
</style>
