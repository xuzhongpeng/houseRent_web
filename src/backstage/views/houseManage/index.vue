<template>
  <div id="">
    <Table :tableHeader="tableHeader" :tableData="$store.state.tableModule.tableData"  :operationInfo="operationInfo"></Table>
    </el-table-column>
  </el-table>
    <router-view/>
  </div>
</template>

<script>
import Table from "./component/table.vue"

import store from '@/vuex/store'
export default {
  name: '',
  data(){
    return{
      tableHeader:[
            {
                 prop:"id",
                label:"ID",                
                type:'input',
                width:"180",
                isChange:true
            },
            {
                 prop:"landlord_id",
                label:"房东id",              
                type:'select',
                width:"",
                option:[]
            },
            {
                 prop:"houseNo",
                label:"房子代码",                              
                type:'input',
            }
            ,
            {
                 prop:"houseName",
                label:"房子名称",                              
                type:'input',
            },
            {
                 prop:"houseAdress",
                label:"地址",              
                type:'input',
            },
            {
                 prop:"to_manager",
                label:"房间经理",              
                type:'select',
                option:[]
            },
            {
                 prop:"latitude",
                label:"纬度",              
                type:'button',
            },
            {
                 prop:"longitude",
                label:"经度",              
                type:'button',
            }
        ],
         msg:'',
         operationInfo:{
           "updateUrl":"houseController/update.do",
           "addUrl":"houseController/save.do",
           "getPage":"houseController/getWithPaging.do",
           "deleteUrl":"houseController/delete.do",
           "searchName":"房子名称",
           "PageData":{
              'searchText':'',
                'offset':'0',
                'order':'id',
                'sort':'asc'
            }
         }
    }
  },
  store,
  computed: {
  
  },
  components:{
        Table,
　　},
  methods:{

  },
  　mounted(){
      
      //var $store1=$store;
      this.$http.post("http://127.0.0.1:8080/housingrental/"+this.operationInfo.getPage,
      this.operationInfo.PageData,{
				emulateJSON : true
			}).then(res=>{
        //console.log($store)
        this.$store.dispatch('change',res.data)
         var array=new Array();
        var data=this.$store.state.tableModule.tableData.rows;
        for(var d of data){
          if(d.level=='1'){
            var object={
              name:d.menu_name,
              value:d.id
            }
            array.push(object);
          }
        } 
        this.tableHeader[3].option=array;
				//console.log("*****"+this.$store)
			},error=>{
				this.msg=error;
      });
      
      this.getData('landlordController/getWithPaging.do',
      null,res=>{
        let data=res.data.rows;
        for(let item of data){
          let o={};
          o.name=item.name;
          o.value=item.id;
          this.tableHeader[1].option.push(o);
        }        
      })
      this.getData('managerController/getall.do',
      null,res=>{
        let data=res.data.rows;
        for(let item of data){
          let o={};
          o.name=item.managerName;
          o.value=item.id;
          this.tableHeader[6].option.push(o);
        }        
      })
		}
}
</script>

<style>
</style>
