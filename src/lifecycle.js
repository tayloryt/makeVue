import Watcher from './observe/watcher'
import {patch} from './vdom/patch'
export function mountComponent(vm, el) {
    const options = vm.$options;
    vm.$el = el;
    callHook(vm,'beforeMount')
    let updateComponent = () => {
        vm._update(vm._render())
    }
    new Watcher(vm, updateComponent, () => { }, true)
    callHook(vm,'mounted')
}
export function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
        const vm = this;
        vm.$el = patch(vm.$el,vnode)//虚拟节点创建出真实节点替换掉原有$el
    }
}
export function callHook(vm,hook) {
    const handlers = vm.$options[hook];
    if (handlers) {
        for (let i = 0; i < handlers.length; i++){
            handlers[i].call(vm)
        }
    }
}