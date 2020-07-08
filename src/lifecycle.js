import Watcher from './observe/watcher'
export function mountComponent(vm, el) {
    const options = vm.$options;
    vm.$el = el;
    let updateComponent = () => {
        vm._update(vm._render())
    }
    new Watcher(vm,updateComponent,()=>{},true)
}
export function lifecycleMixin(Vue) {
    Vue.prototype._update = function () {
        
    }
}