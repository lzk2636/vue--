import Vue from 'vue'
import VueX from 'vuex'
Vue.use(VueX);



const store=new VueX.Store({
    state:{
        

    },
    mutations:{
        getUserInfo(state,data){
            state.userInfo=data
        }
    }
})

export default store