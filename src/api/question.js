import instance from '@/utils/http'
//文件上传
export function questionUpload(file){
    return instance({
        url:'question/upload',
        method:"post",
        data:{
            file
        }
    })
}
//编辑题目
export function questionEdit(data){
    return instance({
        url:"question/edit",
        method:"post",
        data
    })
}
//题目列表''
export function questionList(params){
    return instance({
        url:'question/list',
        method:'get',
        params
    })
   
}
//删除题目
export function questionRemove(id){
    return instance({
        url:'question/remove',
        method:'post',
        data:{
            id
        }
    })
   
}
//题目设置状态
export function questionStatus(id){
    return instance({
        url:'question/status',
        method:'post',
        data:{
            id
        }
    })
   
}
//获取题目信息
export function questionOne(id){
    return instance({
        url:'question/one',
        method:'post',
        data:{
            id
        }
    })
   
}
//发布题目
export function questionAdd(data){
    return instance({
        url:'question/add',
        method:'post',
        data
    })
   
}