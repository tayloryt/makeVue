import {mergeOptions} from '../utils/index'
export function initExtend(Vue) {
    let cid = 0;
    Vue.extend = function (extendOptions) {
        let Sub = function VueComponent(options) {
            this._init(options)
        }
        Sub.prototype = Object.create(this.prototype)
        Sub.prototype.constructor = Sub
        Sub.id = cid++
        mergeOptions(this.options,extendOptions)
        return Sub
    }
}