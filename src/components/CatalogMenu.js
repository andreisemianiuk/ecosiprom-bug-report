import { graphql, useStaticQuery } from 'gatsby'
import * as React from 'react'

export const CatalogMenu = ({ children }) => {
  const {
    allWpMenuItem: { edges },
  } = useStaticQuery(graphql`
    query CatalogMenuLayoutQuery {
      allWpMenuItem(filter: { url: { regex: "/catalog/" } }) {
        edges {
          node {
            url
            label
          }
        }
      }
    }
  `)

  // console.log('edges >> ', edges)
  let arr = edges.map(({ node: { url, label } }) => ({
    url: url.slice(1, -1).split('/'),
    label,
  }))
  console.log('arr >> ', arr)
  const menuTree = {}
  arr.forEach(({ url, label }) => {
    let tempObj = menuTree
    for (let i = 1; i < url.length; i++) {
      if (tempObj.hasOwnProperty(url[i])) {
        tempObj = tempObj[url[i]]
      } else {
        tempObj[url[i]] = {}
      }
    }
    return { url, label }
  })
  function getLabelsMenu(obj) {}
  for (let edge in menuTree) {
  }
  // console.log('menuTree >> ', menuTree)
  // while(edges.length) {
  // 	let remainEdges = edges.filter(node => node === '/' || /\/\w\//.test())
  // 	if (edges)
  // }
  return <>{'menu'}</>
}
