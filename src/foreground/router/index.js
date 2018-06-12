import Foreground from '@/foreground'
import home from '@/foreground/views/home'
import mapSearch from '@/foreground/views/mapSearch'
import houseDetail from '@/foreground/views/houseDetail'
import roomDetail from '@/foreground/views/roomDetail'
import conditionLookup from '@/foreground/views/conditionLookup'
import abiding from '@/foreground/views/abiding'
import ourService from '@/foreground/views/ourService'
/* import toBeManager from '@/foreground/views/toBeManager'
import toBeLandlord from '@/foreground/views/toBeLandlord' */
import aboutUs from '@/foreground/views/aboutUs'
import reserve from '@/foreground/views/roomDetail/components/reserve'
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
  　　  },
        { 
          path: 'conditionLookup', 
          name:'conditionLookup',
          component: conditionLookup 
  　　  },
        { 
          path: 'abiding', 
          name:'abiding',
          component: abiding 
  　　  },
        { 
          path: 'ourService', 
          name:'ourService',
          component: ourService 
  　　  },
        { 
          path: 'aboutUs', 
          name:'aboutUs',
          component: aboutUs 
  　　  },
        { 
          path: 'roomDetail/reserve/:roomid', 
          name:'reserve',
          component: reserve 
  　　  }
  ]
}
export default router;