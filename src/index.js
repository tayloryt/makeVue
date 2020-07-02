/**
 * vue 核心代码
 */
import {initMixin} from './init'
class Vue{
    constructor(options) {
        this._init(options)
        if (options.el) {
            this.$mount(options.el)
        }
    }
}
initMixin(Vue)

export default Vue