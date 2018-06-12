import Backstage from '@/backstage'
import login from '@/backstage/views/login'
import Home from '@/backstage/views/home/home.vue'
import MenuManage from '@/backstage/views/menuManage'
import permission from '@/backstage/views/permissionManage'
import adminManage from '@/backstage/views/adminManage'
import tenantManage from '@/backstage/views/tenantManage'
import touristsManage from '@/backstage/views/touristsManage'
import houseManage from '@/backstage/views/houseManage'
import news from '@/backstage/views/news'
import roomManage from '@/backstage/views/room'
import rents from '@/backstage/views/rents'
import electric from '@/backstage/views/electric'
import leftMessage from '@/backstage/views/leftMessage'
import repair from '@/backstage/views/repair'

let backstageRouter=
[{
  path: '/backstage',
  name:'backstage',
  component: Backstage,
  children: [ 
  　　　{ 
          path: 'home', 
          name:'home',
          component: Home
  　　  },
        {
          path:'menuManage',
          name:'menuManage',
          component: MenuManage
        },
        {
          path:'permission',
          name:'permission',
          component: permission
        }
        ,
        {
          path:'adminManage',
          name:'adminManage',
          component: adminManage
        },
        {
          path:'tenantManage',
          name:'tenantManage',
          component: tenantManage
        },
        {
          path:'touristsManage',
          name:'touristsManage',
          component: touristsManage
        },
        {
          path:'houseManage',
          name:'houseManage',
          component: houseManage
        },
        {
          path:'news',
          name:'news',
          component: news
        },
        {
          path:'roomManage',
          name:'roomManage',
          component: roomManage
        },
        {
          path:'rents',
          name:'rents',
          component: rents
        },
        {
          path:'electric',
          name:'electric',
          component: electric
        },
        {
          path:'leftMessage',
          name:'leftMessage',
          component: leftMessage
        },
        {
          path:'repair',
          name:'repair',
          component: repair
        }
  ]
},{
  path:'/backstage/login',
  name:'login',
  component: login
}]
export default backstageRouter;