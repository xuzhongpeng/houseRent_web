<template>
  <div class='myHeader'>   
      <span class='icon-fanhui iconfont' v-if="is_back==true" @click="back"></span> 
      <span>{{title}}</span>
  </div>
</template>
<script>
  export default {
    name: 'myHeader',
    data() {
     return {
        
      };
    },
    props:{
        title:String,
        is_back:{
            default:false,
            type:Boolean
        }
    },
    methods:{
        back(){
            window.history.go(-1);
        }
    }
  }
</script>
<style scoped lang="scss">
.myHeader{
    height: 50px;
    width:100%;
    background-color: #409EFF;
    span{
        color:white;
        line-height: 50px;
    }
}
.icon-fanhui{
    position: absolute;
    left:0;
    display: inline-block;
    width:3rem;
}

</style>

