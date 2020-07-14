/**
 * 观测数据
 * @param {*}data 
 */
import { isObject, def } from '../utils/index'
import { arrayMethods } from './observeArray'
import {Dep} from './dep'
class Observe{
    constructor(value) {
        if (Array.isArray(value)) {
            def(value, '__ob__', this)
            value.__proto__ = arrayMethods
            this.observeArray(value)
        } else {
            this.walk(value)
        }
       
    }
    observeArray(value) {
        for (let i = 0; i < value.length; i++){
            observe(value[i])
        }
    }
    walk(value) {
        Object.keys(value).forEach(key => {
            defineReactive(value, key, value[key])
        })
    }
}
function defineReactive(data, key, value) {
    observe(value)
    const dep = new Dep()
    Object.defineProperty(data, key, {
        get() {
            if (Dep.target) {
                dep.depend()
            }
            return value
        },
        set(newValue) {
            if (newValue === value) return;
            observe(newValue)
            value = newValue
            dep.notify()
        }
    })
}
export function observe(data) {
    if (!isObject(data)) return
    new Observe(data)
}