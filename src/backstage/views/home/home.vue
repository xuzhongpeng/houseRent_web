<template>
  <div id="home">
      <information v-for="(item,index) in info" :info='item' :key="index"></information>
  </div>
</template>

<script>
import information from './components/information'
export default {
  name: 'home',
  components:{
    information
  },
  data() {
      return {
        info:[
          {
            type:'tenantManage',
            title:'有租客预定房屋',
            describe:'有租客预定房屋，请查看详情'
          }
        ]
      };
    },
    mounted() {
      
      this.getData("administratorsController/getMeassage.do",
      null,res=>{
        let data=res.data;
        if(data.length>0){
          this.info=[];
          this.info=data;
        }
      })
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
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
