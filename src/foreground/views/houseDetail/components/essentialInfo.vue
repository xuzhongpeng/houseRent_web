<template>
  <div class="main">
    <el-tabs v-model="theFirst" type="card" class="table" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first">
            <el-table empty-text="无"
            :data="tableData"
            class="table"
            border
            @row-click="row_click"
            style="width: 100%">
                <el-table-column prop="roomNo" label="房间号"></el-table-column>
                <el-table-column prop="status" label="状态">
                    <template slot-scope="scope">
                        <span>{{scope.row.status=='1'?'已入住':'未入住'}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="面积">
                    <template slot-scope="scope">
                        <span>{{scope.row.size}} m<sup>2</sup></span>
                    </template>
                </el-table-column>
                <el-table-column  label="租客">
                     <template slot-scope="scope">
                         <ImgDailog :ImgSrc="'http://localhost:8080/picture/'+scope.row.path" :imgStyle="'width:50px;height:50px'"></ImgDailog>
                        <!-- <img class="tenantImg" :src="'http://localhost:8080/picture/'+scope.row.path"/> -->
                    </template>
                </el-table-column>
                <el-table-column prop="house_type" label="房间类型"></el-table-column>
                <el-table-column label="租金">
                    <template slot-scope="scope">
                        <span>{{scope.row.rent}} 元/月</span>
                    </template>
                </el-table-column>
                <el-table-column prop="has_WC" label="是否独卫"></el-table-column>
            </el-table>
        
        </el-tab-pane>        
    </el-tabs>
  </div>
</template>
<script>
import ImgDailog from '@/components/ImgDailog'
export default {
    components:{
        ImgDailog
    },
    data(){
        return{
            theFirst:"first",
            tableData: []
        }
    },
    methods:{
      handleClick(tab, event) {
        console.log(tab, event);
      },
      row_click(row){
        this.$router.push({path: '../roomDetail/'+row.id});
      }
    },
    props:{
        houseid:String
    },
    mounted(){
        this.getData('roomController/getRoomInfo.do',
        {
            houseid:this.houseid
        },res=>{
            this.tableData=res.data.rows;
        })
    }
}
</script>


<style lang="scss">

.table img{
    border-radius: 50%;
}
.main{
    min-height: 140px;
}
.el-tabs__content{
    margin-top: -16px;
}
</style>
