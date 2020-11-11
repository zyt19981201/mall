import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

Vue.prototype.$bus = new Vue()

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})