<template>
  <div class='generalInfo'>
      <div class='title baoci'>{{roomInfo.house.houseName}}</div>
      <div class='address baoci'><span class="icon-ditu iconfont"></span>{{roomInfo.house.houseAdress}}</div>  
      <div title="平均房租金额" class="money iconfont"><span class="icon-amount1"></span> {{roomInfo.room.rent}} 元/月</div>
      
      <el-row>
        <el-col :span="12">
            <div class='infoItem'><span class='el-title'>面积</span><span class='el-info'>{{roomInfo.room.size}}m<sup>2</sup></span></div>
        </el-col>
        <el-col :span="12">
            <div class='infoItem'><span class='el-title'>户型</span><span class='el-info'>{{roomInfo.room.house_type}}</span></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
            <div class='infoItem'><span class='el-title'>楼层</span><span class='el-info'>23层</span></div>
        </el-col>
        <el-col :span="12">
            <div class='infoItem'><span class='el-title'>绿化率</span><span class='el-info'>30%</span></div>
        </el-col>
       </el-row> 
       <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>经理信息</span>            
        </div>
        <el-row>
            <el-col :span="6">
                <div class="grid-content">
                    <img :src="`http://localhost:8080/picture/${roomInfo.manager.extended}`">
                </div>
            </el-col>
            <el-col :span="18">
                <div class="grid-content">
                    <div>{{roomInfo.manager.name}}</div>
                    <div><span class="icon-dianhua iconfont"></span>{{roomInfo.manager.phonenumber}}</div>
                    <div><span class="icon-email iconfont"></span>{{roomInfo.manager.email}}</div>
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
      roomInfo:Object
  },
  mounted(){
      let _this=this;
      setTimeout(()=>{
        this.getData("pictureController/getPicByid.do",
        {
            id:_this.roomInfo.manager.extended
        },res=>{
            console.log("************"+res.data.path)
            _this.roomInfo.manager.extended=res.data.path;
        })
        this.getData('roomController/getRoomInfo.do',
            {
                houseid:_this.roomInfo.house.id
            },res=>{
                _this.room=res.data.rows.size();
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
.money{
    font-size: 20px !important;
    color:rgb(250, 51, 7);
}
  .box-card {
    margin-top:20px;
  }
  .el-row {
    .el-col{
        text-align: left;
    }
    .el-title{
        display: inline-block;
        width:50px;
        text-align:right;
        margin-right: 10px;
        color:#919090;
    }
    .el-info{
        display: inline-block;
        width:60px;
        text-align:left;
        color:#565656;
        
    }
}
</style>
