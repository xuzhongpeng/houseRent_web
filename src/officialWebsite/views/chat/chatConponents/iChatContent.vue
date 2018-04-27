<template>
  <div id='chatContent'>    
      <span class='time'>{{time}}</span>
    <div class='contentApart'>  
        <img class='headImg' src="../../../../assets/headImg.jpg">      
        <div class='message'>{{message}}</div>
        
    </div>
  </div>
</template>
<script>
  export default {
    name: 'IChatContent',
    data() {
     return {
        
      };
    },
    props:{
        time:String,
        headSrc:String,
        message:String
    },
    
  }
</script>
<style scoped lang="scss">
#chatContent{
  margin:20px 10px;
  .time{
    font-size: 14px;
    color:rgb(189, 187, 187);
  }
  .contentApart{
    margin-top:10px;
    text-align: right;
    .headImg{
        width:35px;
        height: 35px; 
        position: relative;
    }
    .message{
        width: 80%;
        text-align: right;
        position: relative;
        top: -35px;

    }
  }

  
}
</style>

