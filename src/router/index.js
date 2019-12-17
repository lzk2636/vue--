// 导入 vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'

import login from '@/views/login/login.vue'
import index from '@/views/index/index.vue'
import { getToken } from '@/utils/token'
import subject from '@/views/index/subject/subject.vue';
import enterprise from '@/views/index/enterprise/enterprise.vue';
import user from '@/views/index/user/user.vue';
import question from '@/views/index/question/question.vue';
// import { Message } from 'element-ui'
// import axiso from 'axios'
//注册 vue-router
Vue.use(VueRouter)

// 实例化
const router = new VueRouter({
    //这里就是路由的配制项
    routes: [

        {
            path: '/login',
            component: login
        }, {
            path: '/index',
            component: index,
            children: [
                {
                    path: "subject",
                    component: subject
                },
                {
                    path: "enterprise",
                    component: enterprise
                },
                {
                    path: "user",
                    component: user
                },
                {
                    path: "question",
                    component: question
                }
            ]
        }
    ]
})

// a. 导航守卫就是在路由改变时会执行的回调函数
// b. to去的路由信息
// c. from来的路由信息
// d. next继续执行的回调函数
router.beforeEach((to, from, next) => {
    // window.console.log(1)
    if (to.path === '/login') {
        next()
    } else {
        // axiso({
        //     url:"/user/info",
        //     method:"get",
        //     headers:{
        //         Authorization:getToken()
        //     }
        // }).then(res=>{
        //     if(res.data.code===0){
        //         next()
        //     }else{
        //         next('/login')
        //     }
        // })
        if (getToken() === '' || getToken() === null) {
            next('/login')
        } else {
            next()
        }

    }


})

export default router