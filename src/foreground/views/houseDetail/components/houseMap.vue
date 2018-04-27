<template>
  <div id='map'>
      <BaiduMap  class="bm-view" :style="mapStyle"   ak="U1raFybaVBVTvSHuRDQVa1lLDnS8Nv7g" @ready="handler"></BaiduMap>
  </div>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/Map/Map.vue'
import avatar from '../../../assets/mapMaker.png'
export default {
    components:{
        BaiduMap
    },
    props:{
        mapStyle:String,
        house:Object
    },
    methods:{
        handler({BMap, map}){
            var _this=this;
            map.centerAndZoom(new BMap.Point(this.house.longitude,this.house.latitude), 16);
            map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩  

            //添加标注到地图
            let icon =new BMap.Icon(avatar,new BMap.Size(27,30),{anchor: new BMap.Size(13, 30)});
            var marker = new BMap.Marker(new BMap.Point(this.house.longitude,this.house.latitude),{icon:icon}); 
            map.addOverlay(marker);     
            
        }
    }
}
</script>

<style lang="scss" scoped>
#map{
    width:100%;
    height: 100%;
    .bm-view{
        width:100%;
        height: 100%;
        min-height:300px;
    }
}
</style>
