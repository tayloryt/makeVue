/**
 * vue 核心代码
 */
import { initMixin } from './init'
import { renderMixin } from './render'
import {lifecycleMixin} from './lifecycle'
class Vue{
    constructor(options) {
        this._init(options)
        if (options.el) {
            this.$mount(options.el)
        }
    }
}
initMixin(Vue)
renderMixin(Vue)
lifecycleMixin(Vue)
export default Vue