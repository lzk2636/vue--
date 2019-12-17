import Vue from 'vue'
import VueX from 'vuex'
Vue.use(VueX);



const store=new VueX.Store({
    state:{
        time:new Date()

    }
})

export default store