export function createElement(tag,data={},...children) {
    let key = data.key
    if (key) {
        delete data.key
    }
    return vNode(tag,data,key,children,undefined)
}
export function createTextNode(text) {
    return vNode(undefined,undefined,undefined,undefined,text)
}
function vNode(tag,data,key,children,text) {
    return {
        tag,
        data,
        key,
        children,
        text
    }
}