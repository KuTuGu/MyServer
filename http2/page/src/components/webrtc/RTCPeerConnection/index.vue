<template>
  <div ref="editor" id="editor"></div>
</template>

<script>
export default {
  name: 'RTCPeerConnection',
  data () {
    return {
      editor: null,
      theme: 'vs-dark'
    }
  },
  mounted(){
    // this.editor = monaco.editor.create(this.$refs.editor, {
    //   value: [
		// 		'function x() {',
		// 		'\tconsole.log("Hello world!");',
		// 		'}'
		// 	].join('\n'),
    //   language: 'html',
    //   theme: this.theme, 
    //   automaticLayout: true
    // })
  },
  methods: {
  },
}
</script>

<style scoped>
#editor{
  min-height: inherit;
  text-align: left;
}
</style>
