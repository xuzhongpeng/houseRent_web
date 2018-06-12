<template>
  <el-input
            popper-class="my-autocomplete"
            v-model="state3"   
            @focus ="handleSelect"         
            placeholder="请输入内容"
            >
            <i
              class="el-icon-edit el-input__icon"
              slot="suffix"
              @click="handleIconClick">
            </i>
           
          </el-input>
</template>

<script>
export default {
 data(){
     return{
       state3:'',
       rooms:[]
     }
   },
    methods:{
      handleSelect(){
          this.$router.push("conditionLookup");
      },
       handleIconClick(ev) {
          this.$router.push("conditionLookup");
       }
    },
    mounted(){
       
    }
}
</script>
<style lang="scss">
.searchInput .el-input__inner{
  background-color:rgb(14, 15, 51);
   border:none;   
  text-align: center;
   color:#fff;
}
.searchInput .el-input__inner{
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
</style>