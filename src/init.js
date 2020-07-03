import { initState } from './state'
import {compilationToRender} from './complier/index'
export function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        const vm = this
        vm.$options = options
        initState(vm)
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
                console.log(render)
            }
        }
    }
}