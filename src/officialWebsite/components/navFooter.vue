<template>
  <div>    
      <footer class="iconfont footer">
        <ul>
          <li><i class='icon-1'></i>首页</li>
          <li><i class='icon-pengyou'></i>邻居</li>
          <li><i class='icon-xiaoxi'></i>聊天</li>
          <li><i class='icon-wode'></i>我</li>
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
    methods: {
     
    },
    mounted(){
      
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
     li{
       width:10px;
    list-style-type: none;
    display:inline-block;
    margin: 0 5%;
  }
  }
 
}


</style>

