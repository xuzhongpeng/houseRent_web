<template>
  <div id="">
    <Table :tableHeader="tableHeader" :tableData="$store.state.tableModule.tableData"  :operationInfo="operationInfo">
         <el-table-column
            fixed="right"
            label="操作"
            width="100"
            slot="button">
            <template slot-scope="scope">
                <el-button  @click="handleClick(scope.row)" type="text" size="small">{{scope.row.dealName==undefined?"处理":"已处理"}}</el-button>
            </template> 
            </el-table-column> 
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
        dialogVisible:false,
      tableHeader:[
            {
                 prop:"id",
                label:"ID",                
                type:'input',
                width:"150",
                isChange:true
            },
            {
                prop:"tenantID",
                label:"tenantID",              
                type:'select',
                width:"120",
                hidden:"true",
                option:[]
            },
            {
                 prop:"tenantName",
                label:"租客名称",                  
            }
            ,
            {
                 prop:"applyTime",
                label:"申请时间",                              
                type:'date',
                width:"150",
            },
            {
                 prop:"repairPhoto",
                label:"修理图片展示",              
                type:'image',
                width:"80"
            },{
                 prop:"repairThing",
                label:"报修物品",              
                type:'input',
                width:""
            },{
                 prop:"repairExplain",
                label:"描述",              
                type:'input',
                width:""
            }
            ,{
                 prop:"dealTime",
                label:"处理时间",              
                type:'input',
                width:"130"
            },{
                 prop:"dealName",
                label:"处理人",              
                type:'input',
                width:""
            }
        ],
         msg:'',
         operationInfo:{
            "is_createID":false,
           "updateUrl":"repairController/update.do",
           "addUrl":"repairController/save.do",
           "getPage":"repairController/getWithPaging.do",
           "deleteUrl":"repairController/delete.do",
           "searchName":"用户名",
           "PageData":{
              'searchText':'',
                'offset':'0',
                'order':'id',
                'sort':'asc'
            }
         },
         row:{
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
         let date=new Date;
         let dealName=JSON.parse(localStorage.getItem("userInfo")).name;
         this.row=row;
         row.dealTime=this.$format(date,"yyyy-MM-dd hh:mm:ss");
         row.dealName=dealName;
         this.getData(this.operationInfo.updateUrl,row,
         res=>{
             if(res.data.result==1){
                 this.$message("处理成功")
                 this.row.dealTime=this.$format(date,"yyyy-MM-dd hh:mm:ss");
                 this.row.dealName=dealName;
             }
         })
          
      },
      /* sure(){
          this.dialogVisible=false;
          //let data=this.row;
          this.row.deal_manager=JSON.parse(localStorage.getItem("userInfo")).name;
          this.row.is_deal=1;
          this.getData("touists_messageController/update.do",this.row,
          res=>{
              let data=res.data;
              if(data.result==1){
                  this.$message("回复成功")
              }
          })
      } */
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
