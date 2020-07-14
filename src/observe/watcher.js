import {pushTarget,popTarget} from './dep'
let id = 0;
class Watcher{
    constructor(vm,getter,cb,options) {
        this.vm = vm;
        this.getter = getter;
        this.cb = cb;
        this.id = id++
        this.options = options
        this.get();   
    }
    get() {
        pushTarget(this)
        this.getter()
        popTarget()
    }
    update() {
        this.get()
    }
}
export default Watcher