// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'//最外层组件容器
import router from './router/index.js'//引用route
import storeConfig from './vuex/store'//引用vuex
import ElementUI from 'element-ui'  //引用element-ui
import 'element-ui/lib/theme-chalk/index.css'  
import until from './untilJS/netTool.js'
Vue.use(until)
Vue.use(ElementUI)  
Vue.config.productionTip = false
import LazyRender from 'vue-lazy-render'
Vue.use(LazyRender)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  storeConfig,
  template: '<App/>',
  components: { App }
})
