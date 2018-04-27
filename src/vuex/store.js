import Vue from 'vue'
import Vuex from 'vuex'
import moduleA from './actions/tableData'
import moduleB from './actions/dailog'
import moduleC from './actions/operation'
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        tableModule: moduleA,
        dialog:moduleB,
        operation:moduleC
      }
});
