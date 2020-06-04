// 排序
let arr = [4,7,1,3,9,6,5]
for(let i=0; i<arr.length-1;i++){
    for(let j=0;j<arr.length-1;j++){
        if(arr[j]>arr[j+1]){
            let temp = arr[j+1]
            arr[j+1] = arr[j]
            arr[j] = temp
        }
    }
}
// 深拷贝
function deepClone(obj){
    let result = {}
    let keys = Object.keys(obj)
    let key = null
    let temp = null
    for(let i=0;i<keys.length;i++){
        key = keys[i]
        temp = obj[key]
        if(temp&&typeof(temp)=='object'){
            result[key] = deepClone(temp)
        }else{
            result[key] = temp 
        }
    }
    return result
}
function deepCopy(target){
    if(typeof(target)=='object'){
        let cloneTarget = Array.isArray(target)?[]:{}
        for(key in target){
            cloneTarget[key] = deepCopy(target[key])
        }
        return cloneTarget
    }else{
        return target
    }
}