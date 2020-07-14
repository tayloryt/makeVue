import {pushTarget,popTarget} from './dep'
import {queueWatcher} from './schedular'
let id = 0;
class Watcher{
    constructor(vm,getter,cb,options) {
        this.vm = vm;
        this.getter = getter;
        this.cb = cb;
        this.id = id++
        this.options = options
        this.depIds = new Set()
        this.deps = []
        this.get();   
    }
    addDep(Dep){
        let id = Dep.id
        if(!this.depIds.has(id)){
            this.depIds.add(id)
            this.deps.push(Dep)
            console.log(id,'watcher')
            Dep.addSub(this)
        }
    }
    get() {
        pushTarget(this)
        this.getter()
        popTarget()
    }
    update() {
        queueWatcher(this)
    }
    run(){
        this.get()
    }
}

export default Watcher