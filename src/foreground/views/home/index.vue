<template>
  <div class='home'>
    <div class="main"> 
      <el-row>
        <!-- <titleAndIcon :icon="'icon-fridge_side'" :titleName="'重庆租房'"></titleAndIcon> -->
        <el-col :span="24">
           <searchInput :rooms="rooms" class='searchInput'></searchInput>
        </el-col>
      </el-row>
      <titleAndIcon :icon="'icon-wifi'" :titleName="'超高享受'" :iconStyle="'color:#19c5a6'"></titleAndIcon>
      <el-row class="roomArea">         
        <el-col :span="8" v-for="(item,index) in rooms" :key="index">
          <roomCard :room="item"></roomCard>
        </el-col>        
      </el-row>

      <titleAndIcon :icon="'icon-fangwujiaju'" :titleName="'家具齐全'" :iconStyle="'color:#ff5050'"></titleAndIcon>
     <el-row class="roomArea">         
        <el-col :span="8" v-for="(item,index) in rooms" :key="index">
          <roomCard :room="item"></roomCard>
        </el-col>        
      </el-row>

      <titleAndIcon :icon="'icon-guanliyuan_guanliyuanliebiao'" :titleName="'超高享受'" :iconStyle="'color:#ffa000'"></titleAndIcon>
      <el-row class="roomArea">         
        <el-col :span="8" v-for="(item,index) in rooms" :key="index">
          <roomCard :room="item"></roomCard>
        </el-col>        
      </el-row>
    </div>
    <navFooter></navFooter>    
  </div>
</template>
<script>
import titleAndIcon from './homeComponents/titleAndIcon'
import CarouselAds from './homeComponents/carouselAds'
import searchInput from './homeComponents/search'
import roomCard from './homeComponents/roomCard'
import navFooter from '../../components/navFooter'
export default {
   name:'home',
   data(){
     return{
       rooms:[]
     }
   },
   components:{
        CarouselAds,
        searchInput,
        roomCard,
        titleAndIcon,
        navFooter
　　},
    methods:{
      
    },
    mounted(){
       this.getData("roomController/getWithPaging.do",{
              'searchText':'',
                'offset':'0',
                'order':'id',
                'sort':'asc'
            },
       res=>{
         this.rooms=res.data.rows;
       });
    }
}

</script>
<style lang="scss" scoped>
.home{
  min-height:700px;
  background-color: #090723;
  .searchInput{
    margin-top:20px;
    margin-bottom: 20px;
  }
}
.main{
  width:1100px;
  margin:0 auto;
  .roomArea{
    margin-top:40px;
  }
}


</style>
