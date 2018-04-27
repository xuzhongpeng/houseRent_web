<template>
  <div id="mapSearch" ref="mapSearch"> 
      <transition name="el-zoom-in-top">
            <detailInfo class="transition-box" :detailDialog='detailDialog' v-on:closeDialog="closeDialog" :houseInfo='houseInfo' :houseData="houseData"></detailInfo>  
      </transition>
       <BaiduMap   class="bm-view" :style="style"  ak="U1raFybaVBVTvSHuRDQVa1lLDnS8Nv7g" @ready="handler"></BaiduMap>
  </div>
</template>
<script>
import detailInfo from './detailInfo'
import BaiduMap from 'vue-baidu-map/components/Map/Map.vue'
import avatar from '@/foreground/assets/mapMaker.png'
export default {
  name:'MapComponet',
  data(){
      return{
          style:{
              width:this.width,
              height:"100px"
          },
          detailDialog:false,
          houseInfo:{},
          houseData:{}
      }
  },
  components:{
        detailInfo,
        BaiduMap,
　},
  props:{    
        height:{
　　　　　　　　default:"600px"
　　　　　　},
        width:{
　　　　　　　　default:"100%"
　　　　　　},
        userData:{
            type:Array
        }
　},
  methods:{
       handler({BMap, map}){
            var _this=this;       
           /*  var map = new BMap.Map("mapArea",{enableMapClick:true}); */
            map.centerAndZoom(new BMap.Point(106.55,29.57), 13);
            map.addControl(new BMap.MapTypeControl());  
            //map.setCurrentCity("重庆");    
            map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩       
           
           setTimeout(()=>{
                var userdata_=_this.userData;            
                let icon =new BMap.Icon(avatar,new BMap.Size(27,30),{anchor: new BMap.Size(13, 30)});
                for(var i=0;i<userdata_.length;i++){
                    var marker = new BMap.Marker(new BMap.Point(userdata_[i].longitude,userdata_[i].latitude),{icon:icon});  // 创建标注
                    let houseInfo=userdata_[i];
                    map.addOverlay(marker);               // 将标注添加到地图中
                     marker.addEventListener("click",function(e){
                    openInfo(houseInfo)}
                    );
                }
           },1000)
            
             function addClickHandler(houseInfo){
               
            } 
            function openInfo(houseInfo){
                _this.houseInfo=houseInfo;
                 _this.getData('houseController/getHouseByid.do',{id:houseInfo.id},
                    res=>{
                        _this.houseData=res.data;
                    },error=>{

                    }
                )
                _this.detailDialog=true;
            }
            /* function openInfo(content,e){
                var p = e.target;
                var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
                var infoWindow = new BMap.InfoWindow(content);  // 创建信息窗口对象 
                map.openInfoWindow(infoWindow,point); //开启信息窗口
            } */


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
            //map.setMapStyle({styleJson:styleJson});
            
           
            // 判断定位是否成功
            var geolocationControl = new BMap.GeolocationControl();
            geolocationControl.addEventListener("locationSuccess", function(e){                
                map.centerAndZoom(new BMap.Point(e.point.lng,e.point.lat), 15);
                console.log("定位成功，您的位置是："+e.point.lng,e.point.latitude,e)
            });
            geolocationControl.addEventListener("locationError",function(e){
                alert(e.message);
            });
            map.addControl(geolocationControl);

            /** */
       },
       closeDialog(){
           this.detailDialog=false;
       }
    
    },
    mounted(){
        let mapHeight=(document.documentElement.clientHeight-61)+'px';
        this.style.height=mapHeight;
        let that=this;
        window.addEventListener('resize', ()=>{
            setTimeout( () =>{
             let mapHeight=(document.documentElement.clientHeight-61)+'px';
            that.style.height=mapHeight;
            },400)
        });
    }
}



</script>
<style lang="scss">
.BMap_bubble_title{
    text-align: center !important;
}
.BMap_bubble_content{//信息窗口style
    
}
.bm-view{
    min-height: 467px;
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
