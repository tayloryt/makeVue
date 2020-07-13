import Watcher from './observe/watcher'
import {patch} from './vdom/patch'
export function mountComponent(vm, el) {
    const options = vm.$options;
    vm.$el = el;
    let updateComponent = () => {
        vm._update(vm._render())
    }
    new Watcher(vm,updateComponent,()=>{},true)
}
export function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
        const vm = this;
        vm.$el = patch(vm.$el,vnode)//虚拟节点创建出真实节点替换掉原有$el
    }
}