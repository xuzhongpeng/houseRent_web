<template>
<div>
    <ul>
        <li class='nav_title'>我的邻居</li>
        <li class='neighbor' v-for="(item,index) in tenant" :key="index" @click="chat(item.id)">
            <div class="headImg">
                <img :src="$host+'picture/'+item.path" alt="">
            </div>
            <div class="info">
                <div class='name'>
                    {{item.tenantName}}
                </div>
                <div class='phone'>
                    <span class='icon-dianhua iconfont'></span>
                    {{item.phonenumber}}
                </div>
            </div>
        </li>
    </ul>
</div>  
</template>

<script>

export default {
    components:{
    },
    data(){
        return{
            tenant:[
                {
                    id:'',
                    tenantName:'',
                    phonenumber:'',
                    path:''
                }
            ]
        }
    },
    mounted(){
        
      //  window.location.reload();
        let tenantID=JSON.parse(window.localStorage.getItem("tenantInfo")).id;
        this.getData("tenantController/getNeighbor.do",{
            tenantID:tenantID
        },res=>{
            let data=res.data;
            if(data.length>0){
                this.tenant=[];
                for(let result of data){
                    let tenant=new Object();
                    if(result.id==tenantID)
                    {
                        continue
                    }
                    tenant.id=result.id;
                    tenant.tenantName=result.tenantName;
                    tenant.phonenumber=result.phonenumber;
                    tenant.path=result.path;
                    this.tenant.push(tenant);
                }
            }
        })
    },
    methods:{
        chat(id){
            this.$router.push('other/chat/'+id);
        }
    }
}
</script>

<style lang='scss' scoped>
@import '../../components/public';
.neighbor{
    height: 4.5rem;
    
    display: flex;
    align-items:center;
    .headImg{
        width:4rem;
        height: 3rem;
        margin-left:1rem;
        img{
            border-radius: 50%;
            width: 95%;
            height: 100%;
        }
    }
    .name{
        margin-left: 0.5rem;
        width: 4rem;
    }
    .phone{
        margin-left:1rem;
        font-size: 0.6rem;
        color:rgb(138, 138, 138);
        span{
            font-size: 0.6rem;
            color: #409eff;
        }
    }
    .info{
        display: flex;
        align-items:center;
        height: 4.5rem;
        width:100%;
        border-bottom:0.01rem solid rgb(221, 221, 221);
    }
   
}
</style>
