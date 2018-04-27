<template>
  <div class='iconfont' :style="iconStyle">
      <div :class="'icon '+icon"></div>
      <div class="text">{{titleName}}</div>

  </div>
</template>

<script>
export default {
    props:{
        icon:{default:'icon-fridge_side1',type:String},
        titleName:{default:'重庆租房1',type:String},
        iconStyle:String
    }
}
</script>

<style lang="scss" scoped>
.iconfont{
    margin:10px 0;
    color:#fde59e;
   .icon{
        font-size: 60px;
    }
    .text{
        font-size: 18px;
    }
   
}
</style>
