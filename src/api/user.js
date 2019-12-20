import instance from '@/utils/http'
export function userInfo() {
    return instance({
        url: "/info",
        method: 'get',    })
}
//退出登录
export function logoutUser() {
    return instance({
        url: '/logout',
        method: 'get',    })
}
//用户列表
export function userList(data) {
    return instance({
        url: 'user/list',
        method: 'get',
        params: data
    })
}
//新增用户
export function addUser(data) {
    return instance({
        url: '/user/add',
        method: 'post',
        data
    })
}


//编辑用户
export function editUser(data) {
    return instance({
        url: 'user/edit',
        method: 'post',
        data: data
    })
}
//删除用户
export function deleteUser(id) {
    return instance({
        url: 'user/remove',
        method: "post",
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
        data:{
            id
        }

    })

}