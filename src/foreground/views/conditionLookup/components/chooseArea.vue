<template>
  <div >
      <ul>
          <li class="area">
            <span class="title">区域：</span>
            <div ref="quyu">
                <span class="active">不限</span>
                <span>南岸区 </span>
                <span>渝北区 </span>
                <span>大渡口区 </span>
                <span>沙坪坝区 </span>
                <span>江北区 </span>
                <span>九龙坡区 </span>
                <span>渝中区 </span>
            </div>
          </li>
           <li>
            <span class="title">租金：</span>
            <div ref="zujin">
                <span class="active">不限</span>
                <span><i>500</i>以下 </span>
                <span><i>500-700</i>元 </span>
                <span><i>700-900</i>元 </span>
                <span><i>900-1100</i>元 </span>
                <span><i>1100-1300</i>元 </span>
                <span><i>1300-1500</i>元 </span>
                <span><i>1500</i>以上 </span>
            </div>
          </li>
           <li>
            <span class="title">类型</span>
            <div ref="leixing">
                <span class="active">不限</span>
                <span>一室一厅</span>
                <span>二室一厅</span>
                <span>三室一厅</span>
                <span>三室二厅</span>
                <span>四室一厅</span>
                <span>四室二厅</span>
            </div>
          </li>
           <li>
            <span class="title">面积</span>
            <div ref="mianji" id="mianji">
                <span class="active">不限</span>
                <span><i>8</i>m<sup>2</sup>以下</span>
                <span><i>8-10</i>m<sup>2</sup></span>
                <span><i>10-15</i>m<sup>2</sup></span>
                <span><i>15-20</i>m<sup>2</sup></span>
                <span><i>20-25</i>m<sup>2</sup></span>
                <span><i>25</i>m<sup>2</sup>以上</span>
            </div>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    mounted(){
        const self=this;
        this.$refs.quyu.addEventListener("click",function(ev){            
           self.clickBind(this,ev).then((str=>{               
               self.$emit("chooseClick","quyu",str.innerHTML)
           }));
        })
        this.$refs.zujin.addEventListener("click",function(ev){            
           self.clickBind(this,ev).then((str=>{
               if(str.getElementsByTagName('i').length!=0)
               str=str.getElementsByTagName('i')[0]
               self.$emit("chooseClick","zujin",str.innerHTML)
           }));
        })
        this.$refs.leixing.addEventListener("click",function(ev){            
           self.clickBind(this,ev).then((str=>{
               self.$emit("chooseClick","leixing",str.innerHTML)
           }));
        })
        this.$refs.mianji.addEventListener("click",function(ev){            
           self.clickBind(this,ev).then((str=>{
               if(str.getElementsByTagName('i').length!=0)
                 str=str.getElementsByTagName('i')[0]
               self.$emit("chooseClick","mianji",str.innerHTML)
           }));
        })
    },
    methods:{
        parseDom(arg) { 
        　　 var objE = document.createElement("div"); 
        　　 objE.innerHTML = arg; 
        　　 return objE.childNodes[0]; 
        },
        clickBind(fn,ev){            
            var ev = ev || window.event;
    　　　　var target = ev.target || ev.srcElement;
            let spanDom=fn.getElementsByTagName('span');
            for(let span of spanDom){
                let a=span.getAttribute("class");
                if(a){
                    if(a.indexOf("active")!=-1){
                        a=a.replace(/active/,"")
                        span.setAttribute("class",a)
                    }     
                }           
            }
            let nodeName=target.nodeName.toLowerCase();
            return new Promise((resolve, reject)=>{
        　　　　if(nodeName== 'span'||nodeName=="i"||nodeName=="sup"){
                    let thisSpan=target;
                    if(nodeName=="i"||nodeName=="sup"){
                        thisSpan=target.parentElement;
                    }
                    thisSpan.setAttribute("class","active");                 
                    resolve(thisSpan);                        　　　　　　　  
        　　　　}else{
                    reject("点击出错")
                }
            })  
        }
    }
}
</script>

<style lang="scss" scoped>
ul{
    width:100%;
    border:1px solid #ccc;
    border-radius:3px;
    text-align: left;
    list-style-type: none;
    padding: 10px;
    box-sizing: border-box;
    font-size:14px;
    li{
        height: 40px;
        border-bottom: dotted 1px #ccc;
        line-height: 40px;
        #mianji{
            span{
                line-height: 23px;
            }
        }
        div{
            display: inline-block;
            .active{
                background-color: #2a2c46;
                color:#fff;
            }
            span{
                display: inline-block;
                height: 30px;
                width:100px;
                border-radius: 3px;
                text-align: center;
                line-height: 30px;
                cursor: pointer;
                &:hover{
                    background-color: #2a2c46;
                    color:#fff;
                }
                sup{
                    font-size: 8px;
                }
            }
        }
        
    }
    .title{
        width:50px;
        display: inline-block;
        font-weight: 600;
    }
}
</style>
