import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import toast from "components/common/toast/index"
import FastClick from 'fastclick'

Vue.prototype.$bus = new Vue()

Vue.use(toast)

// 解决移动端300毫秒点击延迟
FastClick.attach(document.body)

new Vue({
  el: '#app',
  router,
  store,
  // toast,
  render: h => h(App)
})