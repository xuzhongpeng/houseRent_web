<template>
  <div class="index">
      <ul class='ul'>       
       <li class="nav_title">用电用量</li>
       <li class="elec" v-for="(item,index) in elecInfos" v-if="index<showNumber&&elecInfos[0].id!=''" :key='index'>
           <div>
               <span class='iconfont icon-icon-monitor'></span>
               <span class="time">{{item.beginTime}}</span>
               <span class='numb'>用量：{{item.electricQuantity}}度</span>
               <span class='money'>扣费：{{item.fee}}元</span>
           </div>           
       </li>
       <li v-if="elecInfos.length==0" class="elec"><div style="text-align:center">暂无数据</div></li>
       <li class="lookMuch" v-if="!is_much" @click="lookMuch(true)">查看更多</li>
       <li class="lookMuch" v-if="is_much" @click="lookMuch(false)">收起</li>
       <li class='inputMoney'>
           <el-input v-model="payFee" placeholder="请输入充值金额"></el-input>
           <payBotton test='立即充值' @payResult='payResult' :payMoney='payFee' class='pay'></payBotton>
       </li>     
       <li class='leftMoney'>我的余额：<span>{{elecInfos[0].realPayment}}元</span></li>  
   </ul>
  </div>
</template>

<script>
import payBotton from '../home/components/pay.vue'
export default {
    components:{
        payBotton
    },
    data(){
        return{
            payFee:'',
            is_much:false,
            showNumber:3,
            elecInfos:[
                {
                    id:'',
                    beginTime:'',
                    electricQuantity:'',
                    fee:'',
                    realPayment:'0',
                }   
            ],
                     
        }
    },
    methods:{
        payResult(type){            
            if(type=='success'){
                let payMoney=localStorage.getItem("payMoney");
                if(payMoney==null){
                    alert("保存出错，输入金钱为空");
                }
                //this.elecInfos[0].realPayment=parseInt(payMoney)+parseInt(this.elecInfos[0].realPayment);
                this.getData("electricfeeController/RechargeElectricityBill.do",{
                    payMoney:payMoney,
                    id:this.elecInfos[0].id
                },res=>{
                    let data=res.data;
                    sessionStorage.setItem("order_id","");
                    if(data.result==1){
                        this.$message("充值成功");
                        this.elecInfos[0].realPayment=parseInt(this.elecInfos[0].realPayment)+parseInt(payMoney);
                    }
                })
            }
            else{
                alert("支付失败")
            }
        },
        lookMuch(type){
            this.is_much=type;
            if(type)
            this.showNumber=10;
            else 
            this.showNumber=3;
        }

    },
    mounted(){
        let tenantID=JSON.parse(window.localStorage.getItem("tenantInfo")).id;
        this.getData("electricfeeController/getByTenanatID.do",{tenantID:tenantID},
        res=>{
            let data=res.data;            
            if(data.rows.length>0){        
                this.elecInfos=[];        
                for(let rows of data.rows){
                    console.log("aaaaa"+JSON.stringify(rows))
                        //let rows=data.rows;
                        let elecInfo=new Object();
                    elecInfo.id=rows.id;
                    elecInfo.beginTime= rows.beiginTime;
                    elecInfo.fee=rows.fee;
                    elecInfo.electricQuantity=rows.electricQuantity;
                    elecInfo.realPayment=rows.realPayment;
                    this.elecInfos.push(elecInfo)
                }
            }
        })
    }
}
</script>

<style lang="scss" scoped>
.index{
    padding-bottom:4rem;
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
        box-sizing: border-box;
        height: 2.5rem;
        line-height: 2.5rem;
        padding-left:1.2rem;
        color:rgb(124, 124, 124);
        border-bottom:0.01rem solid #ccc;
    }  
    .elec{
        div{
            width:100%;
            height: 3rem;
            border-bottom:0.01rem solid #ccc;
            line-height: 3rem;
            .icon-icon-monitor{
                width:2rem;                
                color: #409eff;
            }
            span{
                margin-left:5%;
            }
            
        }
    }
    .inputMoney{
        width:100%;
        margin-top:1rem;
        text-align: center;
        .pay{
           //display:inline-block;
           margin-top:2rem;
           text-align: center;    
        }
    }
    .lookMuch{
        height: 2.5rem;
        text-align: center;
        display:flex;/*Flex布局*/
        display: -webkit-flex; /* Safari */
        align-items:center;
        justify-content:center;
        border-bottom:0.8rem solid rgb(228, 228, 228);
        color:rgb(74, 138, 250);
    }
    .leftMoney{
        margin-top:2rem;
        text-align:center;
        span{
            color:rgb(255, 115, 22);
            font-size:1.5rem;
        }
    }

}
</style>
