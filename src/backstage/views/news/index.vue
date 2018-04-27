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
                 prop:"title",
                label:"标题",              
                type:'input',
                width:"150"
            },
            {
                 prop:"cover_photo_id",
                label:"图片",                              
                type:'image',
                width:""
            }
            ,
            {
                 prop:"content",
                label:"内容",                              
                type:'input',
                width:"",
            },
            {
                 prop:"push_time",
                label:"发布时间",              
                type:'date',
                width:""
            },
            {
                prop:'push_user_id',
                label:'发布人id',
                type:'select',
                width:'',
                option:[]
            },
            {
                 prop:'managerName',
                 label:'发布人'
            }
        ],
         msg:'',
         operationInfo:{
            "is_createID":true,
           "updateUrl":"newsController/update.do",
           "addUrl":"newsController/save.do",
           "getPage":"newsController/getWithPaging.do",
           "deleteUrl":"newsController/delete.do",
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
				//console.log("*****"+this.$store)
			},error=>{
				this.msg=error;
			});
        this.getData('managerController/getall.do',
        null,res=>{
            let data=res.data.rows;
            for(let item of data){
            let o={};
            o.name=item.managerName;
            o.value=item.id;
            this.tableHeader[5].option.push(o);
            }       
        },error=>{
                this.$message('出错')
            })
    }

        
}
</script>

<style>
</style>
