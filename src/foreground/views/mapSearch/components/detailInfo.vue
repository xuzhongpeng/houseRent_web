<template>
<div >
    <section id='searchArea'  class='iconfont' >
        <div id='headIco'></div>
        <div class='iptbox'>
            <input type="text" @input="inputChange" v-model="searchInfo"/>
            <div id='search'><i class='el-icon-search'></i></div>
            <span class='icon-guanbi' @click="closeShow"></span>
        </div>        
    </section>   
    <search-area v-if='!detailDialog' :searchData="searchData"></search-area>
    <information v-if='detailDialog' :houseData="houseData" :houseInfo="houseInfo"></information>
</div>
</template>

<script>
import searchArea from './searchArea'
import information from './information'
export default {
  name:'detailInfo',
  data(){
      return{       
          searchInfo:'',
          searchData:[]
      }
  },
  props:{
      houseInfo:{},
      houseData:{},
      detailDialog:Boolean
  },
  components:{
    searchArea,
    information
    },
   methods:{       
       closeShow(){
           this.$emit("closeDialog");
       },
       inputChange(){
           this.detailDialog=false;
           if(this.searchInfo!=''){
            setTimeout(()=>{
                this.getData('houseController/getWithPaging.do',{
                    searchText:this.searchInfo,
                    'offset':'0',
                        'order':'id',
                        'sort':'asc'
                },res=>{
                    this.searchData=res.data.rows;
                })
            },200)
           }
           else{
               this.searchData=[];
           }
           
       }
   }
}
</script>
<style lang="scss" scoped>
$width:45px;
$height:45px;

#searchArea{
   
    position: absolute;
    z-index: 6201;
    left: 15px;
    top: 80px;
    height: 45px;
    background-color: #fff;
    box-shadow: 1px 1px 19px -5px;
    display: inline-block;
    div{
        display: inline-block;
    }
    .iptbox{
        height: $height;
        width: 290px;
        input{
            display: inline-block;
            height: 30px;
            width:180px;
            outline: none;
            margin-top:-10px;
            border: none;
            color:#565656;
            margin-left: 10px;
        }
        #search{
            width:45px;
            height: 45px;
            background-position: 50% 50%;
            color: #9fa3b2;
            line-height: 45px;
            &:hover{
                cursor: pointer;
                color:#296fe7;
            }
        }
        .icon-guanbi{
            color: #b1b1b1;
            &:hover{
                cursor: pointer;
                color:#296fe7;
            }
        }
    }
    #closeShow{
        width:45px;
        height: 45px;
        background-color: rgb(233, 233, 233);
    }
}
//搜索内容展示区

</style>

