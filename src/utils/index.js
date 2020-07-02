//判断是否数组
export function isObject(data) {
    return Object.prototype.toString.call(data) === '[object Object]'
}