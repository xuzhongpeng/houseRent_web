<template>
    <div>
        <ul>
            <li class="me" @click="goMe">
                <div class="img"><img :src="imageUrl" alt=""></div>
                <div class="info">
                    <div class="name">{{userInfo.tenantName}}</div>
                    <div>账号：{{userInfo.tenantNo}}</div>                    
                </div>
                <div class="go"><span class="icon-qianjin iconfont goto"></span></div>                
            </li>
            <li class="item" @click="goLeft">
                <span class="icon-liuyan iconfont"></span>
                <div>给我留言</div>
                <div class="go"><span class="icon-qianjin iconfont"></span></div> 
            </li>
            <li class="item" @click="goFix">
                <span class="icon-baoxiu iconfont"></span>
                <div>报修</div>
                <div class="go"><span class="icon-qianjin iconfont"></span></div> 
            </li>
            <li class="item" @click="exit">
                <span class="icon-guanbi iconfont"></span>
                <div>退出登录</div>
                <div class="go"><span class="icon-qianjin iconfont"></span></div> 
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
      return {     
        tenantID:JSON.parse(window.localStorage.getItem("tenantInfo")).id,  
        userInfo:{
            id:'',
            password:'',
            tenantNo:'',
            tenantName:'',
            phonenumber:'',
            adress:'',
            headImg:''
        },
        imageUrl:''
      };
    },
    methods:{
        goMe(){
            this.$router.push("other/updateInfo");
        },
        goFix(){
            this.$router.push("other/fixthing");
        },
        goLeft(){
            this.$router.push("other/leftMessage");
        },
        exit(){
            this.$confirm('确认退出吗', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                   localStorage.setItem("tenantInfo","");
                   this.$router.push("other/login");
                }).catch(() => {
                         
            });
            
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
.me{
    height: 8rem;
    width:100%;
    display: flex;
     align-items:center;
     border-bottom: 1rem solid rgb(236, 236, 236);
    .img{
        margin-left: 1rem;
        width:4rem;
        height: 4rem;
        img{
            width:100%;
            height:100%;
            border-radius:50%;
        }        
    }
    .info{
        margin-left: 1rem;
        &>div:nth-child(1){
            font-size: 1.8rem;
        }
        &>div:nth-child(2){
            font-size: 1rem;
            color:rgb(112, 112, 112);
        }
    }   
}
.item{
    height: 4rem;
    display:flex;
    align-items:center;
    border-bottom: 0.01rem solid rgb(236, 236, 236);
    &>:first-child{
        display: inline-block;
        margin-left:1.5rem;
        color:rgb(0, 153, 255);
    }
    div{
        margin-left:1rem;
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

</style>
<style lang="scss">
.el-message-box{
    width:300px;
}
</style>