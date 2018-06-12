<template>
  <div>
      <div class="picArea"><img :src="`${$host}picture/bj02.jpg`"> </div>
       <div class="picArea"><img :src="`${$host}picture/bj01.jpg`"> </div>
        <div class="picArea"><img :src="`${$host}picture/bj03.jpg`"> </div>
         <div class="picArea"><img :src="`${$host}picture/bj04.jpg`"> </div>
          <div class="picArea"><img :src="`${$host}picture/bj05.jpg`"> </div>
 <navFooter></navFooter>    
  </div>
</template>

<script>
import navFooter from '../../components/navFooter'
export default {
    components:{
        navFooter
    }
}
</script>

<style lang="scss" scoped>
.picArea{
    //height:500px;
    width:100%;
    img{
        width: 100%;
    }
}
</style>
