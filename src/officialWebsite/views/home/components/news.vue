<template>

<ul class='ul'>
  <li class="nav_title">社区动态</li>
       <li class="detaill" v-if="!is_much&&news.length!=1" >
           <div class="imgArea">
               <img v-if="!news[0].cover_photo_id" :src="$host+'picture/important.png'"/>
               <img v-if="news[0].cover_photo_id" :src="$host+'picture/'+news[0].cover_photo_id"/>
            </div>
           <div class="newArea">
               <div class="news_title">{{news[0].title}}<span class="time">{{news[0].push_time}}</span></div>
               <div class="content">{{news[0].content}}</div>
           </div>
       </li>
        
       <li class="detaill" v-if="is_much" v-for="(item,index) in news" :key='index'>
           
            <div class="imgArea" >
                <img v-if="!item.cover_photo_id" :src="$host+'picture/important.png'"/>
                <img v-if="item.cover_photo_id" :src="$host+'picture/'+item.cover_photo_id"/>
            </div>
            <div class="newArea">
                <div class="news_title">{{item.title}}<span class="time">{{item.push_time}}</span></div>
                <div class="content">{{item.content}}</div>
            </div>
           
       </li>
        
       <li class="lookMuch" v-if="!is_much" @click="lookMuch(true)">查看更多</li>
       <li class="lookMuch" v-if="is_much" @click="lookMuch(false)">收起</li>
</ul>
</template>

<script>
export default {
    data(){
        return{
            newObject:{
                content:'',
                cover_photo_id:'',
                id:'',
                managerName:'',
                push_time:'',
                push_user_id:'',
                title:''
            },
            news:[this.newObject],
            is_much:false
        }
    },
    mounted(){
         this.getData('newsController/getWithPaging.do',{
            'searchText':'',
            'offset':'0',
            'order':'push_time',
            'sort':'desc'
        },res=>{
            console.log("sss");
            if(res.data.rows.length>0){
                this.news=res.data.rows;
            }
            else{
                this.news[0].title='暂无消息';
            }           
        })
    },
    methods:{
        lookMuch(val){
            this.is_much=val;
        }
    }
}
</script>

<style lang="scss" scoped>
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
    .detaill{
        overflow: hidden;
        border-bottom:0.01rem solid #ccc;
        width:100%;
        height:7rem;
        &>div{
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
                font-size: 0.6rem;
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
        height: 2.5rem;
        text-align: center;
        display:flex;/*Flex布局*/
        display: -webkit-flex; /* Safari */
        align-items:center;
        justify-content:center;
        border-bottom:0.8rem solid rgb(228, 228, 228);
        color:rgb(74, 138, 250);
    }
}
</style>
