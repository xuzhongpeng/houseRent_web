<template>
  <div class="a">
      <div class="flexa">
          <div class="searchArea"><searchInput class='wa' :searchText="searchText" @searchClick="searchClick"></searchInput></div>
          <div class="chooseArea">
              <chooseArea @chooseClick="chooseClick"></chooseArea>
          </div>
          <div class="showArea">
              <el-col :span="8" v-for="(item,index) in rooms" :key="index">
                 <roomCard :room="item"></roomCard>
              </el-col>
          </div>
      </div>
  </div>
</template>
 
<script>
import searchInput from './components/search'
import chooseArea from './components/chooseArea'
import roomCard from '../home/homeComponents/roomCard'
export default {
    components:{
        searchInput,
        chooseArea,
        roomCard
    },
    data(){
        return{
            rooms:[],
            searchText:"",
            searchObject:{
                searchText:'',
                Area:"",
                rent:"",
                type:"",
                houseSize:""
            }
        }
    },
    mounted(){
        this.getData('roomController/getWithCondition.do',
        this.searchObject,res=>{
            this.rooms=res.data.rows;
        })
    },
    methods:{
        searchClick(val){
            this.searchObject.searchText=val;
            this.getData('roomController/getWithCondition.do',
            this.searchObject,res=>{
                this.rooms=res.data.rows;
            })
        },
        search(object){
            this.getData('roomController/getWithCondition.do',
            this.searchObject,res=>{
                this.rooms=res.data.rows;
            })
        },
        chooseClick(type,val){
            console.log(type,val)
            switch(type){
                case "quyu":
                    this.searchObject.Area=val;
                    this.search(this.searchObject)
                    break;
                case "zujin":
                    this.searchObject.rent=val;
                     this.search(this.searchObject)
                    break
                case "leixing":
                    this.searchObject.type=val;
                     this.search(this.searchObject)
                    break
                case "mianji":
                    this.searchObject.houseSize=val;
                     this.search(this.searchObject)
                    break
            }
           
        }
    }

}
</script>

<style  lang="scss" scoped>
.a .flexa{
    display:flex;
    width:1100px;
    flex-direction:column;
    margin:0 auto;
    box-sizing: border-box;
    .searchArea{
        width:100%;
        min-height: 60px;
        padding-top:50px;
    }
    .chooseArea{
        width:100%;
        min-height: 200px;
        //background-color: rgb(182, 45, 45);
    }
    .showArea{
        width:100%;
        min-height: 200px;
       // background-color: rgb(29, 12, 12);
    }
}
</style>
