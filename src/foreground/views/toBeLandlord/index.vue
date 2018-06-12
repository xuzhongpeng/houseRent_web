<template>
  <div>
    <el-card class="box-card">
        <el-form :label-position="labelPosition" label-width="80px" 
        :model="formLabelAlign" ref="ruleForm2" status-icon :rules="rules2">
            <el-form-item label="账号名" prop="landlordNo">
                <el-input v-model="formLabelAlign.landlordNo"></el-input>
            </el-form-item>
            <el-form-item label="名称" prop="name">
                <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="formLabelAlign.phonenumber"></el-input>
            </el-form-item>
            <el-form-item label="住址">
                <el-input v-model="formLabelAlign.address"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input  type="password" v-model="formLabelAlign.password" auto-complete="off"></el-input>
            </el-form-item> 
            <el-form-item label="确认密码" prop="pass">
                <el-input  type="password" v-model="formLabelAlign.pass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('ruleForm2')">立即申请</el-button>
            </el-form-item>
        </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
     data() {
         var validatePass = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入密码'));
            } else {
            if (this.formLabelAlign.password !== '') {
                this.$refs.ruleForm2.validateField('pass');
            }
            callback();
            }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formLabelAlign.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        labelPosition: 'right',
        formLabelAlign: {
          landlordNo: '',
          name: '',
          phonenumber: '',
          address: '',
          password:'',
          is_used:0
        },
        rules2: {
          landlordNo: [
            { required: true, message: '请输入登录账号', trigger: 'change' }
          ],
          name: [
            { required: true, message: '请输入用户名', trigger: 'change' }
          ],
          password: [
            { required: true,validator: validatePass, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass2, trigger: 'change' }
          ]
        }
      }
    },
    methods:{
        onSubmit(formName){
            let data=this.formLabelAlign;
             this.$refs[formName].validate((valid) => {
          if (valid) {
            this.getData("landlordController/save.do",
               data
            ,res=>{
                if(res.data!=0){
                    this.$message("申请成功");
                }
                else{
                    this.$message("申请失败");
                }
            })
          } else {
            this.$message('error submit!!');
            return false;
          }
        })
        }
    }
}
</script>

<style lang="scss" scoped>
.box-card{
    width:700px;
    margin:0 auto;
    margin-top:40px;
}
</style>
