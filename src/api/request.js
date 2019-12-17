
import axios from 'axios'
// You can create a new instance of axios with a custom config.
const instance = axios.create({
    baseURL: process.env.VUE_APP_BASEURL,
    withCredentials:true,
});
//登录接口
export function login(data) {
    return instance({
        url: '/login',
        method: 'post',
        data
    })
}
//验证码获取接口
export function sendsms(data){
    return instance({
        url:'/sendsms',
        method:'post',
        data
    })
}
//注册接口获取
export function register(data){
    return instance({
        url:'/register',
        method:'post',
        data,
    })
}