<template>
  <div>    
    <myHeader  :title='title' :is_back="true"></myHeader>
    <div class='content' :style='style1' ref="content">
      <!-- <ChatContent :time='time' :headSrc='headSrc' :message='message'></ChatContent> -->
      <component :is="item.component" :time='item.time' :message="item.text" :headSrc="item.headSrc" v-for="(item,index) in items" :key="index">

      </component>
    </div>
    <div class='sentMessage'>
      <el-input
        placeholder="请输入内容"
        v-model="input10"
        clearable
         @keyup.enter.native="sentMessages">
        <template slot="append"><el-button type="primary" @click='sentMessages'>发送</el-button></template>
      </el-input>      
    </div>
  </div>
</template>
<script>
import myHeader from '../../components/navHeader'
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
        headSrc:this.$host+"picture/"+JSON.parse(window.localStorage.getItem("tenantInfo")).path,
        receiverImg:"",
        message:'你快递到了',
        items: [],
        uuid:uuid(),
        source:new Function(),
        contentHeigth:""
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
        if(this.input10==''){
          this.$message("发送消息不能为空");
          return
        }
        this.items.push({
         component: IChatContent,
         text: this.input10,
         headSrc:this.headSrc,
         time:this.$format(new Date(),"yyyy-MM-dd hh:mm:ss")
       })
       
       var message=this.input10;
       this.input10='';
       let tenantID=JSON.parse(window.localStorage.getItem("tenantInfo")).id;
        this.getData("chatController/sendMessage.do",{         
             senderid:tenantID,
             receiverid:this.$route.params.receiverid,
             content:message,                 
        },res=>{
          this.input10='';
        })
      },
      changeStatus(element){
          this.items.push({
              id:element.id,
              component: ChatContent,
              time:element.sendtime,
              text: element.content,
              headSrc:this.receiverImg
          })
          this.getData("chatController/changeStatus.do",{
            chatID:element.id
          },res=>{
            let data=res.data;
            if(data!=1){
              alert("更改状态失败")
            }
          })   

      }
    }, 
    mounted(){
      this.contentHeigth=document.documentElement.clientHeight-100;
      this.style1.height=`${document.documentElement.clientHeight-100}px`;  
      let tenantID=JSON.parse(window.localStorage.getItem("tenantInfo")).id;
      let receiverid=this.$route.params.receiverid;
      if(this.$route.path.indexOf("chat")!=-1){
          console.log("**********"+this.route);          
          this.source = new EventSource(this.$host+"/housingrental/chatController/getChatContent.do?tenantID="
                      +tenantID+"&receiverid="+receiverid);
          var self=this;
          this.source.onerror=(error)=>{
            //console.log(error)
          }
          this.source.onmessage = function(event){
          
              let data=JSON.parse(event.data)             
              data.forEach(element => {
                if(self.items.length==0){
                  self.changeStatus(element);
                }
                else{
                  if(element.id!=self.items[self.items.length-1].id){
                    self.changeStatus(element);
                  }
                }
               
             /*  self.$http.get("http://localhost:3000/update",{
                params:{
                  contentID:self.$route.params.contentID,
                  Is_contentID:self.$route.params.Is_contentID
                }         
              }).then(res=>{

              })  */
            });
            
          }
      }
      this.getData("tenantController/getByID.do",{
        tenantID:receiverid
      },res=>{
        this.title="与"+res.data.tenantName+"聊天中";
        this.receiverImg=this.$host+"picture/"+res.data.path;
      })
    },updated(){
      this.$refs.content.scrollTop=this.$refs.content.offsetHeight;
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

