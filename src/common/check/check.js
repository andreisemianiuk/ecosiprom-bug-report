export function check(nodeEl) {
  if (typeof document !== `undefined`) {
    let arr = []
    for (let i = 0; i < nodeEl.length; i++) {
      let cur = nodeEl[i]
      if (cur.type === 'text') {
        arr.push(cur.data)
      } else if (cur.type === 'tag') {
        let innerText
        if (cur.children.length) {
          innerText = check(cur.children)
        }
        let el = document.createElement(cur.name)
        if (innerText) {
          el.innerHTML = innerText
        }
        if (cur.attribs.style) {
          let styleText = cur.attribs.style
          let styleName = styleText
            .match(/([\w-]*):/gm)
            .map(v => v.slice(0, v.length - 1))
          let styleValue = styleText
            .match(/:(.*?);/gm)
            .map(v => v.slice(1, v.length - 1))
          for (let i = 0; i < styleName.length; i++) {
            el.style[styleName[i]] = styleValue[i]
          }
        }
        arr.push(el.outerHTML)
      }
    }
    return arr.join('')
  }
  return 'null'
}
