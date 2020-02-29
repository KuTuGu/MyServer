<template>
  <div style="width: 100%;padding: 20px;">
    <div class="fullSize">
      <Split v-model="splitValue">
        <div slot="left">
          <textarea ref="clientA" v-model="text" class="fullSize"></textarea>
        </div>
        <div slot="right">
          <textarea ref="clientB" class="fullSize"></textarea>
        </div>
      </Split>
    </div>
    <Button type="primary" @click.native="sendData">Send</Button>
  </div>
</template>

<script>
export default {
  name: 'RTCDataLocal',
  data () {
    return {
      splitValue: 0.5,
      text: "",
    }
  },
  mounted(){
    this.connect();
  },
  methods: {
    sendData() {
      this.sendChannel.send(this.$refs.clientA.value);
    },
    close(){
      this.sendChannel.close();
      this.receiveChannel.close();
      this.pc1.close();
      this.pc2.close();
      this.pc1 = null;
      this.pc2 = null;
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
      this.pc1 = new RTCPeerConnection(),
      this.pc2 = new RTCPeerConnection();
      this.sendChannel = this.pc1.createDataChannel('sendDataChannel');
      
      // listen
      this.pc1.addEventListener('icecandidate', e => this.onIceCandidate(this.pc1, e));
      this.pc2.addEventListener('icecandidate', e => this.onIceCandidate(this.pc2, e));
      this.pc2.addEventListener('datachannel', e => {
        this.receiveChannel = e.channel;
        this.receiveChannel.onmessage = e => {
          this.$refs.clientB.value = e.data;
        }
      });

      // request
      try {
        const offer = await this.pc1.createOffer();
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
textarea{
  outline: none;
  resize: none;
  padding: 10px;
  font-family: Recursive, Fira Code, Consolas;
  font-size: 16px;
}
button{
  margin: 10px 0;
}
</style>
