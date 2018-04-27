<template>
<div>
    <img :src='ImgSrc' @click='imgDialog=true' :style="imgStyle"/>
  <el-dialog
  :visible.sync="imgDialog"
  width="40%"
  center>
    <img class='dialogImg' :src='ImgSrc'/>
  </el-dialog>
</div>
</template>
<script>
export default {
    data(){
        return{
            imgDialog:false
        }
    },
  props:{
      ImgSrc:String,
      imgStyle:String
  }
}
</script>
<style lang="scss" scoped>
img{
    width:100%;
    height: 100%;
    cursor: pointer;
}
.dialogImg{
    border-radius: 0%;
}
</style>

