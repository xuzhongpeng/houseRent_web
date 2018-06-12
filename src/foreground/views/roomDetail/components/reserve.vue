<template>
  <div>
    <el-card class="box-card">
        <el-form :label-position="labelPosition" label-width="80px" 
        :model="formLabelAlign" ref="ruleForm2" status-icon :rules="rules2">
            
            <el-form-item label="姓名" prop="tenantName">
                <el-input v-model="formLabelAlign.tenantName"></el-input>
            </el-form-item>
            <el-form-item label="电话"  prop="phonenumber">
                <el-input v-model="formLabelAlign.phonenumber"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="formLabelAlign.email"></el-input>
            </el-form-item>
            <el-form-item label="住址">
                <el-input v-model="formLabelAlign.adress"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input  type="password" v-model="formLabelAlign.password" auto-complete="off"></el-input>
            </el-form-item> 
            <el-form-item label="确认密码" prop="pass">
                <el-input  type="password" v-model="formLabelAlign.pass" auto-complete="off"></el-input>
            </el-form-item>
             <el-form-item label="押金" >
                <el-input  type="text" v-model="formLabelAlign.deposit" :disabled="true"></el-input>
            </el-form-item> 
            <el-form-item label="缴费类型" prop="rentingTimeType">
                 <el-select v-model="formLabelAlign.rentingTimeType" placeholder=""   style="width:100%">
                  <el-option label="押一付一" value="押一付一" width="100%" >押一付一</el-option>
                  <el-option label="押一付三" value="押一付三" width="100%" >押一付三</el-option>
                  <el-option label="押一付五" value="押一付五" width="100%" >押一付五</el-option>
                </el-select>
                
            </el-form-item>
            <el-form-item>
                
                <el-button type="primary" @click="onSubmit('ruleForm2')">立即预定</el-button>
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
          room_id: '',
          tenantName: '',
          phonenumber: '',
          email:'',
          adress: '',
          password:'',
          deposit:'1000',
          rentingTimeType:''
        },
        rules2: {
          tenantName: [
            { required: true, message: '请输入姓名', trigger: 'change' }
          ],
          password: [
            { required: true,validator: validatePass, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass2, trigger: 'change' }
          ], 
          phonenumber: [
            { required: true, message: '请输入电话', trigger: 'change' }
          ], 
          deposit: [
            { required: true, message: '请输入押金', trigger: 'change' }
          ],

        }
      }
    },
    methods:{
        onSubmit(formName){
            let data=this.formLabelAlign;
             this.$refs[formName].validate((valid) => {
          if (valid) {
            this.getData("tenantController/insertTenant.do",
               data
            ,res=>{
                if(res.data==2){
                    this.$message("预定成功，请等待回复");
                }
                else{
                    this.$message("预定失败");
                }
            })
          } else {
            this.$message('error submit!!');
            return false;
          }
        })
        }
    },
    mounted(){
        this.formLabelAlign.room_id=this.$route.params.roomid;
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
