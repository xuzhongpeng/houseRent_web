const modulebC ={
    state : {
        operation:{}
    },
    mutations:{
        changeOperation(state, data){
            state.operation= data
        }        
    },
    actions:{
        changeOperation({commit},data) {
            commit('changeOperation',data);
        }
    }
}
export default  modulebC;