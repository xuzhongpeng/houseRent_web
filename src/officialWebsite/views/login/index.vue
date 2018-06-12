<template>
    <div class="login" v-bind:style="styleHeight">
        <div class="title">老树家园租客登录</div>
        <el-form :model="login" :rules="rules" ref="ruleForm" class='loginForm'>
             <el-form-item prop="tenantNo">
                <el-input class="input" v-model="login.tenantNo" placeholder="请账号或电话号码"></el-input>
             </el-form-item>
             <el-form-item  prop="password">
                <el-input class="pas" type="password" v-model="login.password" placeholder="请输入密码"></el-input>
             </el-form-item>
            <div><el-button class="button" type="primary" @click="loginOk('ruleForm')">登录</el-button></div>
        </el-form>
    </div>
</template>

<script>
export default {
    data(){
        return {
            styleHeight:{
                height: window.screen.availHeight +"px",
            },
            login:{
                tenantNo:'',
                password:''
            },
            rules:{
                tenantNo: [
                    { required: true, message: '请输入账号', trigger: 'change' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'change' }
                ],
            }
        }
    },
    methods:{
        loginOk(formName){
            this.$refs[formName].validate((valid) => {
                if (!valid) {
                    console.log('error submit!!');
                    return false;
                } 
                this.getData("tenantController/login.do",this.login,
                res=>{
                    let data=res.data;
                    if(data.type=="success"){
                        this.$message("登录成功");
                        localStorage.setItem("tenantInfo",JSON.stringify(data.result));
                        this.$router.push("/officialWebsite/home");
                    }
                    else{
                        this.$message("登录失败，"+data.result);
                    }
                },error=>{
                    alert(JSON.stringify(error))
                })
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.login{
    width:100%;
    background-color: rgb(221, 217, 255);
    margin:0;
    
    padding-top:9rem;
}
.title{
    font-size:1.5rem;
    font-family:YouYuan;
    color:#ffffff;
}
.input,.pas{   
    width:70%;
    input{
        height: 4rem;
    }
}
.input{
    margin-top:2rem;
}
.pas{
    margin-top:2rem;
}
.button{
    margin-top:2rem;
    width:70%;
}
.el-form-item{
    margin-bottom:0px;
}
</style>
<style lang="scss">
.loginForm .el-form-item__content{
    margin:0 !important;
    .el-form-item__error{
        left:57px;
    }
}
</style>