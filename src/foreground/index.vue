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
     
      <!-- <div class='title_logo'><img class='logo' src='./assets/logo111.png'/>网上租房</div> -->
      <el-menu-item class="lia fi f" index="1">首页</el-menu-item>
      <el-menu-item class="lia fi" index="2">地图找房</el-menu-item>
      <el-menu-item class="lia fi" index="3">租房守约</el-menu-item>
      <el-menu-item class="lia fi" index="4">房客心声</el-menu-item>      
      <el-menu-item class="lia fi" index="5">成为经理</el-menu-item>
      <el-menu-item class="lia fi" index="6">成为房东</el-menu-item>
      <!-- <el-submenu class="lia se" index="4">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu> -->
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
        }else{
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
      else {
        console.log(this.$route.path)
         this.activeIndex='0';         
      }
    }
  }
</script>
<style scoped lang="scss">
.el-menu{
  width:100%;
  .lia{
    margin: 0 20px;
  }
  .lia:first-child{
    margin-left: 100px;
  }
}
@media only screen and (max-width: 1200px) {
  .el-menu{
    width:1200px;
  }
}
.title_logo{
    float: left;
    margin-top: 5px;
    font-size: 20px;
    color: #02b6b7;
    margin-left: 50px;

  .logo{
    width:50px;
  }
}
.f{
  margin-left:80px !important;
}

</style>

<style lang="scss">
.el-menu--horizontal{
      border-bottom: solid 1px #090723;
}
</style>
