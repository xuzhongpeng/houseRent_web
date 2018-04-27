<template>
<el-tabs v-model="theFirst" type="card" class="table" >
        <el-tab-pane label="配置信息" name="first">
  <div class='iconfont'>
      <ul v-if="facilities.fridge=='1'">
          <li><span class='icon-fridge_side'></span></li>
          <li>冰箱</li>
      </ul>
      <ul v-if="facilities.wardrobe=='1'">
          <li><span class='icon-yigui'></span></li>
          <li>衣柜</li>
      </ul>
      <ul v-if="facilities.wired_network=='1'">
          <li><span class='icon-kuandai'></span></li>
          <li>宽带</li>
      </ul>
      <ul v-if="facilities.air_conditioner=='1'">
          <li><span class='icon-airconditioningind'></span></li>
          <li>空调</li>
      </ul>
      <ul v-if="facilities.sofa=='1'">
          <li><span class='icon-sofa'></span></li>
          <li>沙发</li>
      </ul>
      <ul v-if="facilities.wifi=='1'">
          <li><span class='icon-wifi'></span></li>
          <li>WIFI</li>
      </ul>
      <ul v-if="facilities.television=='1'">
          <li><span class='icon-television'></span></li>
          <li>电视</li>
      </ul>
      <span v-if="!facilities.wifi" class="s">暂无数据</span>
  </div>
        </el-tab-pane>
</el-tabs>
</template>

<script>
export default {
    data(){
        return{
            theFirst:"first",
            facilities:{}
        }
    },
    props:{
        houseid:String
    },
    mounted(){
        this.getData('facilitiesController/getFacilitiesByHouseid.do',
        {
            houseid:this.houseid
        },res=>{
            if(res.data.length==1)
                this.facilities=res.data[0];
        })
    }
}
</script>

<style lang="scss" scoped>
ul{
    list-style: none;
    float:left;      
    margin:0 20px;  
    li{
        font-size:14px;
        span{
                font-size:80px;
                color:rgb(111, 139, 167);
        }
        
    }
    
}
.none{
    display:none;
}
.s{
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    color: #909399;
    font-size: 14px;
}
</style>
<style>
.basicConfiguration .el-tabs__content{
        padding:30px 20px;
        border: 1px solid #e4e7ed;
    }
.el-tabs__content {
    margin-top: -16px;
}
</style>
