import OfficialWebsite from '@/officialWebsite'
import myHeader from '@/officialWebsite/views/test'
let router=
{
  path: '/officialWebsite',
  component: OfficialWebsite,
  children: [ { 
    path: 'myHeader/:contentID/:Is_contentID', 
    name:'myHeader',
    component: myHeader 
　　  },
  ]
}
export default router;