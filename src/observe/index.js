/**
 * 观测数据
 * @param {data} 
 */
import { isObject } from '../utils/index'
class Observe{
    constructor(value) {
        this.walk(value)
    }
    walk(value) {
        Object.keys(value).forEach(key => {
            defineReactive(value, key, value[key])
        })
    }
}
function defineReactive(data, key, value) {
    observe(value)
    Object.defineProperty(data, key, {
        get() {
            return value
        },
        set(newValue) {
            if (newValue === value) return;
            observe(newValue)
            value = newValue
        }
    })
}
export function observe(data) {
    if (!isObject(data)) return
    new Observe(data)
}