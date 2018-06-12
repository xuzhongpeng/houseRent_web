import OfficialWebsite from '@/officialWebsite'
//import myHeader from '@/officialWebsite/views/test'
import home from '@/officialWebsite/views/home'
import electric from '@/officialWebsite/views/electric'
import chat from '@/officialWebsite/views/chat/chat.vue'
import neighbor from '@/officialWebsite/views/neighbor'
import itisMe from '@/officialWebsite/views/me'
import other from '@/officialWebsite/views/other.vue'
import fixthing from '@/officialWebsite/views/fixthing'
import leftMessage from '@/officialWebsite/views/leftMessage'
import updateInfo from '@/officialWebsite/views/updateInfo'
import login from '@/officialWebsite/views/login'
let router=
[{
  path: '/officialWebsite',
  component: OfficialWebsite,
  children: [ 
      { 
        path: 'home', 
        name:'home',
        component: home 
　　  },
     { 
        path: 'electric', 
        name:'electric',
        component: electric 
　　  },
     { 
        path: 'neighbor', 
        name:'neighbor',
        component: neighbor 
　　  },
    { 
      path: 'itisMe', 
      name:'itisMe',
      component: itisMe 
　　}
  ]
},
{ 
  path: '/officialWebsite/other/', 
  component: other,
  children: [ 
    { 
      path: 'chat/:receiverid', 
      name:'chat',
      component: chat 
　　},
    { 
      path: 'fixthing', 
      name:'fixthing',
      component: fixthing 
　　},
    { 
      path: 'leftMessage', 
      name:'leftMessage',
      component: leftMessage 
　　},
    { 
      path: 'updateInfo', 
      name:'updateInfo',
      component: updateInfo 
　　},
    { 
      path: 'login', 
      name:'login',
      component: login 
　　}
  ]
}]
export default router;