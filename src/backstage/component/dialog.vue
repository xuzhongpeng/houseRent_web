<template>
  <div>
    <el-dialog
        :title="operationData.title"
        :visible.sync="$store.state.dialog.centerDialogVisible"
        width="60%"
        center 
        v-if="$store.state.dialog.centerDialogVisible">
        <el-form ref="form" :model="form" label-width="80px">
          <div v-for="(item,index) in operationData.rows" :key="index">
              <!-- input框 -->
              <el-form-item :label="item.label" v-if="item.type=='input'" :prop="item.label">
                <el-input v-model="form[item.prop]"  :disabled="item.isChange"></el-input>
              </el-form-item>
              <!-- select框 -->
              <el-form-item :label="item.label" v-if="item.type=='select'"   :prop="item.label">
                <el-select v-model="form[item.prop]" placeholder="">
                  <el-option :label="option.name" :value="option.value" width="100%" v-for='(option,index1) in item.option' :key='index1'>
                     <span style="float: left" v-if="option.name||option.name!=''">{{ option.name }}</span>
                     <span style="float: right; color: #8492a6; font-size: 13px"  v-if="option.value||option.value!=''">{{ option.value }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
              <!-- 头像上传 -->
              <el-form-item :label="item.label" v-if="item.type=='image'"  :prop="item.label">
                <el-upload
                  class="avatar-uploader"
                  :action="$host+'housingrental/pictureController/upload.do'"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="image" :src="imageUrl?imageUrl:image" class="avatar"><!-- v-if="imageUrl" -->
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
               <!--  房间图片上传 -->
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
      form:{},
      value:'',
      imageUrl:''
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
                url=this.form[item.prop];
              }              
          }
        
        if(url!=null) {
          this.getData("pictureController/getPicByid.do",{
            id:url
          },res=>{
              if(res.data!=null){
                 this.imageUrl=this.$host+'picture/'+res.data.path;
              }
          }) 
        } 
        return url; 
      }     
      return this.imageUrl;
    }
  },
  methods:{
      sureClick(){  
          this.$store.dispatch('changeDialog',false);
           this.imageUrl='';
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
  .el-select{
    width:100%;
  }
</style>
