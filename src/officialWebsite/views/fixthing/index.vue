<template>
    <div>
        <myHeader title='报修' :is_back="true"></myHeader>
        <ul>
            <li>
                <label>修理类型</label>
                 <el-select v-model="fix.repairThing" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
               
            </li>
            <li>
                <label>描述</label>
                <input type="text" v-model="fix.repairExplain">  
            </li>
            <li class="pic">
                <label>上传图片</label>
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
         <el-button class="botton"  type="primary" @click="fixto">确认</el-button>
    </div>
</template>

<script>
import myHeader from '../../components/navHeader'
export default {
    components:{
        myHeader
    },
    data(){
        return{
            imageUrl:'',
            fix:{
                repairExplain:'',
                repairThing:'',
                tenantID:JSON.parse(window.localStorage.getItem("tenantInfo")).id,
                repairPhoto:''
            },
            options:[                
                "家具",
                "门窗",
                "家电",
                "橱柜",
                "厕所",
                "其它"
            ]
        }
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
          this.fix.repairPhoto=res.id;
         this.imageUrl = URL.createObjectURL(file.raw);
      },
      fixto(){
          this.getData("repairController/save.do",this.fix,
          res=>{
              let data=res.data;
              if(data=="1"){
                  this.$message("报修成功！");
              }
          })
      }
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
        height: 2rem;
        width:40%;
        border: 1px solid #DBDBDB;
        border-radius: 0.5rem;
        outline: medium;
        color:rgb(124, 124, 124);
    }
}
.avatar-uploader{
    border:none !important;
}
.pic{
    height: 4rem;
}
.avatar{
    width:3.5rem;
    height: 3.5rem;
}
.botton{
    margin-top:1.5rem;
}
</style>
