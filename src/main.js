import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router/index'
import store from './store'
import 'amfe-flexible'
import http from './utils/http'
import vueAxios from 'vue-axios'
import './assets/css/resize.css'


Vue.use(vueAxios, http)//
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
