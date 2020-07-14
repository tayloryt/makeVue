import { initState } from './state'
import { compilationToRender } from './complier/index'
import { mountComponent,callHook } from './lifecycle.js'
import {mergeOptions} from './utils/index'
import {nextTick} from './utils/next-tick'
export function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        const vm = this
        vm.$options = mergeOptions(vm.constructor.options, options)
        callHook(vm,'beforeCreate')
        initState(vm)
        callHook(vm,'created')
    }
    Vue.prototype.$mount = function (el) {
        const vm = this;
        const options = vm.$options;
        el = document.querySelector(el)
        if (!options.render) {
            let template = options.template
            if (!template && el) {
                template = el.outerHTML;
                let render = compilationToRender(template)
                options.render = render
            }
        }
        mountComponent(vm,el)
    }
    Vue.prototype.$nextTick = nextTick
}