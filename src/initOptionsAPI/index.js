
import { initMixin } from './initMixin'
import { ASSETS_TYPE } from '../utils/const'
import { initAssetsRegisters } from './assets'
import {initExtend} from './extend'
export function initOptionsAPI(Vue) {
    Vue.options = {}
    Vue.options._base = Vue
    initMixin(Vue)
    ASSETS_TYPE.forEach(type => {
        Vue.options[type+'s'] ={} 
    })
    initExtend(Vue)
    initAssetsRegisters(Vue)
}