<template>
<div>
    <navHeader :title="title"></navHeader>
　　<navFooter @changePage="changePage" :is_used=0></navFooter>
</div>
</template>
<script>
import navFooter from '../components/navFooter.vue'
import navHeader from '../components/navHeader.vue'
export default {
  　data(){
　　　　return{
　　　　　　title:'首页'        
　　　　}
　　},
    components:{
        navFooter,
        navHeader
　　},
    methods:{
      changePage(index){
        if(index==0){this.title="首页"}
        else if(index==1){this.title="邻居"}
        else if(index==2){this.title="聊天"}
        else{this.title="我"}
        console.log("aa+:"+index)
      }
    }
}
</script>

<style lang="scss" scoped>

</style>
