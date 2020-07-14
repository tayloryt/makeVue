export function patch(oldVnode,vnode) {
    const isRealNode = oldVnode.nodeType
    if (isRealNode) {
        const oldElm = oldVnode;
        const parentElm = oldVnode.parentNode;
        let el = createElm(vnode);
        parentElm.insertBefore(el, oldElm.nextSibling)
        parentElm.removeChild(oldElm)
        return el
    }
}
function createElm(vnode){
    let { tag, data, children, key, text } = vnode
    if (typeof tag === 'string') {
        vnode.el = document.createElement(tag);
        updateProperties(vnode)
        children.forEach(child => {
            return vnode.el.appendChild(createElm(child))
        });
    } else {
        //虚拟dom映射真实dom
       vnode.el = document.createTextNode(text)
    }
    return vnode.el;
}
function updateProperties(vnode) {
    let propsData = vnode.data;
    let el = vnode.el;
    for (let key in propsData) {
        if (key === 'class') {
            el.className = propsData[key]
        } else if (key === 'style') {
            for (let styleName in propsData[key]) {
                el.style[styleName] = propsData[key][styleName]
            }
        } else {
            el.setAttribute(key,propsData[key])
        }
    }
}
