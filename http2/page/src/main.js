import Vue from 'vue'
import VueRouter from "vue-router"
import Vuex from "vuex"
import App from './App.vue'
import router from "./router"
import store from "./store"
import { Message, Notice } from 'view-design';

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(Vuex);

Vue.prototype.$Message = Message
Vue.prototype.$Notice = Notice

new Vue({
  store: new Vuex.Store(store),
  router: new VueRouter(router),
  render: h => h(App),
}).$mount('#app')