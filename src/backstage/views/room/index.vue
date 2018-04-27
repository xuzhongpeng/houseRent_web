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
                isChange:true,
                createdID:true
            },
            {
                 prop:"roomNo",
                label:"房间号",              
                type:'input',
                width:"150"
            },
            {
                 prop:"to_houseid",
                label:"房子id",                              
                type:'select',
                hidden:true,
                option:[]
            }
            ,
            {
                 prop:"houseName",
                label:"房子名称",  
                width:"",
            },
            {
                 prop:"to_tenant",
                label:"租客id",              
                type:'select',
                hidden:true,
                option:[]
            },{
                 prop:"tenantName",
                label:"租客名称", 
                width:""
            },{
                 prop:"rent",
                label:"租金",              
                type:'input',
                width:""
            },{
                 prop:"size",
                label:"大小",              
                type:'input',
                width:""
            },{
                 prop:"status",
                label:"状态",              
                type:'select',
                width:"",
                option:[
                    {
                        name:'已租',
                        value:'1'
                    },
                    {
                        name:'未租',
                        value:'0'
                    }
                ]
            },{
                 prop:"house_type",
                label:"房屋类型",              
                type:'input',
                width:""
            },
            {
                prop:"has_WC",
                label:"厕所",              
                type:'select',
                width:"",
                option:[
                    {
                        name:'有',
                        value:'有'
                    },
                    {
                        name:'无',
                        value:'无'
                    }
                ]                
            },
            {
                 prop:"roomImg",
                label:"房间图片",              
                type:'picture',
                hidden:true,
                filelist:[
                    /* {
                        name:'20180412153855475.jpg',
                        url:'http://localhost:8080/picture/20180413145657955.jpg'
                    } */
                ]
            },
            
        ],
         msg:'',
         operationInfo:{
           "updateUrl":"roomController/update.do",
           "addUrl":"roomController/save.do",
           "getPage":"roomController/getWithPaging.do",
           "deleteUrl":"roomController/delete.do",
           "searchName":"房间账号",
           "is_createID":true,
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
			},error=>{
				this.msg=error;
            });
           
           this.getData('houseController/getall.do',
            null,res=>{
                let data=res.data.rows;
                for(let item of data){
                let o={};
                o.name=item.houseName;
                o.value=item.id;
                this.tableHeader[2].option.push(o);
                }        
            })

            
           this.getData('tenantController/getall.do',
            null,res=>{
                let data=res.data.rows;
                for(let item of data){
                let o={};
                o.name=item.tenantName;
                o.value=item.id;
                this.tableHeader[4].option.push(o);
                }        
            })
		}
}
</script>

<style>
</style>
