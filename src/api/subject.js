import axios from 'axios'
import { getToken } from '../utils/token'
// You can create a new instance of axios with a custom config.
const instance = axios.create({
    baseURL: process.env.VUE_APP_BASEURL,
    withCredentials: true,


});

//获取所有科目列表
export function subjectList(data) {
    return instance({
        url: 'subject/list',
        method: 'get',
        headers: {
            token: getToken()
        },
        params: data
    })
}

//添加学科对象
export function addSubject(data) {
    return instance({
        url: 'subject/add',
        method: 'post',
        headers: {
            token: getToken()
        },
        data
    })
}
//学科删除
export function deleteSubject(id){
    return instance({
        url: 'subject/remove',
        method: 'post',
        headers: {
            token: getToken()
        },
        data:{
            id
        }
    })
}
//学科编辑
export function editSubject(data){
    return instance({
        url: 'subject/edit',
        method: 'post',
        headers: {
            token: getToken()
        },
        data
    })


}
//学科状态设置
///subject/status
export function setStatus(id){
    return instance({
        url: 'subject/status',
        method: 'post',
        headers: {
            token: getToken()
        },
        data:{
            id
        }
    })


}
