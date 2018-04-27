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
                 prop:"room_id",
                label:"房间号",              
                type:'input',
                width:""
            },
            {
                 prop:"tenantNo",
                label:"账号",                              
                type:'input',
            }
            ,
            {
                 prop:"tenantName",
                label:"用户名",                              
                type:'input',
            },
            {
                 prop:"phonenumber",
                label:"电话",              
                type:'input',
            },
            {
                 prop:"adress",
                label:"地址",              
                type:'input',
            },
            {
                 prop:"headImg",
                label:"头像",              
                type:'image',
            },
            {
                 prop:"is_used",
                label:"是否可用",              
                type:'select',
                option:[
                    {
                        name:"是",
                        value:'1'
                    },
                    {
                        name:"否",
                        value:'0'
                    }
                ]
            }
        ],
         msg:'',
         operationInfo:{
           "updateUrl":"tenantController/update.do",
           "addUrl":"tenantController/save.do",
           "getPage":"tenantController/getWithPaging.do",
           "deleteUrl":"tenantController/delete.do",
           "searchName":"房间号",
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
