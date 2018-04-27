<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><router-link :to="{ name: 'home'}">home</router-link></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><div @click='change()'>change</div></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">{{info}}</a></li>
      <li><a :href="url" target="_blank"><h3>这是vuex{{$store.state.a.count}}</h3></a></li>
    </ul>   
     <div>
        <button @click="$store.dispatch('add')">+</button>
        <button @click="$store.dispatch('reduce',{reduceCount:10})">-</button>
    </div>
  </div>
</template>

<script>
import store from '@/vuex/store'
export default {
  name: 'hello',
  data () {
    return {
      msg: '我的天1',
      info: '我就是这样',
      url: 'http://www.baidu.com'
    }
  },
  store,
  methods : {
      change:function(){
        var myInfo="我变了";
        var myUrl='http://xuzhongpeng.top';
        this.info==myInfo?this.info="我就是这样":this.info=myInfo;
        this.url==myUrl?this.url='http://www.baidu.com':this.url=myUrl;
      }
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
