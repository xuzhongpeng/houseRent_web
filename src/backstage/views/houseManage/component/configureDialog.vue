<template>
  <div>
    <el-dialog
        :title="operationData.title"
        :visible.sync="is_open"
        width="30%"
        center 
        v-if="is_open">
        <el-form ref="form" :model="form" label-width="80px">
          <div v-for="(item,index) in operationData" :key="index">  
              <!-- input框 -->
              <el-form-item :label="item.label" v-if="item.type=='input'" :prop="item.label">
                <el-input v-model="form[item.prop]"  :disabled="item.isChange"></el-input>
              </el-form-item>           
              <!-- select框 -->
              <el-form-item :label="item.label" v-if="item.type=='select'"  :prop="item.label">
                <el-select v-model="form[item.prop]" placeholder="">
                  <el-option :label="option.name" :value="option.value" v-for='(option,index1) in item.option' :key='index1'>
                     <span style="float: left">{{ option.name }}</span>
                     <span style="float: right; color: #8492a6; font-size: 13px">{{ option.value }}</span>
                  </el-option>
                </el-select>
              </el-form-item>     
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="quxiao()">取 消</el-button>
            <el-button type="primary" @click="sureClick()">确 定</el-button>
        </span>
        </el-dialog>
  </div>
</template>

<script>
import store from '@/vuex/store'
export default {
  data(){
    return{
      form:{
          id:'',
          house_id:'',
          wifi:'',
          air_conditioner:'',
          fridge:'',
          wired_network:'',
          sofa:'',
          wardrobe:'',
          television:''
      },
      value:'',
      is_open:false,
      operationData:[],
      operation:''
    }
  },
  props:{
  },
  store,
  mounted(){     
     this.operationData=[
         {
             prop:'house_id',
             label:'房子ID',
             isChange:true,
             type:'input'
         },{
            prop:"wifi",
            label:"wifi",              
            type:'select',
            option:[
                {
                    value:'1',
                    name:'是'
                },{
                    value:'0',
                    name:'否'
                }
            ]
        },{
            prop:"air_conditioner",
            label:"空调",              
            type:'select',
            option:[
                {
                    value:'1',
                    name:'是'
                },{
                    value:'0',
                    name:'否'
                }
            ]
        },{
            prop:"fridge",
            label:"冰箱",              
            type:'select',
            option:[
                {
                    value:'1',
                    name:'是'
                },{
                    value:'0',
                    name:'否'
                }
            ]
        },{
            prop:"wired_network",
            label:"宽带",              
            type:'select',
            option:[
                {
                    value:'1',
                    name:'是'
                },{
                    value:'0',
                    name:'否'
                }
            ]
        },{
            prop:"sofa",
            label:"沙发",              
            type:'select',
            option:[
                {
                    value:'1',
                    name:'是'
                },{
                    value:'0',
                    name:'否'
                }
            ]
        },{
            prop:"wardrobe",
            label:"衣柜",              
            type:'select',
            option:[
                {
                    value:'1',
                    name:'是'
                },{
                    value:'0',
                    name:'否'
                }
            ]
        },{
            prop:"television",
            label:"电视",              
            type:'select',
            option:[
                {
                    value:'1',
                    name:'是'
                },{
                    value:'0',
                    name:'否'
                }
            ]
        }  
     ]
  },
  methods:{
      sureClick(){ 
          let url='';
          if(this.operation=='update'){
              url='facilitiesController/update.do';
          }
          else{
              url='facilitiesController/save.do';
          }
          this.getData(url,this.form,
            res=>{
                this.is_open=false;
                
                this.$message('保存/修改成功');            
            },error=>{
            this.$message("出错")
          })
      },       
      quxiao(){
          this.is_open=false
      }
      
  },
    props:{
    }
}
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 20px;
    color: #8c939d;
    width: 100px;
    height:100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>
