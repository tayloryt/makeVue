const callTicks = []
let waiting = false
function flushQueue(){
    callTicks.forEach(cb=>cb())
    waiting = false
}
export function nextTick(cb){
    callTicks.push(cb)
    if(!waiting){
        setTimeout(flushQueue,0);
        waiting = true
    }
}