/**
 * vue 核心代码
 */
import {initMixin} from './init'
class Vue{
    constructor(options) {
        this._init(options)
    }
}
initMixin(Vue)
export default Vue