// 导入 vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'

import login from '@/views/login/login.vue'
import index from '@/views/index/index.vue'
import subject from '@/views/index/subject/subject.vue';
import enterprise from '@/views/index/enterprise/enterprise.vue';
import user from '@/views/index/user/user.vue';
import question from '@/views/index/question/question.vue';
import { Message } from 'element-ui'
import { getToken,removeToken } from '@/utils/token'
import {userInfo} from '@/api/user'
// 导入vuex 封装包
import store from '@/store/store'
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
const whiteBlack = ['/login']
router.beforeEach((to, from, next) => {
    // window.console.log(whiteBlack)
    if (!whiteBlack.includes(to.path.toLocaleLowerCase())) {
        // window.console.log(6)
        if (!getToken()) {
            Message.error("重新登录");
            next("/login");
        } else {
            //这里可以判断token是不伪造
            userInfo().then(res => {
                if (res.data.code === 200) {
                    //vuex 存储数据 Vuex 可以帮助我们管理共享状态，并附带了更多的概念和框架。这需要对短期和长期效益进行权衡。

                    window.console.log(res);
                    // store.state.userInfo=res.data.data;
                    // store.state.userInfo.avatar=process.env.VUE_APP_BASEURL+store.state.userInfo.avatar

                    res.data.data.avatar=process.env.VUE_APP_BASEURL+res.data.data.avatar
                    store.commit('getUserInfo', res.data.data)

                    next()
                } else if (res.data.code === 206) {
                    Message.error("toke 错误不能伪造");
                    removeToken();
                    next("/login");
                }
            });
        }
    } else {
        // window.console.log(888)
        next()
    }


})




export default router