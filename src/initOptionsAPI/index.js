import {mergeOptions} from '../utils/index'
export function initOptionsAPI(Vue) {
    Vue.options = {}
    Vue.mixin = function (mixin) {
        this.options = mergeOptions(this.options, mixin)
        console.log(this.options)
    }
}