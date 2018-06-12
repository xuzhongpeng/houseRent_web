<template>
    <div>
        <myHeader title='留言' :is_back="true"></myHeader>
        <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入内容"
        v-model="textarea">
        </el-input>
         <el-button class="button" type="primary" @click="leftMessage">发布留言</el-button>

         <div class="myMessage">
             <ul class='ul'>
                 <li class="nav_title">我的留言</li>
                  <li class="messageArea" v-if="!is_much&&message.length!=1" ><message :message="message[0]"></message></li>
                   <li class="messageArea"  v-if="is_much" v-for="(item,index) in message" :key='index'><message :message="item"></message></li>
                     <li class="lookMuch" v-if="!is_much" @click="lookMuch(true)">查看更多</li>
                     <li class="lookMuch" v-if="is_much" @click="lookMuch(false)">收起</li>
             </ul>
         </div>
    </div>    
</template>

<script>
import myHeader from '../../components/navHeader'
import message from './components/message'
export default {
  data() {
    return {
      textarea: '',
      tenantID:JSON.parse(window.localStorage.getItem("tenantInfo")).id,
      message:[],
      is_much:false
    }
  },
  components:{
       myHeader,
       message
  },
  methods:{
      leftMessage(){
          this.getData("touists_messageController/save.do",{
              tourists_id:this.tenantID,
              content:this.textarea
          },res=>{
              if(res.data=="1"){
                  this.$message("留言成功！");
              }
          })
      },
       lookMuch(val){
            this.is_much=val;
        }
  },
  mounted(){
      this.getData("touists_messageController/getByID.do",{
          id:this.tenantID
      },res=>{
          this.message=res.data.result;
      })
  }

}
</script>

<style lang="scss" scoped>
.button{
    margin-top:2rem;
}
.myMessage{
    margin-top:20px;
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
        box-sizing: border-box;
    }
    .messageArea{
        padding:4px 20px;
        width: 90%;
    }
    .lookMuch{
        height: 2.5rem;
        text-align: center;
        display:flex;/*Flex布局*/
        display: -webkit-flex; /* Safari */
        align-items:center;
        justify-content:center;
        border-bottom:0.1rem solid rgb(228, 228, 228);
        color:rgb(74, 138, 250);
    }
}
</style>
