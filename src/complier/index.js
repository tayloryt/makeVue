import { parseHtml } from './parser-html'
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g
function genProps(attrs) {
    let str = '';
    for (let i = 0; i < attrs.length; i++){
        if (attrs[i].name === 'style') {
            let obj = {};
            attrs[i].value.split(';').forEach(item=>{
                let [key, value] = item.split(':');
                let styleName;
                if (key.includes('-')) {
                    const [classKey,name] = key.split('-')
                    let replaceKey = name.substring(0, 1).toLocaleUpperCase()
                    styleName = classKey + replaceKey+name.slice(1)
                } else {
                    styleName = key
                }
                obj[styleName] = value
            });
            attrs[i].value  = obj
        } 
        str +=`${attrs[i].name}:${JSON.stringify(attrs[i].value)},`   
    }
   return `{${str.slice(0,-1)}}`
}
function genChildren(el) {
    let children = el.children
    if (children && children.length) {
       return `${children.map(c => 
            gen(c)
        ).join(',')}`
    } else {
        return false
    }
}
function generate(el) {
    return `_c("${el.tag}",${el.attrs.length?genProps(el.attrs):'undefined'},${genChildren(el)})`
}
function gen(el) {
    if (el.nodeType === 1) {
       return generate(el)
    } else {
        let lastIndex = defaultTagRE.lastIndex = 0
        let tokens = []
        let match, index;
        let text = el.text
        while (match = defaultTagRE.exec(text)) {
             index = match.index;
            if (index > lastIndex) {
                tokens.push(JSON.stringify(text.slice(lastIndex,index)))
            }
            tokens.push(`_s(${match[1].trim()})`)
            lastIndex = index + match[0].length
        }
        if (lastIndex<text.length) {
            tokens.push(JSON.stringify(text.slice(lastIndex)))
        }
        return `_v(${tokens.join('+')})`
   }
}
export function compilationToRender(template) {
    let root = parseHtml(template)
    let renderData = generate(root)
    let renderFn = new Function(`with(this){return ${renderData}}`)
    return renderFn
}