<template>
<div class="home">
  
    <news></news>
   <ul class='ul'>       
       <li class="nav_title">房屋动态</li>
       <li class="houseDetail">
           <div><label>房租状态：</label><span>{{object.type}}</span></div>
           <div><label>租金：</label><span>{{object.rent}}元/月</span></div>
           <div><label>已租时间：</label><span>{{object.hasTime}}个月</span></div>
           <div><label>租金最晚缴纳时间：</label><span>{{object.lastTime}}</span></div>
           <div><label>本月应缴租金：</label><span>{{object.shouldRent}}元</span></div>
           <div><label>本月实缴租金：</label><span>{{object.reallyRent}}元</span></div>
           <div style="height:2.3rem"><payBotton v-if="object.reallyRent==0&&object.reallyRent=='0'" 
           @payResult="payResult" class="button"></payBotton></div>
       </li>
       <li style="height:4rem"></li>       
   </ul>
</div>
</template>
<script>
import navHeader from '../../components/navHeader.vue'
import news from './components/news.vue'
import payBotton from './components/pay.vue'
export default {
    components:{
       navHeader,
       news,
       payBotton
    },
    data(){
        return{
            object:{
                id:'',
                type:'',
                rent:'',
                hasTime:'',
                lastTime:'',
                shouldRent:'',
                reallyRent:''
            }
        }
    },
    mounted(){
       
       let tenantInfo=JSON.parse(window.localStorage.getItem("tenantInfo"))
        //获取房屋信息
        this.getData('rentsController/getRentsByTenantid.do',{
            'id':tenantInfo.id
        },res=>{
            let data=res.data;
            console.log(res.data)
            if(data.length>0){
                let i=data.length;
                let result=data[i-1];
                if(result.propertyFee){
                    this.object.type="已缴纳";
                }else{
                    this.object.type="未缴纳";
                }
                this.object.id=result.id;
                this.object.rent=result.payMoney;
                this.object.hasTime=i;
                this.object.lastTime=result.lastTime;
                this.object.shouldRent=result.payMoney;
                this.object.reallyRent=result.propertyFee?result.propertyFee:0;
            }         
        },error=>{
            console.log(error)
        })

    },
    methods:{
        payResult(type){
            if(type=="success"){
                console.log('success')
                
                this.getData("rentsController/paySuccess.do",
                {
                    "id":this.object.id
                },
                res=>{
                    if(res.data.result=='1'){
                        this.object.reallyRent=this.object.shouldRent;
                        this.object.type="已缴纳";
                    }
                    else{
                        alert("写入数据库错误")
                    }
                    sessionStorage.setItem("order_id","");
                })
            }
            else{
                console.log("error")
            }
        }
    }
    
}
</script>

<style lang="scss" scoped>
*{
    box-sizing: border-box;
}
.ul{
    padding: 0;
    margin:0;
    text-align: left;
    li{
        list-style-type: none;
        width:100%;
        min-height: 2.5rem;
    }
    .nav_title{
        
        height: 2.5rem;
        line-height: 2.5rem;
        padding-left:1rem;
        color:rgb(124, 124, 124);
        border-bottom:0.01rem solid #ccc;
    }
    .detaill{
        overflow: hidden;
        border-bottom:0.01rem solid #ccc;
        width:100%;
        height:7rem;
        div{
            float:left;
        }
        .imgArea{
            width:20%;
            height: 7rem;
            margin-left:1rem;
            display:flex;/*Flex布局*/
            display: -webkit-flex; /* Safari */
            align-items:center;
            justify-content:center;
            img{
                width:5rem;
                height: 5rem;
            }
        }
        
        .newArea{
            padding:1rem;
            width:66%;
            height: 5rem;
            float: right;
            .news_title{
                font-size: 1.1rem;
            }
            .time{
                font-size: 0.8rem;
                color:rgb(145, 145, 145);
                margin-left:1rem;
            }
            .content{
                font-family: FangSong;
                font-size: 0.8rem;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                
            }
        }
    }
    .lookMuch{
        height: 3.5rem;
        text-align: center;
        display:flex;/*Flex布局*/
        display: -webkit-flex; /* Safari */
        align-items:center;
        justify-content:center;
        border-bottom:0.8rem solid rgb(228, 228, 228);
        color:rgb(74, 138, 250);
    }
    .houseDetail{
        //height: 11rem;
        border-bottom:0.01rem solid #ccc;
        font-size:0.8rem;
        line-height: 1.3rem;
        font-family:  Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', Arial, sans-serif;
        div{
            overflow: hidden;
            //border-bottom:0.01rem solid #ccc;
            height: 2.2rem;
            line-height: 2.4rem;
            margin-left: 1.5rem;
            label{
                display: inline-block;
                width:50%;
                text-align: left;
               
            }
            span{
                display: inline-block;
                width:40%;
                text-align: left;
            }
            .button{
                float: right;
                
            }
        }
    }
}
</style>
<style lang="scss">
.houseDetail .button{
        .el-button{
                    border-radius:0;
                }
}
</style>