<template>
    <div>
        <myHeader title='个人信息' :is_back="true"></myHeader>
        <ul>
            <li>
                <label>姓名</label>
                <input type="text" v-model="userInfo.tenantName">            
            </li>
            <li>
                <label>密码</label>
               <input type="password" v-model="userInfo.password">            
            </li>
            <li>
                <label>地址</label>
                <span>{{userInfo.adress}}</span> 
            </li>
            <li>
                <label>电话</label>
                <input type="number" v-model="userInfo.phonenumber">   
            </li>
            <li style="height:4rem">
                <label>头像</label>
                <el-upload
                class="avatar-uploader"
                :action="$host+'housingrental/pictureController/upload.do'"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </li>
        </ul>
        <el-button  type="primary" @click="update" style="margin-top:1rem;">点击修改</el-button>
    </div>
</template>

<script>
import myHeader from '../../components/navHeader'
export default {
    components:{
        myHeader
    },
    data() {
      return {
        imageUrl: '',
        tenantID:JSON.parse(window.localStorage.getItem("tenantInfo")).id,
        userInfo:{
            id:'',
            password:'',
            tenantNo:'',
            tenantName:'',
            phonenumber:'',
            adress:'',
            headImg:''
        }
      };
    },
    methods:{
        beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        console.log(file)
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      handleAvatarSuccess(res, file) {
          console.log("a"+file)
          console.log(res)
          this.userInfo.headImg=res.id;
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      update(){
          this.getData("tenantController/update.do",this.userInfo,
          res=>{
              let data=res.data;
              if(data.result=="1"){
                  this.$message("修改成功！");
              }
          })
      }
    },
    mounted(){
        this.getData("tenantController/getByID.do",{
            tenantID:this.tenantID
        },res=>{
            let data=res.data;
            if(data){
                this.userInfo=data;
                this.imageUrl=this.$host+"picture/"+data.path;
            }
        })
    }
}
</script>

<style lang="scss" scoped>
@import '../../components/public.scss';
li{
    height:3rem;
    display: flex;
    align-items: center;
    border-bottom: 0.01rem solid rgb(236, 236, 236);
    &>:nth-child(1){
        margin-left: 2rem;
    }
    &>:nth-child(2){
        position: absolute;
        right: 3rem;
        display:flex;
        align-items: center;
        border:none;
        height: 2rem;
        width:25%;
        color:rgb(124, 124, 124);
    }
}
.go{
    position: absolute;
    right: 1rem;    
}
.goto{
    font-size: 1.2rem;
    color:rgb(151, 151, 151);    
}
.avatar{
    width:3.5rem;
    height: 3.5rem;
    border-radius: 50%;
}
</style>
