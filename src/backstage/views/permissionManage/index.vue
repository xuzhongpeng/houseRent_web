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
                width:"150",
                isChange:true
            },
            {
                 prop:"name",
                label:"权限名称",              
                type:'input',
                width:"150"
            },
            {
                 prop:"permission_number",
                label:"权限id",   
                hidden:'true',                           
                type:'select',
                width:"",
                option:[]
            },{
                prop:'menu_name',
                label:'菜单名称'
            }
            ,
            {
                 prop:"permission_id",
                label:"角色id",                              
                type:'select',
                hidden:'true',
                width:"",
                option:[]
            },
            {
                prop:'roleName',
                label:'角色名称'
            }
            ,
            {
                 prop:"describtion",
                label:"备注",                              
                type:'input',
                width:""
            }
        ],
         tableData: [],
         msg:'',
         operationInfo:{
           "updateUrl":"t_permissionController/update.do",
           "addUrl":"t_permissionController/save.do",
           "getPage":"t_permissionController/getWithPaging.do",
           "searchName":"id",
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
    count () {
      //return $store.state.tableModule.tableData
    }
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
				//console.log("*****"+this.$store)
			},error=>{
				this.msg=error;
			});

      this.getData('menuController/getall.do',
      null,res=>{
        let data=res.data.rows;
        for(let item of data){
          let o={};
          o.name=item.menu_name;
          o.value=item.id;
          this.tableHeader[2].option.push(o);
        }        
      })

      this.getData('role_permissionController/getall.do',
      null,res=>{
        let data=res.data.rows;
        for(let item of data){
          let o={};
          o.name=item.roleName;
          o.value=item.permission_id;
          this.tableHeader[4].option.push(o);
        }        
      })
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
