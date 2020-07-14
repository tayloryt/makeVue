//判断是否数组
export function isObject(data) {
    return typeof data === 'object' && data !== null
}
export function def(data, key, value) {
    Object.defineProperty(data, key, {
        enumerable: false,
        configurable: false,
        value
    })
}
export function proxy(vm, source, key) {
    Object.defineProperty(vm, key, {
        get() {
            return vm[source][key]
        },
        set(newVal) {
            vm[source][key] = newVal
        }
    })
}
function mergeHook(parentVal, childVal) {
    if (childVal) {
        if (parentVal) {
            return parentVal.concat(childVal)
        } else {
            return [childVal]
        }
    } else {
        return [parentVal]
    }
}
const LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'Mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed']
let strats = {}
LIFECYCLE_HOOKS.forEach(hook => {
    strats[hook] = mergeHook
})
export function mergeOptions(parent, child) {
    const options = {}
    for (let key in parent) {
        merge(key)
    }
    for (let key in child) {
        merge(key)
    }
    function merge(key) {
        if (strats[key]) {
            return options[key] = strats[key](parent[key], child[key])
        }
        if (typeof parent[key] === 'object' && typeof child[key] === 'object') {
            options[key] = {
                ...parent[key],
                ...child[key]
            }
        } else if (child[key] === undefined) {
            options[key] = parent[key]
        } else {
            options[key] = child[key]
        }
    }
    return options
}
