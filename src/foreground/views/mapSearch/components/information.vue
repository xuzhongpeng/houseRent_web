<template>
<div>
    <section id='amapbox' style='cursor: pointer;'>   
        <div class="block">
            <el-carousel height="200px" indicator-position="none">
                <el-carousel-item v-for="(item,index) in houseData.housePic" :key="index">
                <img :src="'http://localhost:8080/picture/'+item.path"  @click="getIntoDetail"/> 
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class='amInfo'  @click="getIntoDetail">        
            <el-container>
                <el-header> 
                    <el-row>
                        <el-col :span="12">
                            <div id='houseName'>{{houseInfo.houseName}}</div>
                        </el-col>
                        <el-col :span="12">
                            <div class='el-money'>￥{{houseData.averageRent}} 元/月</div>
                        </el-col>
                    </el-row>
                </el-header>    
                <el-main>
                    <div class='my_infoItem'><i class='icon el-icon-location-outline'></i><span>{{houseInfo.houseAdress}}</span></div>
                    <div class='my_infoItem'><i class='icon el-icon-phone'></i><span>{{houseData.manager.phonenumber}}</span></div>
                    <hr style="border: 0.5px solid #e0e0e0;"/>
                    <el-row>
                        <el-col :span="12">
                            <div class='infoItem'><span class='el-title'>面积</span><span class='el-info'>22m<sup>2</sup></span></div>
                        </el-col>
                        <el-col :span="12">
                            <div class='infoItem'><span class='el-title'>户型</span><span class='el-info'>三室一厅</span></div>
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
                    
                </el-main>
            </el-container>
        </div>
    </section>
</div>
</template>

<script>

export default {
  props:{
      houseInfo:{},
      houseData:{}
  },
  methods:{
      getIntoDetail(){
           this.$router.push({path: 'houseDetail/'+this.houseInfo.id});
       },
  }
}
</script>
<style lang="scss" scoped>
 $amapboxWidth:294px;
 #amapbox{
    
    $amapboxWidth:294px;
    width:$amapboxWidth;
    min-height: 300px;
    background: #fff;
    position: absolute;
    z-index: 199;
    left: 15px;
    top: 127px;
    box-shadow: 1px 1px 19px -5px;
    margin: 0;
    padding: 0;
    border: 1px solid #cecece; 
}
.block{
    width:$amapboxWidth;
}
img{
    width:$amapboxWidth;
}
.amInfo{        
        box-sizing: border-box;
        width:$amapboxWidth;
        min-height: 170px;
        background-color: #fff;
        padding:5px;
        margin-top: -10px;
        .el-header{
            height: 30px !important;   
            padding: 20px 10px;
        }
        #houseName{
            font-family: Microsoft Yahei;
            font-size: 16px;
            text-align: left;
            color:#333;
            margin-bottom: 0px;
        }
        .el-money{
            font-size: 16px;
            color:#ffa100;
        }
        .el-main{
            font-size: 12px;
            padding: 10px;
            .el-icon-location-outline,.el-icon-phone{
                color:#ec871c;
            }
            .icon{
                margin-right: 10px;
            }
            .my_infoItem{
                font-size: 12px;
                line-height: 23px;
                color:#333;
                text-align: left;
                margin-bottom: 8px;
                span{
                    color:rgb(77, 77, 77) !important;
                }
            }
            .el-row {
                .el-col{
                    text-align: left;
                }
                margin-bottom: 10px;
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
                .my_phone{
                    display: inline-block;
                    width:60px;
                }
                .my_number{
                    display: inline-block;
                    width:60px;
                }
                &:last-child {
                margin-bottom: 0;
                }
            }
            .grid-content {
                border-radius: 4px;
                min-height: 36px;
            }
        }
}
</style>
