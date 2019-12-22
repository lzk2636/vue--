import Vue from 'vue'
import store from '@/store/store'
Vue.directive('mypower', {
    /**
    * @description:
    * @param {type} 
    * @return: 
    * def
    * expression: "[1,2,3,4,5,6,7,7,8]"
    *modifiers: {}
    *name: "mypower"
    *rawName: "v-mypower"
    *value: (9) [1, 2, 3, 4, 5, 6, 7, 7, 8]数组
    */
    inserted: function (el, binding) {
        if(binding.value.includes(store.state.userInfo.role)){
            el.parentNode.removeChild(el)
        }


     
    }
})