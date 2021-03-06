import Vue from 'vue'
import VueRouter from "vue-router"
import Vuex from "vuex"
import App from './App.vue'
import router from "./router"
import store from "./store"
import AudioVisual from 'vue-audio-visual'
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(ViewUI);
Vue.use(VueVideoPlayer)
Vue.use(AudioVisual)

new Vue({
  store: new Vuex.Store(store),
  router: new VueRouter(router),
  render: h => h(App),
}).$mount('#app')