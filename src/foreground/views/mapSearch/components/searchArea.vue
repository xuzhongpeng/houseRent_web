<template>
<div>
  <section id='amapbox' style='cursor: pointer;'>   
    <ul class='ul'>
        <li v-for="(item,index) in searchData" :key="index" @click='itemClick(item)'>
          <span class='icon el-icon-location-outline'></span>
          <span class='searchName'>{{item.houseName}}</span>
          <span class='address'>{{item.houseAdress}}</span>
        </li>        
    </ul>
  </section>
</div>
</template>
<script>
export default {
  components:{
  },
  methods:{
  itemClick(item){
    this.$router.push({path: 'houseDetail/'+item.id});
  }
  },
  props:{
    searchData:Array
  }
}
</script>


<style lang="scss" scoped>
ul{
  list-style:none;
  width:100%;
  padding: 0;
  margin: 0;
  $height:40px;
  li{
    height:$height;
    line-height: $height;
    text-align: left;
    padding-left: 5px;
    &:hover{
      background-color: #e9e9e9;
    }
    .icon{
       display: inline-block;
        height: $height;
        line-height: $height;
        float:left;
      color:#6ca8ec;
    }
    .searchName{
       display: inline-block;
        height: $height;
        line-height: $height;
        font-size: 13px;
        float:left;
        color: #404040;
    }
    .address{
      display: inline-block;
     width: 190px;
    height: $height;
    line-height:$height;
      margin-left: 10px;
      margin-right: 5px;
      color: #999;
      font-size: 12px;
      overflow: hidden;
    }
  }
}
#amapbox{
    
    $amapboxWidth:294px;
    width:$amapboxWidth;
    min-height: 0px;
    background: #fff;
    position: absolute;
    z-index: 199;
    left: 15px;
    top: 77px;
    box-shadow: 1px 1px 19px -5px;
    margin: 0;
    padding: 0;
}
</style>
