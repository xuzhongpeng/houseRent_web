<template>
   <el-dialog
        title="选择地图"
        :visible.sync="mapDialog"
        width="60%"
        center 
        v-if="mapDialog">
     <!--  <div id='mapArea1'  :style="style"></div> -->
      <BaiduMap  class="bm-view" :style="style" center="重庆"  ak="U1raFybaVBVTvSHuRDQVa1lLDnS8Nv7g" @ready="handler">
          
      </BaiduMap>
      已选择
      <label>纬度：{{form.latitude}} </label>
      <label>精度：{{form.longitude}} </label>

     <span slot="footer" class="dialog-footer">
            <el-button @click="quxiao">取 消</el-button>
            <el-button type="primary" @click="mapDialog=false">确 定</el-button>
        </span>
   </el-dialog>
</template>
<script>
import BaiduMap from 'vue-baidu-map/components/Map/Map.vue'
export default {
  name:'dialogmap',
  data(){
      return{
          style:{
              width:"100%",
              height:"300px"
          },
          mapDialog:false
      }
    },
    components:{
      BaiduMap
    },
    props:{    
      form:Object
　  },
    methods:{
      handler({BMap, map}){
          let that=this;
          map.centerAndZoom(new BMap.Point(106.55,29.57), 13);
            map.addControl(new BMap.MapTypeControl());  
            map.setCurrentCity("重庆");    
            map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩       
           
            /************************************************
            添加点击显示经纬度
            *************************************************/
           function showInfo(e){
                that.form.longitude=e.point.lng;
                that.form.latitude=e.point.lat;
            }
            map.addEventListener("click", showInfo);     

            /**自定义地图颜色 */
            //个性化在线编辑器地址：http://lbsyun.baidu.com/custom/
            var styleJson = [
                {
                    "featureType": "land",
                    "elementType": "geometry.fill",
                    "stylers": {
                              "color": "#ead1dcff",
                              "hue": "#f4cccc",
                              "lightness": -3,
                              "saturation": 48,
                              "visibility": "on"
                    }
                },
                {
                    "featureType": "building",
                    "elementType": "geometry.fill",
                    "stylers": {
                              "color": "#eaccd9ff"
                    }
                }
            ]
        
      },
      quxiao(){
          this.mapDialog=false;
          this.form.longitude='';
          this.form.latitude='';
      }
    },
    mounted(){
        
    }

}



</script>
<style lang="scss">
.BMap_bubble_title{
    text-align: center !important;
}
.BMap_bubble_content{//信息窗口style
    
}
.BMap_pop{
    &>:first-child div{
            border-radius: 10px 0 0 0;        
    }   
    &>:nth-child(3) div{
        border-radius:  0 10px 0 0;        
    }
    &>:nth-child(5) div{
        border-radius:  0 0 0 10px;        
    }
    &>:nth-child(7) div{
        border-radius:  0 0 10px 0;        
    }
}

/* .BMap_noprint{
    width: 16px !important;
    height: 16px !important;
    border: 2px solid #fff !important;
    background-color: #0f89f5 !important;
    -moz-border-radius: 50% !important;
    -webkit-border-radius: 50% !important;
    -ms-border-radius: 50% !important;
    -o-border-radius: 50%;
    border-radius: 50%;
    box-shadow: 2px 2px 2px rgba(0,0,0,.15);
} */
</style>
