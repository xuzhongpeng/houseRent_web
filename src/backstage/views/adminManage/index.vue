<template>
  <div id="">
    <Table :tableHeader="tableHeader" :tableData="$store.state.tableModule.tableData"  :operationInfo="operationInfo"></Table>
    </el-table-column>
  </el-table>
    <router-view/>
  </div>
</template>

<script>
import Table from "@/backstage/component/table.vue"

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
                 prop:"name",
                label:"用户名",              
                type:'input',
                width:"150"
            },
            {
                 prop:"password",
                label:"密码",                              
                type:'input',
                width:""
            }
            ,
            {
                 prop:"headImg",
                label:"头像",                              
                type:'image',
                width:"",
            },
            {
                 prop:"registration_time",
                label:"注册时间",              
                type:'date',
                width:""
            }
        ],
         msg:'',
         operationInfo:{
           "updateUrl":"administratorsController/update.do",
           "addUrl":"administratorsController/save.do",
           "getPage":"administratorsController/getWithPaging.do",
           "deleteUrl":"administratorsController/delete.do",
           "searchName":"用户名",
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
		}
}
</script>

<style>
</style>
