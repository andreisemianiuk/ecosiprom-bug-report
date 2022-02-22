import { graphql, useStaticQuery } from 'gatsby'
import parse, { domToReact } from 'html-react-parser'
import * as React from 'react'
import styled from 'styled-components'

let Container = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 50px 20px;
`
let Sidebar = styled.div`
  display: flex;
  width: max(30%, 300px);
  /* justify-content: center; */
  /* align-items: center; */
  flex-direction: column;
  /* width: 300px; */
  padding-left: 50px;
`
let Content = styled.div`
  display: flex;
  width: 80%;
`
let MenuItem = styled.li`
  list-style: none;
  cursor: pointer;
`
let CommonText = styled.div``

export const CatalogLayout = ({ children }) => {
  // console.log(children)
  const {
    wpPage: { content },
  } = useStaticQuery(graphql`
    query CatalogLayoutQuery {
      wpPage(title: { eq: "Каталог" }) {
        content
      }
    }
  `)
  const options = {
    replace: domNode => {
      if (domNode.attribs && domNode.attribs.class === 'sidebar') {
        return <Sidebar>{domToReact(domNode.children, options)}</Sidebar>
      }
      if (domNode.attribs && domNode.attribs.class === 'menu-item') {
        return (
          <MenuItem>{domToReact(domNode.children, options)}</MenuItem>
          // <Link>
          // </Link>
        )
      }
      if (domNode.attribs && domNode.attribs.class === 'common-text') {
        return <></>
      }
    },
  }

  return (
    <>
      {parse(content, options)}
      {children}
    </>
  )
}
