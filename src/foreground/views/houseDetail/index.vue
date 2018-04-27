<template>
<div>
  <div class='main'>
      <el-row :gutter="2" class='houseInfo'>
        <el-col :span="16">
            <PictureShow :picList="houseInfo.housePic"></PictureShow>
        </el-col>
        <el-col :span="8">
            <GeneralInformation :houseInfo="houseInfo"></GeneralInformation>
        </el-col>
      </el-row>
      <el-row :gutter="0" class='essentialInformation'>
            <el-col :span="24"><EssentialInfo :houseid='houseInfo.house.id'></EssentialInfo></el-col>
      </el-row>  
       <el-row :gutter="0" class='basicConfiguration'>
            <el-col :span="24">
                <div class="grid-content">
                    <Facilities :houseid="houseInfo.house.id"></Facilities>
                </div>
            </el-col>
      </el-row>
      <el-row :gutter="0" class='mapArea'>
            <el-col :span="24">
                <div class="grid-content">
                    <houseMap :mapStyle="''" :house="houseInfo.house"></houseMap>
                </div>
            </el-col>
      </el-row>
      
  </div>
  <navFooter></navFooter>    
  </div>
</template>
<script>
import PictureShow from './components/pictureShow'
import GeneralInformation from './components/generalInformation'
import EssentialInfo from "./components/essentialInfo"
import Facilities from './components/facilities'
import houseMap from './components/houseMap'
import navFooter from '../../components/navFooter'
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
      let id=this.$route.params.houseid;
      this.getData('houseController/getHouseByid.do',{id:id},
      res=>{
          this.houseInfo=res.data;
      })
  },
  data(){
      return {
          houseInfo:{}
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
    width:1200px;
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
