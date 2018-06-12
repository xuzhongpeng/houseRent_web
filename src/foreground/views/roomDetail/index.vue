<template>
<div>
  <div class='main'>
      <el-row :gutter="2" class='houseInfo'>
        <el-col :span="16">
            <PictureShow :picList="pictureData"></PictureShow>
        </el-col>
        <el-col :span="8">
            <GeneralInformation :roomInfo="roomInfo"></GeneralInformation>
        </el-col>
      </el-row>
       <el-row :gutter="0" class='basicConfiguration'>
            <el-col :span="24">
                <div class="grid-content">
                    <Facilities :houseid="roomInfo.house.id"></Facilities>
                </div>
            </el-col>
      </el-row>
      <el-row :gutter="0" class='mapArea'>
            <el-col :span="24">
                <div class="grid-content">
                    <houseMap :mapStyle="''" :house="roomInfo.house"></houseMap>
                </div>
            </el-col>
      </el-row>
      
  </div>
  <navFooter></navFooter>    
  </div>
</template>
<script>
import PictureShow from '@/foreground/views/houseDetail/components/pictureShow'
import GeneralInformation from './components/generalInformation'
import EssentialInfo from "@/foreground/views/houseDetail/components/essentialInfo"
import Facilities from '@/foreground/views/houseDetail/components/facilities'
import houseMap from '@/foreground/views/houseDetail/components/houseMap'
import navFooter from '@/foreground/components/navFooter'
export default {
  components:{
      PictureShow,
      GeneralInformation,
      EssentialInfo,
      Facilities,
      houseMap,
      navFooter
  },
  mounted(){
      let id=this.$route.params.roomid;
      if(id){
          //获取房间信息
        this.getData('roomController/getInfoByID.do',{roomid:id},
        res=>{
            this.roomInfo=res.data;
        })
          //获取图片信息
        this.getData('house_picController/getById.do',{id:id},
        res=>{
            if(res.data){
                this.pictureData=res.data.result;
            }
        }) 
      }
  },
  data(){
      return {
          roomInfo:{},
          pictureData:[],
      }
  }
}
</script>
<style lang="scss" scoped>
img {
    width: 100%;
    height: 100%;
}
.main{
    margin:0 auto;
    width:1000px;
}
.houseInfo {
    margin-bottom: 20px;    
    margin:20px 0;
    .grid-content {
        min-height:450px;
    }
    
}
.essentialInformation{
    margin-bottom: 20px;    
    .grid-content {
        min-height: 240px;
    }
}
.basicConfiguration{
    margin-bottom: 20px;    
    .grid-content{
        min-height:120px;
    }
}
.mapArea{
    margin-bottom: 20px;
    .grid-content{
        height:300px;
    }
}





.bg-purple-light {
    background: #081531;
}
.bg-purple-dark {
    background: #191d22;
}
.bg-purple {
    background: #5e87b3;
}
h3{
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }
</style>
