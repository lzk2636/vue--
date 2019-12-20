import instance from '@/utils/http'
//获取所有科目列表
export function subjectList(data) {
    return instance({
        url: 'subject/list',
        method: 'get',
        params: data
    })
}

//添加学科对象
export function addSubject(data) {
    return instance({
        url: 'subject/add',
        method: 'post',
        data
    })
}
//学科删除
export function deleteSubject(id) {
    return instance({
        url: 'subject/remove',
        method: 'post',
        data: {
            id
        }
    })
}
//学科编辑
export function editSubject(data) {
    return instance({
        url: 'subject/edit',
        method: 'post',
        data
    })


}
//学科状态设置
///subject/status
export function setStatus(id) {
    return instance({
        url: 'subject/status',
        method: 'post',
        data: {
            id
        }
    })


}
