

const moduleA ={
    state : {
        tableData:{}
    },
    mutations:{
        change(state, data){
            state.tableData= data
        }
        
    },
    actions:{
        change({commit},data) {
            commit('change',data);
        }
    }
}


export default  moduleA;
