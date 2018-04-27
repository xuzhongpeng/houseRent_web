<template>
　　<lazy-render><MapComponet :height="height" :user-data="data"></MapComponet></lazy-render>
</template>
<script>
import MapComponet from './components/mapComponent.vue'
export default {
  　data(){
　　　　return{
　　　　　　height:"600px",
           data:[
            /* {
                localtion:{latitude:'106.505588', longitude:'29.595127'},
                houseName:'显贵小屋',
                address:'大龙山商贸大厦A栋17-3-22',
                jump_url:'http://baidu.com'
            },
            {
                localtion:{latitude:'106.519673', longitude:'29.588595'},
                houseName:'花园屋',
                address:'花卉园商贸大厦A栋17-3-22',
                jump_url:'http://xuzhongpeng.top'
            },
            {
                localtion:{latitude:'106.534673', longitude:'29.588595'},
                houseName:'花园屋',
                address:'花卉园商贸大厦A栋17-3-22',
                jump_url:'http://xuzhongpeng.top'
            } */
        ]
　　　　}
　　},
    components:{
        MapComponet
　　},
    beforeMount(){      
        this.getData('houseController/getall.do',null,
        res=>{
            this.data=res.data.rows;
            console.log(this.data)
        },error=>{

        })   
　　}
}
</script>

<style lang="scss" scoped>

</style>
