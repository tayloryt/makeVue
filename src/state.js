import { observe } from './observe/index'
import {proxy} from './utils/index'
export function initState(vm) {
    if (vm.$options.props) {
        initProps(vm)
    }
    if (vm.$options.methods) {
        initMethods(vm)
    }
    if (vm.$options.data) {
        initData(vm)
    }
    if (vm.$options.computed) {
        initComputed(vm)
    }
    if (vm.$options.watch) {
        initWatch(vm)
    }
}
function initProps(vm) {

}
function initMethods(vm) {

}
function initData(vm) {
    let data = vm.$options.data;
    data = vm._data = typeof data === 'function' ? data.call(vm) : data
    for (let key in data) {
        proxy(vm,'_data',key)
    }
    observe(data)
}
function initComputed(vm) { }
function initWatch(vm) { }
