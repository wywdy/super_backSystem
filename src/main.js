import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.config.productionTip = false

import $axios from 'axios'

Vue.prototype.axios=$axios
import './assets/css/index.css'

import treetable from 'vue-table-with-tree-grid'
Vue.component("tree-table",treetable)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
