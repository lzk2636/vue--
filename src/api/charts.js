import instance from '@/utils/http'
//面板数据接口
export function dataTiltle(){
    return instance({
        url:'data/title',
        method:"post",
    })
}
//企业题目数据统计
export function dataStatistics(){
    return instance({
        url:"data/statistics",
        method:"post",
        
    })
}
