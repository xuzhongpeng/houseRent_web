<template>
  <div id="menuMange">
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
  name: 'menuMange',
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
                 prop:"menu_name",
                label:"菜单名称",              
                type:'input',
                width:"150"
            },
            {
                 prop:"level",
                label:"等级",                              
                type:'input',
                width:""
            }
            ,
            {
                 prop:"parent_menu_id",
                label:"父级菜单id",                              
                type:'select',
                width:"",
                option:[]
            },
            {
                 prop:"icon",
                label:"图标",              
                type:'input',
                width:""
            },
            {
                 prop:"is_over",
                label:"是否结束",                              
                type:'select',
                width:"",
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
            },
            {
                 prop:"path",
                label:"菜单地址",              
                type:'input',
                width:""
            }
        ],
         msg:'',
         operationInfo:{
           "updateUrl":"menuController/update.do",
           "addUrl":"menuController/save.do",
           "getPage":"menuController/getMenuWithPaging.do",
           "deleteUrl":"menuController/delete.do",
           "searchName":"菜单名称",
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
#home {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
