// 导入 vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'
//注册 vue-router
Vue.use(VueRouter)
// 实例化
const router = new VueRouter({
    //这里就是路由的配制项
    routes: [
        {
            path: '/这里可给路由地址一个名字',
            component: '/home'
        }
    ]
})

export default router