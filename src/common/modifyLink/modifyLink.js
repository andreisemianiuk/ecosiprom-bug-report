export const modifyLink = domNode => {
  let slug
  if (domNode.attribs.class === 'sub-menu') {
    slug = domNode.prev.attribs.link.split('/')
  } else if (domNode.attribs.class === 'item') {
    slug = domNode.attribs['data-link'].split('/')
  } else {
    slug = domNode.attribs.link.split('/')
  }
  const stateName = slug[slug.length - 1]
    .split('-')
    .map((el, idx) => (idx > 0 ? el[0].toUpperCase() + el.slice(1) : el))
    .join('')
  const actionType = slug[slug.length - 1]
    .split('-')
    .map(el => el.toUpperCase())
    .join('-')
  return [stateName, actionType]
}
