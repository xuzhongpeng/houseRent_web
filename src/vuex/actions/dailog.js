const modulebB ={
    state : {
        centerDialogVisible:false
    },
    mutations:{
        changeDialog(state, data){
            state.centerDialogVisible= data
        }
        
    },
    actions:{
        changeDialog({commit},data) {
            commit('changeDialog',data);
        }
    }
}
export default  modulebB;