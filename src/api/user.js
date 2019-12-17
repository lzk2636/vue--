import axios from 'axios'
import { getToken } from '../utils/token'
// You can create a new instance of axios with a custom config.
const instance = axios.create({
    baseURL: process.env.VUE_APP_BASEURL,
    withCredentials: true,

});

export function userInfo() {
    return instance({
        url: "/info",
        method: 'get',
        headers: {
            token: getToken(),
        }
    })
}
//退出登录
export function logoutUser() {
    return instance({
        url: '/logout',
        method: 'get',
        headers: {
            token: getToken(),
        }
    })
}