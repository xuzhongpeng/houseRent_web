<template>
  <div class='carouselAds'>
      <el-carousel>
            <el-carousel-item v-for="item in 4" :key="item">
                <router-link :to="{ name: 'mapSearch'}"><img class='adsImg' src='../../../assets/logo.png'/></router-link>
            </el-carousel-item>
        </el-carousel>
  </div>
</template>
<script>
export default {
   name:'carouselAds',
   data(){
       return{

       }
   }
   
}
</script>
<style lang="scss" scoped>
.carouselAds{
    cursor: pointer;
}
.el-carousel__item:nth-child(2n) {
background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
background-color: #d3dce6;
}
.adsImg{
    // width:100%;
    height: 300px;
}
</style>
