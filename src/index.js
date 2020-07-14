/**
 * vue 核心代码
 */
import { initMixin } from './init'
import { renderMixin } from './render'
import { lifecycleMixin } from './lifecycle'
import {initOptionsAPI} from './initOptionsAPI/index'
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
initOptionsAPI(Vue)
export default Vue