<template>
  <div id="foreground">    
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#090723"
      text-color="rgba(255,255,255,.5)"
      menu-trigger="hover"
      active-text-color="#fff">
      <li class="logo">
        <span class="iconfont icon-fangwuzujin">
          </span>老树家园<span class="detail">简约与舒适的租房网</span>
        </span>
      </li>
      <!-- <div class='title_logo'><img class='logo' src='./assets/logo111.png'/>网上租房</div> -->
      <el-menu-item class="lia fi f" index="1">首页</el-menu-item>
      <el-menu-item class="lia fi" index="2">地图找房</el-menu-item>
      <el-menu-item class="lia fi" index="3">租房守约</el-menu-item>  
      <el-menu-item class="lia fi" index="4">服务</el-menu-item>  
     
      <el-menu-item class="lia th" index="5">关于我们</el-menu-item>
      
    </el-menu>
    
    <router-view/>
  </div>
</template>
<script>
  export default {
    name: 'foreground',
    data() {
      return {
        activeIndex:'1'
      };
    },
    methods: {
      handleSelect(key) {
        console.log(key)
        if(key==1){
          this.$router.push({path: '/foreground/index'});
        }
        else if(key==2){
          this.$router.push({path: '/foreground/mapSearch'});
          /* window.location.reload(); */
        }
        else if(key==3){
          this.$router.push({path:'/foreground/abiding'})
        }
        else if(key==4){
          this.$router.push({path:'/foreground/ourService'})
        }
        else if(key==5){
          this.$router.push({path:'/foreground/aboutUs'})
        }
        else{
          this.$router.push({name: '/foreground/detailInfo'});
        }
      }
    },
    mounted(){
      if (this.$route.path.indexOf('index') != -1) {
        this.activeIndex='1';
      } 
      else if (this.$route.path.indexOf('mapSearch') != -1) {
         this.activeIndex='2';
      } 
      else if(this.$route.path.indexOf('abiding')!=-1){
        this.activeIndex='3'
      } 
      else if(this.$route.path.indexOf('ourService')!=-1){
        this.activeIndex='4'
      }
      else if(this.$route.path.indexOf('aboutUs')!=-1){
        this.activeIndex='5'
      }
      else {
         this.activeIndex='0';         
      }
    }
  }
</script>
<style scoped lang="scss">
#foreground{
  width: 100%;
}
.el-menu{
  width:100%;
  .lia{
    margin: 0 20px;
  }
  .lia:first-child{
    margin-left: 100px;
  }
}
@media only screen and (max-width: 1100px) {
  .el-menu{
    width:1100px;
  }
}

  .logo{
    float:left;
    color: #fff;
    display: inline-block;
    font-family: STXinwei;
    font-size: 25px;
    margin-top: 10px;
    margin-left:20px;
    span{
      font-size: 25px;
    }
    .detail{
      font-size: 15px;
    }
  }

.f{
  margin-left:40px !important;
}

</style>

<style lang="scss">
.el-menu--horizontal{
      border-bottom: solid 1px #090723;
}
</style>
