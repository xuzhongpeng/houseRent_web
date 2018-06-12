<template>
  <div class='roomCard' @click="getInHouse">
       
            <el-card :body-style="{ padding: '0px' }">
                <el-carousel >
                    <el-carousel-item v-for="(item,index) in imgSrc" :key="index">
                        <img :src="`${$host}picture/${item.path}`" class="image">
                    </el-carousel-item>
                </el-carousel>
            
            <div style="padding: 14px;">
                <span>{{room.houseName}}</span>
                <div class="bottom clearfix">
                <time class="time">{{room.address}}</time>
                <div class="money">￥{{room.rent}}元/月</div>
                </div>
            </div>
            </el-card>
        
   
  </div>
</template>

<script>
export default {
    props:{
        room:Object
    },
    data(){
        return{
            imgSrc:[],
        }
    },
    methods:{
        getInHouse(){
            this.$router.push("roomDetail/"+this.room.id)
        }
    },
    mounted(){
        setTimeout(()=>{
            this.getData("house_picController/getById.do",
            {
                id:this.room.id
            },res=>{
                this.imgSrc=res.data.result
            })
        },500)
        
    }
}
</script>

<style lang='scss' scoped>
.roomCard{
    min-height: 300px;
    margin-bottom: 20px;
    color:rgb(170, 170, 170);
    text-align: left;
    font-size: 13px;
    width:350px;
    cursor:pointer;
}
.image{
    width: 100%;
    height: 350px;
}


 .time {
    font-size: 13px;
    color: #999;
  }
  .money{
      color:#ffa100;
      float: right;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>
