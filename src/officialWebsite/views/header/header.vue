<template>
  <div class='myHeader'>    
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
        title:String
    },
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

</style>

