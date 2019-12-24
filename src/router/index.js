// 导入 vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login/login.vue'
import index from '@/views/index/index.vue'
import { Message } from 'element-ui'
import { getToken, removeToken } from '@/utils/token'
import { userInfo } from '@/api/user'
// 导入vuex 封装包
import store from '@/store/store'
import children from '@/utils/children.js'
//注册 vue-router
Vue.use(VueRouter)

// 实例化
const router = new VueRouter({
    //这里就是路由的配制项
    routes: [

        {
            path: '/login',
            component: login
        }, 
        {
            path: '/index',
            component: index,
            meta:{
                power:["超级管理员","管理员","老师","学生"]
            },
            //  redirect:"/index/chart",
            children
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

                    
                    if (res.data.data.status == 0) {
                        Message.error("你的账号已经被封号了,请联系管理员");
                        next("/login")
                    } else {
                        
                        res.data.data.avatar = process.env.VUE_APP_BASEURL + res.data.data.avatar
                        store.commit('getUserInfo', res.data.data)
                        // if(to.meta.power==uder)
                        // 页面访问权限设置
                        if(to.meta.power==undefined){
                            return  Message.error("你没有这个访问权限,请联系管理员");
                        }else if(to.meta.power.includes(store.state.userInfo.role)){
                            // window.console.log(to);
                            // window.console.log(from);
                            next()
                        }else{
                            Message.error("你没有这个访问权限,请联系管理员");
                            next(from.path)
                        }
                        

                    }
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