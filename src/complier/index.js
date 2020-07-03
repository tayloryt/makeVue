import { parseHtml } from './parser-html'
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g
function genProps(attrs) {
    let str = '';
    for (let i = 0; i < attrs.length; i++){
        if (attrs[i].name === 'style') {
            let value = attrs[i].value
            value = value.replace(/\;/g, ',')
            str += `${attrs[i].name}:{${value.slice(0,-1)}},`
        } else {
        str +=`${attrs[i].name}:${attrs[i].value},`   
        }
    }
   return `{${str.slice(0,-1)}}`
}
function genChildren(el) {
    console.log(el)
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
        console.log()
        let lastIndex = defaultTagRE.lastIndex = 0
        let tokens = []
        let match, index;
        let text = el.text
        while (match = defaultTagRE.exec(text)) {
            console.log(match)
            let index = match.index;
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
    let renderFn = new Function(`with(this){${renderData}}`)
    return renderFn
}