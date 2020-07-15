import {isRealTag, isObject} from '../utils/index'
export function createElement(vm, tag, data = {}, ...children) {
    let key = data.key
    if (key) {
        delete data.key
    }
    if (isRealTag(tag)) {
        return vNode(tag,data,key,children,undefined)
    } else {
        console.log(tag)
        let Ctor = vm.$options.components[tag]
        return createComponent(vm,tag,data,key,children,Ctor)
    }
    
}
export function createComponent(vm, tag, data,key,children, Ctor) {
    if (isObject(Ctor)) {
        Ctor = vm.$options._base.extend(Ctor)
    }
    console.log(Ctor)
    return vNode(`vue-component-${Ctor.id}-${tag}`,data,key,undefined,undefined,{Ctor,children})
}
export function createTextNode(text) {
    return vNode(undefined,undefined,undefined,undefined,text)
}
function vNode(tag,data,key,children,text,componentOptions) {
    return {
        tag,
        data,
        key,
        children,
        text,
        componentOptions
    }
}