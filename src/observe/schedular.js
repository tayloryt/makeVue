import { nextTick } from '../utils/next-tick'
let queue = [];
let has = {};
function flushQueue() {
    queue.forEach(item => item.run())
    has = {}
    queue.length = 0;
}
export function queueWatcher(watcher) {
    const id = watcher.id;
    if (has[id] === undefined) {
        queue.push(watcher);
        has[id] = true;
        nextTick(flushQueue)
    }
}