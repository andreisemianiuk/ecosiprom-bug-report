import * as React from 'react'
import parse, { domToReact } from 'html-react-parser'
import { graphql, Link, useStaticQuery } from 'gatsby'
import styled from 'styled-components'
import DropDownArrow from '../assets/dropdown.svg'
import DropUpArrow from '../assets/drop-up.svg'
import { devices } from '../common/MediaQuery/media-query'
import { useCatalogMenu } from '../common/catalogMenu/useCatalogMenu'
import { modifyLink } from '../common/modifyLink/modifyLink'

let Container = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 800px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`
let Sidebar = styled.div`
  width: min(25%, 400px);
  flex-direction: column;
  padding-left: clamp(5px, 10vw, 50px);
  @media (max-width: 1200px) {
    width: 40%;
  }
  @media (max-width: 1000px) {
    width: 50%;
  }
  @media (max-width: 800px) {
    width: 100%;
    text-align: center;
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
let MainMenu = styled.ul``
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
const DropArrowContainer = styled.span`
  position: relative;
  cursor: pointer;
`
const DropDown = styled(DropDownArrow)`
  position: absolute;
  top: 0.35em;
  left: 3px;
  width: 10px;
`
const DropUp = styled(DropUpArrow)`
  position: absolute;
  top: 0.25em;
  left: 2px;
  width: 14px;
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

        const handleDropdownMenu = () => {
          dispatch({
            type: actionType,
            payload: { [stateName]: !state[stateName] },
          })
        }
        const handleMenu = () => {
          dispatch({
            type: actionType,
            payload: { [stateName]: true },
          })
        }

        return (
          <MenuItem>
            <MenuItemLink
              activeStyle={{ borderBottom: '4px solid #f53725' }}
              to={`/catalog/${link}`}
              onClick={handleMenu}
              state={{ modal: !domNode.attribs['data-submenu'] }}>
              {domToReact(domNode.children, options)}
            </MenuItemLink>
            {domNode.attribs['data-submenu'] && (
              <DropArrowContainer onClick={handleDropdownMenu}>
                {state[stateName] ? <DropUp /> : <DropDown />}
              </DropArrowContainer>
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
