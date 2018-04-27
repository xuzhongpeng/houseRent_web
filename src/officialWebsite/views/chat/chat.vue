<template>
  <div>    
    <myHeader :title='title'></myHeader>
    <div class='content' :style='style1'>
      <!-- <ChatContent :time='time' :headSrc='headSrc' :message='message'></ChatContent> -->
      <component :is="item.component" :time='time' :message="item.text" v-for="item in items" :key="uuid"></component>
    </div>
    <div class='sentMessage'>
      <el-input
        placeholder="请输入内容"
        v-model="input10"
        clearable>
        <template slot="append"><el-button type="primary" @click='sentMessages'>发送</el-button></template>
      </el-input>      
    </div>
  </div>
</template>
<script>
import myHeader from '../header/header.vue'
import ChatContent from './chatConponents/chatContent'
import IChatContent from './chatConponents/iChatContent'
import uuid from 'uuid/v1'
  export default {
    name: 'chat',
    data() {
     return {
       input10:'',
       style1:{
          height:'500px'//this.getgetClientHeight+'px',
        },        
        title:'',
        time:'2018-3-27 22:06',
        headSrc:'../../assets/headImg.jpg',
        message:'你快递到了',
        items: [],
        uuid:uuid()
      };
    },
    components:{
        myHeader,
        ChatContent,
        IChatContent
    },
    computed:{
        
    },
    methods: {
      sentMessages:function(){
        this.items.push({
         component: IChatContent,
         text: this.input10
       })
       var message=this.input10;
       this.input10='';
        this.$http.get("http://localhost:3000/sentmessage",{
          params:{
             contentID:this.$route.params.contentID,
             Is_contentID:this.$route.params.Is_contentID,
             content:message
          }         
        }).then(res=>{
          this.input10='';
        })
      }
    }, 
    mounted(){
      this.style1.height=`${document.documentElement.clientHeight-100}px`;      
      var source = new EventSource("http://localhost:3000/getmessage?contentID="+this.$route.params.contentID+"&Is_contentID="+this.$route.params.Is_contentID);
      var self=this;
      source.onmessage = function(event){
          JSON.parse(event.data).forEach(element => {
            self.items.push({
            component: ChatContent,
            text: element.content
          })
          self.$http.get("http://localhost:3000/update",{
            params:{
              contentID:self.$route.params.contentID,
              Is_contentID:self.$route.params.Is_contentID
            }         
          }).then(res=>{
          })
        });
        
      }
     if(this.$route.params.Is_contentID==1){
       this.title="与孙艳聊天中";
     }
     else{
       this.title="与许中鹏聊天中";
     }
    }
  }
</script>
<style scoped lang="scss">
.content{
  width:100%;
 
  overflow: auto;
}
.sentMessage{
  position: fixed;
  height: 45px;
  width: 100%;
  bottom: 0px;
  background-color:#efefef;
  padding-top: 5px;
}

</style>

