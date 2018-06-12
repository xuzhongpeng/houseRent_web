<template>
  <div class="footer">    
      <footer class="iconfont footer">
        <ul @click="check" ref="ul">
          <li class="is_check"><span class='icon-1'></span><span class="font">首页</span></li>
          <li><span class='icon-pengyou'></span><span class="font">用电</span></li>
          <li><span class='icon-xiaoxi'></span><span class="font">聊天</span></li>
          <li><span class='icon-wode'></span><span class="font">我</span></li>
          <li style="display:none">{{change}}</li>
        </ul>
      </footer>
  </div>
</template>
<script>

  export default {
    name: 'navFooter',
    data() {
     return {
      };
    },
    props:{
      is_used:{
        default:0,
        type:Number
      }
    },
    methods:{
        check(e){
            let target=e.target;
            let lis=this.$refs.ul.getElementsByTagName("li");
            let thisLi=target;
            if(target.nodeName.toLowerCase()=="span"){
               thisLi=target.parentElement;
            }
            for(let i=0;i<lis.length;i++){
                lis[i].setAttribute("class","");
                if(lis[i]==thisLi){
                    this.$emit("changePage",i);
                }
            }
            if(thisLi.nodeName.toLowerCase()=="li"){
                thisLi.setAttribute("class","is_check");                
            }
        }
    },
    computed:{
        change(){  
          const is_used = this.is_used;
          this.$nextTick(() => {      
            let lis=this.$refs.ul.getElementsByTagName("li");
            for(let i=0;i<lis.length;i++){
                lis[i].setAttribute("class","");
                if(i==this.is_used){
                    lis[i].setAttribute("class","is_check");
                }
            }
          })
          return is_used;
        },
    }
  }
</script>
<style scoped lang="scss">
.footer{
  width:100%;
  height: 60px;
  background-color: white;
  border-top: 1px solid #ccc;
  position: fixed;;
  bottom: 0;
  ul{
    text-align: left;
    padding: 0;    
    color:rgb(109, 109, 109);
     li{
        width:14%;
        list-style-type: none;
        display:inline-block;
        margin: 0 5%;
        text-align: center;
        .font{
          display: inline-block;
          width:100%;
        }
    } 
    .is_check{
      color:#409EFF;
    }
  }
 
}


</style>

