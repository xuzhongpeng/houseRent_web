<template>
<div>
  <div class="aboutUs">
      <el-container>
        <el-aside class='aside' width="200px">
            <ul @click="check" ref="ul">
                <li class="is_check">关于我们</li>
                <li>成为经理</li>
                <li>我是房东</li>
            </ul>
        </el-aside>
        <el-main>
            <div v-if="index==1">
                 <div class="picArea"><img :src="$host+'picture/bj07.jpg'"> </div>
                 <div class="picArea"><img :src="$host+'picture/bj08.png'"> </div>
            </div>
            <toBeManager v-if="index==2"></toBeManager>
            <toBeLandlord v-if="index==3"></toBeLandlord>
        </el-main>
      </el-container> 
  </div>
  <navFooter></navFooter> 
  </div>
</template>

<script>
import navFooter from '../../components/navFooter'
import toBeLandlord from "../toBeLandlord/index.vue"
import toBeManager from "../toBeManager/index.vue"
export default {
    components:{
        toBeLandlord,
        toBeManager,
        navFooter
    },
    data(){
        return{
            index:1,
        }
    },
    methods:{
        check(e){
            let target=e.target;
            let lis=this.$refs.ul.getElementsByTagName("li");
            for(let i=0;i<lis.length;i++){
                lis[i].setAttribute("class","");
                if(lis[i]==target){
                    this.index=i+1;
                }
            }
            if(target.nodeName.toLowerCase()=="li"){
                target.setAttribute("class","is_check");                
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.aboutUs{
    width:1000px;
    margin:0 auto;
    .aside{        
        margin-top:20px;
        padding-top:20px;
        border:20px solid rgb(228,228,228);
        border-radius: 30px;
        ul{
            padding:0;
            .is_check{
                background: rgb(228, 228, 228);
            }
            li{
                list-style-type: none;
                cursor:pointer;
                height: 40px;
                line-height: 40px;
                &:hover{
                    background: rgb(228, 228, 228);
                }
                
            }
        }
    }
    .picArea{
    //height:500px;
    width:100%;
    img{
        width: 100%;
    }
}
}
</style>
