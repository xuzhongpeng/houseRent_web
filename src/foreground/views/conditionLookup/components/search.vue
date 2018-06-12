<template>
  <el-input
            popper-class="my-autocomplete"
            v-model="searchText"       
            placeholder="请输入内容"
            @keyup.native="handleClick">
            <i
              class="el-icon-search el-input__icon"
              slot="suffix"
              @click="handleIconClick">
            </i>
            
          </el-input>
</template>

<script>
export default {
 data(){
     return{
       rooms:[],
       searchText:''
     }
   },
   props:{
     
   },
    methods:{
      handleClick(ev){
        if(ev.key=="Enter")
          this.$emit("searchClick",this.searchText);
      },
       handleIconClick(ev) {
         
          this.$emit("searchClick",this.searchText);
       }
    },
    mounted(){
       
    }
}
</script>
<style lang="scss">
.wa{
  width:500px;
}
.wa .el-input__inner{
  border-radius: 20px; 
  width:500px; 
}
 .name {
  text-overflow: ellipsis;
  overflow: hidden;
}
.addr {
  font-size: 12px;
  color: #b4b4b4;
}
.el-input__icon{
  cursor:pointer;
}
</style>