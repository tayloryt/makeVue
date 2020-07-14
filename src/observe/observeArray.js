let oldArrayPrototype = Array.prototype;
export let arrayMethods = Object.create(oldArrayPrototype)
const METHODS = [
    'push',
    'splice',
    'unshift',
    'pop',
    'shift',
    'reverse',
    'sort'
]
METHODS.forEach(method => {
    arrayMethods[method] = function (...args) {
       const result = oldArrayPrototype[method].call(this, ...args);
        let insertData;
        let ob = this.__ob__
        switch (method) {
            case 'push':
            case 'unshift':
                insertData = args
                break;
            case 'splice':
                insertData = args.slice(2)
                break;
        }
   
        if(insertData) ob.observeArray(insertData)
        ob.dep.notify()
        return result
    }
})