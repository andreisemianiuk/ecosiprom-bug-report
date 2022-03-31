import * as React from 'react'
import parse, { domToReact } from 'html-react-parser'
import { graphql, Link, useStaticQuery } from 'gatsby'
import styled from 'styled-components'
import DropdownArrow from '../assets/dropdown.svg'
import { devices } from '../common/MediaQuery/media-query'
import { useCatalogMenu } from '../common/catalogMenu/useCatalogMenu'

let Container = styled.div`
  display: flex;
  justify-content: space-between;
  @media ${devices.mobileL} {
    flex-direction: column;
  }
`
let Sidebar = styled.div`
  width: min(25%, 400px);
  flex-direction: column;
  padding-left: clamp(5px, 10vw, 50px);
  @media ${devices.mobileL} {
    width: 100%;
    padding-left: 0;
  }
`
let Title = styled.h2`
  font-size: 1.3em;
  margin-top: 15px;
  text-transform: uppercase;
  color: #bf2b1d;
  @media ${devices.laptopL} {
    font-size: 1.5em;
  }
  @media ${devices.laptop} {
    font-size: 1.3em;
  }
  @media ${devices.mobileL} {
    text-align: center;
  }
`
let MainMenu = styled.ul`
  @media ${devices.mobileL} {
    padding-left: min(10%, 30px);
  }
`
let SubMenu = styled.ul`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  font-size: 0.9em;
  padding-left: 10px;
`
let MenuItem = styled.li`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #00637f;
  font-size: 0.9em;
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
    bottom: -4px;
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
const DropdownContainer = styled.span`
  position: relative;
  cursor: pointer;
`
const Dropdown = styled(DropdownArrow)`
  position: absolute;
  top: 5px;
  left: 2px;
  width: 10px;
`

export const CatalogLayout = props => {
  const { state, dispatch } = useCatalogMenu()
  const {
    wpPage: { content },
  } = useStaticQuery(graphql`
    query CatalogLayoutQuery {
      wpPage(title: { eq: "Каталог" }) {
        content
      }
    }
  `)

  const modifyLink = domNode => {
    let slug
    if (domNode.attribs.class === 'sub-menu') {
      slug = domNode.prev.attribs.link.split('/')
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

  const options = {
    replace: domNode => {
      if (domNode.attribs && domNode.attribs.class === 'sidebar') {
        return <Sidebar>{domToReact(domNode.children, options)}</Sidebar>
      }
      if (domNode.attribs && domNode.attribs.class === 'main-menu') {
        return <MainMenu>{domToReact(domNode.children, options)}</MainMenu>
      }
      if (domNode.attribs && domNode.attribs.class === 'sidebar-title') {
        return <Title>{domToReact(domNode.children, options)}</Title>
      }
      if (domNode.attribs && domNode.attribs.class === 'sub-menu') {
        const [stateName] = modifyLink(domNode)
        return (
          <SubMenu isOpen={state[stateName]}>
            {domToReact(domNode.children, options)}
          </SubMenu>
        )
      }
      if (domNode.attribs && domNode.attribs.class === 'menu-item') {
        let { link } = domNode.attribs
        const [stateName, actionType] = modifyLink(domNode)

        const handleMenu = () => {
          dispatch({
            type: actionType,
            payload: { [stateName]: !state[stateName] },
          })
        }

        return (
          <MenuItem>
            <MenuItemLink
              activeStyle={{ borderBottom: '4px solid #f53725' }}
              to={`/catalog/${link}`}
              state={{ modal: !domNode.attribs['data-submenu'] }}>
              {domToReact(domNode.children, options)}
            </MenuItemLink>
            {domNode.attribs['data-submenu'] && (
              <DropdownContainer onClick={handleMenu}>
                <Dropdown />
              </DropdownContainer>
            )}
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
      {props.children}
    </Container>
  )
}
