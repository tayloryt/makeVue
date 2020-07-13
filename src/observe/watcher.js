class Watcher{
    constructor(vm,getter,cb,options) {
        this.vm = vm;
        this.getter = getter;
        this.cb = cb;
        this.options = options
        this.get();
    }
    get() {
        this.getter()
    }
}
export default Watcher