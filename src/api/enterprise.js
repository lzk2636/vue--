
import instance from '@/utils/http'
// 企业列表
export function enterpriseList(data) {
    return instance({
        url: "enterprise/list",
        method: 'get',
        params: data
    })
}
//企业添加
export function enterpriseAdd(data) {
    return instance({
        url: "enterprise/add",
        method: 'post',
        data
    })
}
//企业删除
export function enterpriseDelete(id) {
    return instance({
        url: "enterprise/remove",
        method: 'post',
        data: {
            id
        }
    })
}
//企业编辑
export function enterpriseEdit(data) {
    return instance({
        url: "enterprise/edit",
        method: 'post',
        data
    })
}
//企业状态//
export function enterpriseStatus(id) {
    return instance({
        url: "enterprise/status",
        method: 'post',
        data:{
            id
        }
    })
}