export const defineMenuPath = path => {
  let result = []
  path = path.replace(/^\/|\/$/g, '')
  let arrFromPath = path.split('/')
  let arr = arrFromPath.filter((_, idx) => idx > 0)
  arr.forEach(item => {
    let stateName = item
      .split('-')
      .map((el, idx) => (idx > 0 ? el[0].toUpperCase() + el.slice(1) : el))
      .join('')
    let actionType = item
      .split('-')
      .map(el => el.toUpperCase())
      .join('-')
    result.push([stateName, actionType])
  })
  return result
}
