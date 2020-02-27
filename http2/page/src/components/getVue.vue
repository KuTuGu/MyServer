<template>
  <div ref="dynamicVue" id="dynamicVue" />
</template>

<script>
import Vue from 'vue'

export default {
  name: 'GetVue',
  data(){
    return {
      styleId: '',
    }
  },
  mounted(){
    this.render();
  },
  methods: {
    splitSource (source, type) {
      const regex = new RegExp(`<${type}[^>]*>`);
      let openingTag = source.match(regex);
 
      if (!openingTag) return '';
      else openingTag = openingTag[0];
 
      return source.slice(source.indexOf(openingTag) + openingTag.length, source.lastIndexOf(`</${type}>`));
    },
    render(src){
      const source = src || this.$store.state.content,
            html = this.splitSource(source,'template'),
            script = this.splitSource(source, 'script').replace(/export default/, 'return '),
            css = this.splitSource(source, 'style'),
            obj = new Function(script)();

      if(!obj) return;

      obj.template = html;
      const Component = Vue.extend(obj);
      this.component = new Component().$mount();
      this.$refs.dynamicVue.appendChild(this.component.$el);

      //style
      const style = document.createElement('style');
      style.type = 'text/css';
      style.id = this.styleId = String(Math.random()).slice(2);
      style.innerHTML = css;
      document.getElementsByTagName('head')[0].appendChild(style);
    },
    remove(){
      const style = document.getElementById(this.styleId);
      if (style) style.parentNode.removeChild(style);
 
      if (this.component) {
        this.$refs.dynamicVue.removeChild(this.component.$el);
        this.component.$destroy();
        this.component = null;
      }
    }
  },
  beforeDestroy () {
    this.remove();
  },
  watch: {
    "$store.state.content": function(newVal){
      this.remove();
      this.render(newVal);
    }
  }
}
</script>

<style>
#dynamicVue{
  width: 100%;
  height: 100%;
  min-height: inherit;
  display: flex;
  align-items: center;
}
</style>
