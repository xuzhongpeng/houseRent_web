<template>
  <el-tree
  :data="data2"
  show-checkbox
  node-key="id"
  :default-expanded-keys="[2, 3]"
  :default-checked-keys="[5]"
  :props="defaultProps">
</el-tree>
</template>

<script>
import Table from "@/backstage/component/table.vue"

import store from '@/vuex/store'
export default {
  name: '',
  data(){
    return{
    }
  },
  store,
  computed: {
    
  },
  components:{
　　},
  methods:{

  },
  　mounted(){
  }
}
</script>

<style>

</style>
