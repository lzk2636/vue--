//token工具函数抽取
// 1. 步骤：
// a. 在src目录下创建utils文件夹
// b. utils文件夹下创建token.js专门用来操纵token
// c. key定义为常量避免修改
// d. 抽取的逻辑准备3个分别是设置,获取,移除
let key='mmtoken'
//设置token
export function setToken(value){
    window.localStorage.setItem(key,value)

}
//获取token
export function getToken(){
    // window.console.log(key)
    return window.localStorage.getItem(key)
}
//移除
export function removeToken(){
    window.localStorage.removeItem(key)
}