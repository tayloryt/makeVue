const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
const startTagOpen = new RegExp(`^<${qnameCapture}`);
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
const startTagClose = /^\s*(\/?)>/;
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g
let root = null;
const stack = [];
const TAG_TYPE = 1;
const TEXT_TYPE = 3;
let currentParent;
function createAstElement(tagName, attrs) {
    return {
        tag:tagName,
        parent: null,
        children: [],
        attrs,
        nodeType:TAG_TYPE
    }
}
function end(tagName) {
    let element = stack.pop()
    if (element.tag !== tagName) {
        throw new Error('html error')
    }
    currentParent = stack[stack.length - 1]
    if (currentParent) {
        currentParent.children.push(element)
        element.parent = currentParent.tag
    }
}
function chars(text) {
    text = text.replace(/\s/g,'')
    let element = {
        nodeType: TEXT_TYPE,
        text
    }
    if (text && currentParent) {
       currentParent.children.push(element) 
    }
}
function start(tagName, attrs) {
    const element = createAstElement(tagName,attrs)
    if (!root) {
        root = element
    }
    currentParent = element
    stack.push(element)
}
export function parseHtml(html) {
    while (html) {
        let textEnd = html.indexOf('<')
        if (textEnd === 0) {
            let startTagMatch = parseStartTag()
            if (startTagMatch) {
                start(startTagMatch.tagName,startTagMatch.attrs)
            continue
            }
            let endTagMatch = html.match(endTag)
            if (endTagMatch) {
                advance(endTagMatch[0].length)
                end(endTagMatch[1])
                continue
            }
        }
        let text;
        if (textEnd >= 0) {
            text = html.substring(0, textEnd)
        }
        if (text) {
            advance(text.length) 
            chars(text)
        }
    }
    function advance(n) {
        html = html.substring(n)
    }
    function parseStartTag() {
        let start = html.match(startTagOpen);
        if (start) {
            const match = {
                tagName: start[1],
                attrs:[]
            }
            advance(start[0].length)
          
            let end, attr;
            while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
                match.attrs.push({
                    name: attr[1],
                    value:attr[3] || attr[4] || attr[5]
                })
                advance(attr[0].length)
            }
            if (end) {
                advance(end[0].length)
            }
            return match
        }
    }
    return root
}