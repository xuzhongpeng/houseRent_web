<template>
  <div id="">
    <Table :tableHeader="tableHeader" :tableData="$store.state.tableModule.tableData"  :operationInfo="operationInfo">
         <el-table-column
            fixed="right"
            label="操作"
            width="100"
            slot="button">
            <template slot-scope="scope">
                <el-button  @click="handleClick(scope.row)" type="text" size="small">{{scope.row.is_deal=='1'?"":"回复"}}</el-button>
            </template> 
            </el-table-column> 
    </Table>
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        >
        
        <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="row.reply">
        </el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="sure">确 定</el-button>
        </span>
        </el-dialog>
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
                width:"180",
                isChange:true
            },
            {
                prop:"tourists_id",
                label:"tourists_id",              
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
                 prop:"content",
                label:"内容",                              
                type:'input',
                width:"",
            },
            {
                 prop:"is_deal",
                label:"是否回复",              
                type:'input',
                width:""
            },{
                 prop:"reply",
                label:"回复内容",              
                type:'input',
                width:""
            },{
                 prop:"deal_manager",
                label:"回复人",              
                type:'input',
                width:""
            }

        ],
         msg:'',
         operationInfo:{
            "is_createID":false,
           "updateUrl":"touists_messageController/update.do",
           "addUrl":"touists_messageController/save.do",
           "getPage":"touists_messageController/getWithPaging.do",
           "deleteUrl":"touists_messageController/delete.do",
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
          this.dialogVisible=true;
         this.row=row;
          console.log(row);
          
      },
      sure(){
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
