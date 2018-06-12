<template>
  <div>
    <el-dialog
        :title="operationData.title"
        :visible.sync="$store.state.dialog.centerDialogVisible"
        width="50%"
        center 
        v-if="$store.state.dialog.centerDialogVisible">
        <el-form ref="form" :model="form" label-width="80px">
          <div v-for="(item,index) in operationData.rows" :key="index">
              <!-- input框 -->
              <el-form-item :label="item.label" v-if="item.type=='input'" :prop="item.label">
                <el-input v-model="form[item.prop]"  :disabled="item.isChange"></el-input>
              </el-form-item>
              <!-- select框 -->
              <el-form-item :label="item.label" v-if="item.type=='select'"  :prop="item.label">
                <el-select v-model="form[item.prop]" placeholder="" filterable >
                  <el-option :label="option.name" :value="option.value" v-for='(option,index1) in item.option' :key='index1'>
                     <span style="float: left">{{ option.name }}</span>
                     <span style="float: right; color: #8492a6; font-size: 13px">{{ option.value }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
              <!-- 头像上传 -->
              <el-form-item :label="item.label" v-if="item.type=='picture'"  :prop="item.label">
                <el-upload
                  class="avatar-uploader"
                  :action="$host+'housingrental/house_picController/upload.do'"
                  list-type="picture-card"
                 :data="{'house_id':form.id}"
                  :on-success="handleAvatarSuccess"
                   :file-list="item.filelist"
                   :on-remove="handleRemove"
                  :before-upload="beforeAvatarUpload">
                   <i class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>
               <!--  房间图片上传 -->
              <!-- <el-form-item  :label="item.label" v-if="item.type=='picture1'"  :prop="item.label">
                <el-upload
                  class="upload-demo"
                  action="$host+'/housingrental/house_picController/upload.do'"
                  :data="{'house_id':form.id}"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="item.filelist"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-form-item> -->
              <!-- date类型 -->
              <el-form-item :label="item.label" v-if="item.type=='date'"  :prop="item.label">
                <el-date-picker
                  v-model="form[item.prop]"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy年MM月dd日"
                  value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
              </el-form-item>
              

          </div>
          <el-form-item label="经纬度">
                  <el-button round @click="checkMap">选择</el-button>

                  <span v-if="form.latitude&&form.latitude!=''">纬度：{{form.latitude}}</span>
                  <span v-if="form.longitude&&form.longitude!=''">纬度：{{form.longitude}}</span>
          </el-form-item>
          <el-form-item label="房屋配置">
                  <el-button round @click="configure">选择</el-button>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="quxiao()">取 消</el-button>
            <el-button type="primary" @click="sureClick()">确 定</el-button>
        </span>
        </el-dialog>


        <MapDialog name='a' ref='dialog' :form='form'></MapDialog>
        <configureDialog ref='configDialog' ></configureDialog>
  </div>
</template>

<script>
import store from '@/vuex/store'
import MapDialog from './map.vue'
import configureDialog from './configureDialog.vue'
export default {
  data(){
    return{
      form:{
        latitude:String,
        longitude:String
      },
      value:'',
      imageUrl:'',
      mapDialog:false
    }
  },
  props:{
  },
  store,
  computed: {
    image(){
      let url=null;
      if(this.operationData.type=='update'){
        for(let item of this.operationData.rows){
            console.log(item)
              if(item.type=="image"){
                url=$host+'picture/'+this.form[item.prop];
              }
              
          }
        return this.imageUrl?this.imageUrl:url;
      }
      return this.imageUrl;
    }
  },
  components:{
    MapDialog,
    configureDialog
  },
  methods:{
      sureClick(){  
          this.$store.dispatch('changeDialog',false);
           this.imageUrl='';
          //this.operationData.rows[5].filelist.splice(0,this.operationData.rows[5].filelist.length);
          this.getData(this.operationData.url,this.form,
          res=>{
            this.$message('保存/修改成功');
            this.getData(this.operationData.operationInfo.getPage,
            this.operationData.operationInfo.PageData,
            (res)=>{
              this.$store.dispatch('change',res.data)
            },(error)=>{
              this.$message("发生错误："+error)
            })
          },error=>{
            this.msg=error;
          })
      }, 
      handleAvatarSuccess(res, file) {
        console.log(res,file);
        for(let item of this.operationData.rows){
          console.log(item)
            if(item.type=="image"){
              this.form[item.prop]=res.id;
            }
            
        }
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 10;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      quxiao(){
        this.$store.dispatch('changeDialog',false);
        this.imageUrl='';
        //this.operationData.rows[5].filelist.splice(0,this.operationData.rows[5].filelist.length);
      },
      handleRemove(file, fileList) {
        console.log("file "+JSON.stringify(file), fileList);
        let data=[];
        let houPicID=file.response.id;
        data.push(houPicID);
        this.getData('house_picController/delete.do',
        {ids:JSON.stringify(data)}
        ,(res)=>{
          if(res.data.result!='0'){
              this.$message("删除成功");
          }
          else{
              this.$message("删除失败");
          }          
        },(res)=>{
            this.$message("网络或者服务器出现错误，错误码"+res);
        })
      },
      handlePreview(file) {
        console.log("file  "+file);
      },
      checkMap(){
        this.$refs.dialog.mapDialog=!this.$refs.dialog.mapDialog;
        if(this.$refs.dialog.mapDialog==true){
           // this.$refs.dialog.init();
        }
      },
      configure(){
        this.$refs.configDialog.form['house_id']=this.form.id;        
        this.$refs.configDialog.operation=this.operationData.type;
        this.$refs.configDialog.is_open=true;
      }
      
  },
  beforeMount(){
      
    },
    props:{
      multipleSelection:Array,
      operationData:Object
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
