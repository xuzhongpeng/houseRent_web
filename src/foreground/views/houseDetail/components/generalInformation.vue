<template>
  <div class='generalInfo'>
      <div class='title baoci'>{{houseInfo.house.houseName}}</div>
      <div class='address baoci'><span class="icon-ditu iconfont"></span>{{houseInfo.house.houseAdress}}</div>
     
      <div title="房间数" class="iconfont"><span class="icon-hezu"></span> {{room}}</div>
      <div title="平均房租金额" class="iconfont"><span class="icon-amount1"></span> {{houseInfo.averageRent}} 元/月</div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>经理信息</span>            
        </div>
        <el-row>
            <el-col :span="6">
                <div class="grid-content">
                    <img :src="`http://localhost:8080/picture/${houseInfo.manager.extended}`">
                </div>
            </el-col>
            <el-col :span="18">
                <div class="grid-content">
                    <div>{{houseInfo.manager.name}}</div>
                    <div><span class="icon-dianhua iconfont"></span>{{houseInfo.manager.phonenumber}}</div>
                    <div><span class="icon-email iconfont"></span>{{houseInfo.manager.email}}</div>
                </div>
            </el-col>
        </el-row>
      </el-card>
  </div>
</template>
<script>
export default {
  data(){
      return{          
        room:0,
      }
  },
  props:{
      houseInfo:Object
  },
  mounted(){
      let _this=this;
      setTimeout(()=>{
        this.getData("pictureController/getPicByid.do",
        {
            id:_this.houseInfo.manager.extended
        },res=>{
            console.log("************"+res.data.path)
            _this.houseInfo.manager.extended=res.data.path;
        })
        this.getData('roomController/getRoomInfo.do',
            {
                houseid:_this.houseInfo.house.id
            },res=>{
                _this.room=res.data.rows.length;
            })
      },0)
     
  }
}
</script>

<style lang="scss" scoped>
img{
    width:100%;
    height:100%;
    border-radius: 50%;
}
.generalInfo{
    height: 450px;
    text-align: left;
    .title{
        font-size: 18px;
    }
    .address{
        color:rgb(141, 141, 141);
    }
    .baoci{
        line-height: 30px;
    }
    div{
        font-size: 14px;
        line-height: 50px;
    }
}
.clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
.grid-content{
    height:90px;
    text-align: center;
    div{
        line-height: 30px;
    }
}
  .box-card {
    margin-top:40px;
  }
</style>
