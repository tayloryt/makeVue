import { parseHtml } from './parser-html'
import {generate} from './generate'
export function compilationToRender(template) {
    let root = parseHtml(template)
    let renderData = generate(root)
    let renderFn = new Function(`with(this){return ${renderData}}`)
    return renderFn
}