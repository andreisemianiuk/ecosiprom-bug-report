import { Link, graphql, useStaticQuery } from 'gatsby'
import parse, { domToReact } from 'html-react-parser'
import * as React from 'react'
import styled from 'styled-components'
import { devices } from '../common/MediaQuery/media-query'

let Container = styled.div`
  display: flex;
  justify-content: space-between;
  @media ${devices.mobileL} {
    flex-direction: column;
  }
`
let SidebarContainer = styled.div`
  /* width: max(25%, 300px); */
`
let ContentContainer = styled.div`
  /* width: 90%; */
`
let Sidebar = styled.div`
  /* width: 80%; */
  /* width: max(50%, 300px); */
  display: flex;
  flex-direction: column;
  padding-left: clamp(5px, 10vw, 50px);
`
let Title = styled.h2`
  color: #f53725;
  /* text-align: center; */
  /* margin-right: 80px; */
`
let MenuItem = styled.li`
  /* width: max(100%, 300px); */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  /* font-size: clamp(0.7rem, 1rem, 1.3rem); */
  color: #00637f;
  /* padding: 2px 4px; */
  list-style: none;
  text-transform: uppercase;
`
let MenuItemLink = styled(Link)`
  position: relative;
  text-decoration: none;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 4px;
    border-radius: 4px;
    background-color: #f53725;
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
      if (domNode.attribs && domNode.attribs.class === 'sidebar-title') {
        return <Title>{domToReact(domNode.children, options)}</Title>
      }
      if (domNode.attribs && domNode.attribs.class === 'menu-item') {
        let { link } = domNode.attribs
        return (
          <MenuItem>
            <MenuItemLink to={`/catalog/${link}`}>
              {domToReact(domNode.children, options)}
            </MenuItemLink>
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
      {/* <SidebarContainer></SidebarContainer> */}
      {/* <ContentContainer></ContentContainer> */}
      {children}
    </Container>
  )
}
