<template>
  <el-autocomplete
            popper-class="my-autocomplete"
            v-model="state3"   
            :fetch-suggestions="querySearch"         
            placeholder="请输入内容"
            @select="handleSelect">
            <i
              class="el-icon-edit el-input__icon"
              slot="suffix"
              @click="handleIconClick">
            </i>
            <template slot-scope="{ item }">
              <div class="name">{{ item.houseName }}</div>
              <span class="addr">{{ item.address }}</span>
            </template>
          </el-autocomplete>
</template>

<script>
export default {
 data(){
     return{
       state3:''
     }
   },
   props:{
      rooms:Array
   },
    methods:{
      querySearch(queryString, cb) {
        var rooms = this.rooms;
        //var results = queryString ? rooms.filter(this.createFilter(queryString)) : rooms;
        //console.log("result"+JSON.stringify(results))
        this.getData("roomController/getWithPaging.do",{
              'searchText':queryString,
                'offset':'0',
                'order':'id',
                'sort':'asc'
            },
            res=>{
              this.rooms=res.data.rows;
              cb(res.data.rows)
            });
        // 调用 callback 返回建议列表的数据
       // cb(results);
      },
      createFilter(queryString) {
        return (rooms) => {
          return (rooms.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
       handleSelect(item) {
          console.log(item);
       },
       handleIconClick(ev) {
          console.log(ev);
       }
    },
    mounted(){
       
    }
}
</script>
<style lang="scss">
.el-input__inner{
  background-color:rgb(14, 15, 51);
  border-radius: 20px;
  border:none;
  width:500px;
  color:#fff;
  text-align: center;
}
 .name {
  text-overflow: ellipsis;
  overflow: hidden;
}
.addr {
  font-size: 12px;
  color: #b4b4b4;
}
</style>