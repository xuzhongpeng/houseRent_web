import Vue from 'vue'
import Router from 'vue-router'
import  VueResource  from 'vue-resource'

import foregroundRouter from '@/foreground/router/index.js'
import backstageRouter from '@/backstage/router/index.js'
import officialWebsite from '@/officialWebsite/router/index.js'


Vue.use(VueResource) 
Vue.use(Router)
/* Vue.prototype.router = router; */
export default new Router({ 
  routes: [foregroundRouter,backstageRouter[0],officialWebsite,backstageRouter[1]]
})
