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
                label:"姓名",              
                type:'input',
                width:""
            },
            {
                 prop:"email",
                label:"email",                              
                type:'input',
            }
            ,
            {
                 prop:"phonenumber",
                label:"手机号码",                              
                type:'input',
            },
            {
                 prop:"adress",
                label:"地址",              
                type:'input',
            },
            {
                 prop:"is_deal",
                label:"是否处理",              
                type:'input',
            }
        ],
         msg:'',
         operationInfo:{
           "updateUrl":"touristsController/update.do",
           "addUrl":"touristsController/save.do",
           "getPage":"touristsController/getWithPaging.do",
           "deleteUrl":"touristsController/delete.do",
           "searchName":"姓名",
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
      this.$http.post(this.$host+"housingrental/"+this.operationInfo.getPage,
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
