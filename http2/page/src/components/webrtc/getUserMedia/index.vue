<template>
  <Carousel v-model="page" v-resize="getContainerSize" ref="getUserMedia" class="container">
    <CarouselItem>
        <div :style="containerSize" >
          <Basic />
        </div>
    </CarouselItem>
    <CarouselItem>
        <div :style="containerSize">
          <Basic />
        </div>
    </CarouselItem>
    <CarouselItem>
        <div :style="containerSize">
          <Basic />
        </div>
    </CarouselItem>
    <CarouselItem>
        <div :style="containerSize">
          <Basic />
        </div>
    </CarouselItem>
  </Carousel>
</template>

<script>
import { Carousel, CarouselItem } from 'view-design';
import Basic from "./basic"; 

export default {
  name: 'GetUserMedia',
  components: {
    Carousel, CarouselItem,
    Basic
  },
  data () {
    return {
      page: 0,
      containerSize: ''
    }
  },
  mounted(){
    this.$nextTick(function() {
      this.getContainerSize();
    })
  },
  methods: {
    getContainerSize(){
      const { width, height } = getComputedStyle(this.$refs.getUserMedia.$el); 
      this.containerSize = `width: ${width};height: ${height};`
    }
  },
  directives: {
    resize: {
      bind(el, binding) {
        let width = '', height = '';
        function isReize() {
          const style = document.defaultView.getComputedStyle(el);
          if (width !== style.width || height !== style.height) {
            binding.value();
          }
          width = style.width;
          height = style.height;
        }
        el.__vueSetInterval__ = setInterval(isReize, 10);
      },
      unbind(el) {
        clearInterval(el.__vueSetInterval__);
      }
    }
  }
}
</script>

<style scoped>
.container{
  position: relative;
  min-height: inherit;
  background-color: #506b9e;
}
</style>
