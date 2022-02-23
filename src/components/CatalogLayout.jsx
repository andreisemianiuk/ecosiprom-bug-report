import { graphql, useStaticQuery } from 'gatsby'
import parse, { domToReact } from 'html-react-parser'
import * as React from 'react'
import styled from 'styled-components'

let Container = styled.div`
  display: flex;
  justify-content: space-between;
`
let Sidebar = styled.div`
  width: 300px;
  /* width: max(50%, 300px); */
  display: flex;
  flex-direction: column;
  padding-left: clamp(5px, 10vw, 50px);
`
let MenuItem = styled.li`
  width: max(100%, 300px);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  /* font-size: clamp(0.7rem, 1rem, 1.3rem); */
  color: #00637f;
  /* padding: 2px 4px; */
  list-style: none;
  text-transform: uppercase;
`
let MenuItemRef = styled.a`
  position: relative;
  text-decoration: none;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 4px;
    border-radius: 4px;
    background-color: #00637f;
    bottom: -2px;
    left: 0;
    transform-origin: right;
    transform: scaleX(0);
    transition: transform 0.3s ease-in-out;
  }

  &:hover::before {
    transform-origin: left;
    transform: scaleX(1);
  }
`

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
          <MenuItem>
            <MenuItemRef href='#'>
              {domToReact(domNode.children, options)}
            </MenuItemRef>
          </MenuItem>
        )
      }
      if (domNode.attribs && domNode.attribs.class === 'common-text') {
        return <></>
      }
    },
  }

  return (
    <Container>
      {parse(content, options)}
      {children}
    </Container>
  )
}
