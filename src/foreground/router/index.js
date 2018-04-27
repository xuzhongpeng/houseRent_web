import Foreground from '@/foreground'
import home from '@/foreground/views/home'
import mapSearch from '@/foreground/views/mapSearch'
import houseDetail from '@/foreground/views/houseDetail'
import roomDetail from '@/foreground/views/roomDetail'
let router=
{
  path: '/foreground',
  component: Foreground,
  children: [ 
  　　　{ 
          path: 'index', 
          name:'index',
          component: home 
  　　  },
        { 
          path: 'mapSearch', 
          name:'mapSearch',
          component: mapSearch 
  　　  }
        ,
        { 
          path: 'houseDetail/:houseid', 
          name:'houseDetail',
          component: houseDetail 
  　　  },
        { 
          path: 'roomDetail/:roomid', 
          name:'roomDetail',
          component: roomDetail 
  　　  }
  ]
}
export default router;