class Watcher{
    constructor(vm,getter,cb,options) {
        this.vm = vm;
        this.getter = getter;
        this.cb = cb;
        this.options = options
    }
    get() {
        this.getter()
    }
}
export default Watcher