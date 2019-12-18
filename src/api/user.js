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
//用户列表
export function userList(data) {
    return instance({
        url: 'user/list',
        method: 'get',
        headers: {
            token: getToken(),
        },
        params: data
    })
}
//新增用户
export function addUser(data) {
    return instance({
        url: '/user/add',
        method: 'post',
        headers: {
            token: getToken(),
        },
        data
    })
}


//编辑用户
export function editUser(data) {
    return instance({
        url: 'user/edit',
        method: 'post',
        headers: {
            token: getToken(),
        },
        data: data
    })
}
//删除用户
export function deleteUser(id) {
    return instance({
        url: 'user/remove',
        method: "post",
        headers: {
            token: getToken(),
        },
        data:{
            id
        }

    })
}
//设置用户状态
export function changeStatus(id){
    return instance({
        url: 'user/status',
        method: "post",
        headers: {
            token: getToken(),
        },
        data:{
            id
        }

    })

}