<template>
  <div>    
     <navHeader :title="title"></navHeader>
    <router-view/>
    <navFooter @changePage="changePage" :is_used='activity'></navFooter>
  </div>
</template>
<script>
import navFooter from './components/navFooter.vue'
import navHeader from './components/navHeader.vue'
  export default {
    name: 'officialWebsite',
    data() {
     return {
        activity:0,
        title:""
      };
    },
    components:{
      navFooter,
      navHeader
    },
    methods: {
      changePage(index){
        if(index==0){
          this.title="首页"
          this.$router.push({path:"home"})
          }
        else if(index==1){
          this.title="用电"
          this.$router.push({path:"electric"})
          }
        else if(index==2){
          this.title="聊天"
          this.$router.push({path:"neighbor"})
        }
        else{
          this.title="我"
           this.$router.push({path:"itisMe"})
        }
      }
    },
    mounted(){
       if(this.$route.path.indexOf("home")!=-1){
         this.title="首页";
         this.activity=0;
       }
       else if(this.$route.path.indexOf('electric') != -1){
         this.title="用电";
          this.activity=1;
       }
       else if(this.$route.path.indexOf('neighbor') != -1){
         this.title="邻居";
          this.activity=2;
       }
       else if(this.$route.path.indexOf('itisMe') != -1){
         this.title="我";
          this.activity=3;
       }
    }
  }
</script>
<style scoped lang="scss">


</style>

