<template>
  <el-row :gutter="0">
    <el-col :span="18"><!-- 图片显示区 -->
        <div class="grid-content">
            <el-carousel :interval="8000" height='450px' ref='pictureArea' indicator-position="none">
                <el-carousel-item v-for="(item,index) in picList" :key="index">
                    <img :src="`${$host}picture/${item.path}`"/>
                </el-carousel-item> 
                 <el-carousel-item v-if="picList.length==0">
                    <img :src="`${$host}picture/404.jpg`"/>
                </el-carousel-item> 
            </el-carousel>
        </div>
    </el-col>
    <el-col :span="6">
        <div class="grid-content pic">
            <div class='imgaa'>
                <div class='move' ref='move1'>
                    <div class='imgArea' v-for='(item,index) in picList' @mouseover="change(index)"><img :src='`${$host}picture/${item.path}`'/></div>                    
                </div>
            </div>
            <button type="button" class="el-carousel__arrow edgeTop"  @click="moving(50)"><i class="el-icon-arrow-left"></i></button>
            <button type="button" class="el-carousel__arrow edgeBottom"  @click="moving(-50)"><i class="el-icon-arrow-left"></i></button>
        </div>
    </el-col>
</el-row>
</template>
<script>
export default {
  data(){
      return{
          move:0
      }
  },
  computed:{
      imgHeight(){
          return this.picList.length*90;
      }
  },
  props:{
      picList:Array
  },
  methods:{
      moving(val){
          this.move=this.move+val;
          if(-this.move<=(this.imgHeight-250)&&this.move<=0){                      
                setTimeout(() => {
                    var obj=this.$refs.move1
                    obj.setAttribute("style","top:"+(this.move)+"px");
                }, 100);            
          }
          else{
              this.move=this.move-val;
          }
      },
      change(index){
          
        this.$refs.pictureArea.setActiveItem(index);
      }
  }
}
</script>


<style lang="scss" scoped>
img {
    width: 100%;
    height: 100%;
}
.pic{
    box-sizing: border-box;
    .imgaa{
        margin-top:60px;
        height: 340px;
        overflow: hidden;
        .move{
            position: relative; 
        }
        .imgArea{      
                    
            height: 80px;
            width: 100px;
            margin:10px auto;
            &:hover{
                width:110px;
                height: 90px;
                border:1px solid rgb(71, 71, 71);
                cursor: pointer;
            }                
        }
    }
    
    .edgeTop{
        top:5%;
        transform:rotate(90deg);
        -ms-transform:rotate(90deg); 	/* IE 9 */
        -moz-transform:rotate(90deg); 	/* Firefox */
        -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
        -o-transform:rotate(90deg); 
        right: 80px;
    }
    .edgeBottom{
        top:90%;
        transform:rotate(270deg);
        -ms-transform:rotate(270deg); 	/* IE 9 */
        -moz-transform:rotate(270deg); 	/* Firefox */
        -webkit-transform:rotate(270deg); /* Safari 和 Chrome */
        -o-transform:rotate(270deg); 
        right: 80px;
    }
}
</style>
