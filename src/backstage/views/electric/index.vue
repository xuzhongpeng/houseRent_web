<template>
  <div id="">
    <Table :tableHeader="tableHeader" :tableData="$store.state.tableModule.tableData"  :operationInfo="operationInfo">
        
    </Table>
    
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
                prop:"tenantID",
                label:"tenantID",              
                type:'select',
                width:"150",
                hidden:"true",
                option:[]
            },
            {
                 prop:"tenantName",
                label:"租客名称",                  
            }
            ,
            {
                 prop:"beiginTime",
                label:"开始时间",                              
                type:'date',
                width:"",
            },
            {
                 prop:"electricQuantity",
                label:"使用电量",              
                type:'input',
                width:""
            },
            {
                prop:'fee',
                label:'使用电费',
                type:'input',
                width:'',
            },
            {
                prop:'realPayment',
                label:'剩余金额',
                 type:'input',
            }  
        ],
         msg:'',
         operationInfo:{
            "is_createID":false,
           "updateUrl":"electricfeeController/update.do",
           "addUrl":"electricfeeController/save.do",
           "getPage":"electricfeeController/getWithPaging.do",
           "deleteUrl":"electricfeeController/delete.do",
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
      handleClick(row){
          console.log(row)
      }
  },
  　mounted(){
      
      //var $store1=$store;
      this.$http.post(this.$host+"housingrental/"+this.operationInfo.getPage,
      this.operationInfo.PageData,{
				emulateJSON : true
			}).then(res=>{
        //console.log($store)
                this.$store.dispatch('change',res.data)               
				//console.log("*****"+this.$store)
			},error=>{
				this.msg=error;
            }); 
         this.getData('tenantController/getall.do',
            null,res=>{
                let data=res.data.rows;
                for(let item of data){
                let o={};
                o.name=item.tenantName;
                o.value=item.id;
                this.tableHeader[1].option.push(o);
                }        
            }) 
    }
    

        
}
</script>

<style>
</style>
