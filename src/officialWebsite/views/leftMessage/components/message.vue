<template>
    <div class="message">
        <img :src='$host+"/picture/"+src'/>
        <div class="eary">       
             <div>我的留言：<span  class="mymessage">{{message.content}}</span></div>
             <div v-if="message.reply">管理员回复：<span  class="mymessage">{{message.reply}}</span></div>
        </div>

    </div>
</template>

<script>
export default {
    data(){
        return{
            src:JSON.parse(window.localStorage.getItem("tenantInfo")).path,
        }
    },
    props:{
        message:{
            default:{
                content:'1',
                reply:''
            },
            type:Object
        }
    }
   
}
</script>

<style lang="scss" scoped>
.message{
    border-bottom: 0.01rem solid #ccc;
    overflow: hidden;
    padding: 0.5rem;
    img{
        width:50px;
        height: 50px;
        border-radius: 50%;
    }
    .eary{
        width:80%;
        float:right;
        div{
            color:rgb(85, 85, 85);
            .mymessage{
                display: inline-block;
                color:black;
            }
        }
    }
   
}
</style>
