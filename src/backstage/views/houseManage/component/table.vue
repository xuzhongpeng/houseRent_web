<template>
 <div>
     <el-container class='main'>
        
    <el-header class="el_header">
        <el-input
            :placeholder="`请输入${this.operationInfo.searchName}查找`"
            clearable
            v-model="searchText" class="input-with-select">
        
         <el-button slot="append" icon="el-icon-search" @click="search()"></el-button></el-input>
        <el-button type="primary" icon="el-icon-search" @click="DialogClick('add')" >增加</el-button>
        <el-button type="primary" icon="el-icon-search" @click="DialogClick('update')">修改</el-button>
        <el-button type="primary" icon="el-icon-search" @click="Delete()">删除</el-button>
    </el-header>
   
    <el-main>
        <el-table
            :data="tableData.rows"
            border height=370
            style="width: 100%" class='table' @selection-change="handleSelectionChange">
            
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            
            <el-table-column v-for="(item,index) in tableHeader" :key="index"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
                v-if='!item.hidden'
                class='table_th'>
            </el-table-column>
            
           <!--  <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small" @click="DialogClick('update',scope.row)">编辑</el-button>
            </template> 
            </el-table-column> -->
        </el-table>
        <div class="block">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="tableData.total">
        </el-pagination>
  </div>
    </el-main>
    </el-container>
     <Dialog :multipleSelection="multipleSelection" :operationData="$store.state.operation.operation"   ref="dialog"></Dialog>

  
 </div>
</template>

<script>
import Dialog from "./dialog.vue"
import store from '@/vuex/store'
import uuid from 'node-uuid'
export default {
 computed:{
     operationData(){
         return this.$store.state.operation.operation;
     }
 },
 methods: {
      DialogClick(val,rows){    
        var tableOperation=this.tableOperation;
       let that=this;
        tableOperation.operationInfo=this.operationInfo;
            
            if(val=='add'){
                tableOperation.type='add';
                tableOperation.url=this.operationInfo.addUrl;
                tableOperation.title='新增';
            }else{
                if(this.multipleSelection.length!=1){
                    this.$message('请选择一条数据');
                    return;
                }
                tableOperation.type='update';
                tableOperation.url=this.operationInfo.updateUrl;
                tableOperation.title='修改';

               /*  that.getData('house_picController/getById.do',
                {
                    id:this.multipleSelection[0].id
                },res=>{
                    let data=res.data.result;
                    console.log("data:"+data)
                     tableOperation.rows[5].filelist.splice(0,tableOperation.rows[5].filelist.length);
                    for(let i=0;i<data.length;i++){
                        let o={};    
                        o.name=data[i].picturename;
                        o.url="http://localhost:8080/picture/"+data[i].path;
                        console.log(o);
                        console.log( tableOperation.rows[5])
                        tableOperation.rows[5].filelist.push(o);
                    }
                    that.$store.dispatch('changeOperation',tableOperation);
                },error=>{
                    this.$message("获取图片出错");
                })   */              
            }
             this.$store.dispatch('changeDialog',true);
              this.$store.dispatch('changeOperation',tableOperation);
             var se={};
            for(var item of this.operationData.rows){   
                console.log("属性**："+item.prop)         
                    se[item.prop]=new String();
                }   
           if(this.operationData.type=="update"){
                for(var item of this.operationData.rows){            
                    se[item.prop]=this.multipleSelection[0][item.prop];
                } 
            }
            else{
                se['id']=this.createdID();
            }
        this.$refs.dialog.form=se;   
        //console.log("******form"+se);
      },
      Delete(){
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           var data=[];
            for(var d of this.multipleSelection){
                data.push(d.id)
                console.log(d.id)
            }
            this.$http.post("http://127.0.0.1:8080/housingrental/"+this.operationInfo.deleteUrl,{ids:JSON.stringify(data)},{
                    emulateJSON : true
                }).then(res=>{
                    if(res.data.result!=0){
                        this.getData(this.operationInfo.getPage,
                        this.operationInfo.PageData,
                        (res)=>{
                            this.$store.dispatch('change',res.data)
                        },(error)=>{
                            this.$message("发生错误："+error)
                        })
                        this.$message("删除成功！");
                    }
                    else{
                        this.$message("删除失败！");
                    }
                },error=>{
                    this.$message("删除失败！"+error);
                });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
       
      },
      search(){
        this.operationInfo.PageData.searchText=this.searchText;
        this.$http.post("http://127.0.0.1:8080/housingrental/"+this.operationInfo.getPage,this.operationInfo.PageData,{
				emulateJSON : true
			}).then(res=>{
        //console.log($store)
                this.$store.dispatch('change',res.data)
                

				//console.log("*****"+this.$store)
			},error=>{
				this.msg=error;
			});
      },
      handleClick(row) {
        console.log(row);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
         this.operationInfo.PageData.offset=val-1;
        this.$http.post("http://127.0.0.1:8080/housingrental/"+this.operationInfo.getPage,this.operationInfo.PageData,{
				emulateJSON : true
			}).then(res=>{
        //console.log($store)
				this.$store.dispatch('change',res.data)
				//console.log("*****"+this.$store)
			},error=>{
				this.msg=error;
			});
        console.log(`当前页: ${val}`);
      },
      getPage(val){
          	
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(val)
      }
    },
    components:{
        Dialog
　　},
    store,
    data() {
      return {
        searchText:'',
        currentPage1: 1,//当前页面   
        centerDialogVisible:false,
        multipleSelection:[],
        tableOperation:{}
      }
    },
    props:{
        tableHeader:Array,
        tableData:Object,
        operationInfo:Object
    },
    mounted(){
        this.tableOperation={
                type:'',
                url:'',
                title:'',
                rows:this.tableHeader
            }
          this.$store.dispatch('changeOperation',this.tableOperation);  
    }
  
}
</script>

<style>
.main{
    min-width: 750px;
}
.el_header{
    padding-top:20px;
}
.table{
    font-size: 12px;  
    height:370px; 
}
.table_th{
    height:30px;
}
.input-with-select{
    width:300px;
}
</style>
