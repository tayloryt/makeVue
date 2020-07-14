/**
 * 观测数据
 * @param {*}data 
 */
import { isObject, def } from '../utils/index'
import { arrayMethods } from './observeArray'
import { Dep } from './dep'
class Observe {
    constructor(value) {
        if (Array.isArray(value)) {
            this.dep = new Dep
            def(value, '__ob__', this)
            value.__proto__ = arrayMethods
            this.observeArray(value)
        } else {
            this.walk(value)
        }

    }
    observeArray(value) {
        for (let i = 0; i < value.length; i++) {
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
   let childOB = observe(value)
    const dep = new Dep()
    Object.defineProperty(data, key, {
        get() {
            // console.log('取值', value)
            if (Dep.target) {
                dep.depend()
                if(childOB){
                    childOB.dep.depend()
                    if(Array.isArray(value)){
                        arrayDep(value)
                    }
                }
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
function arrayDep(value){
    for(let i = 0;i<value.length;i++){
        let current = value[i]
        current.__ob__ && current.__ob__.dep.depend()
        if(Array.isArray(current)){
            arrayDep(current)
        }
    }
}
export function observe(data) {
    if (!isObject(data)) return
    return new Observe(data)
}