<template>
    <div>
        <div class='item' @click='go'>
            <span><span class="icon-xiaoxi iconfont"></span> {{info.title}}</span>
            <span>{{info.describe}}</span>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        info:Object
    },
    methods:{
        go(){
            this.$router.push(this.info.type);
        }
    }
}
</script>

<style lang="scss" scoped>
.item{
    width:90%;
    height: 50px;
    margin:10px auto;
    border:1px solid rgb(207, 207, 207);
    border-radius:5px;
    text-align: left;
    display: flex;
    align-items: center;
    cursor: pointer;
    &>span:nth-child(1){
        display: inline-block;
        width: 25%;
        margin-left:15px;
    }
     &>span:nth-child(2){
        display: inline-block;
        margin-left:100px;
        color:rgb(172, 172, 172);
        font-size: 14px;
    }
}
</style>
