import React from 'react'
import {graphql, Link, useStaticQuery} from 'gatsby'
import styled from 'styled-components'
import {devices} from '../common/MediaQuery/media-query'

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  padding-right: 20px;
  @media ${devices.mobileL} {
    flex-wrap: wrap;
    padding-right: 0;
  }
`
const NavList = styled.ul`
  display: flex;
  justify-content: space-between;
  margin: 0;
  text-transform: uppercase;
`
const NavItem = styled.li`
  font-size: 0.85em;
  padding-left: 20px;
  margin: 0;
  list-style: none;
  @media ${devices.mobileL} {
    padding: 2px 4px;
  }
  @media ${devices.mobileS} {
    font-size: 0.7em;
  }
`
const StyledNavLink = styled(Link)`
    color: #00637f;
    text-decoration: none;
  &.active {
    color: brown;
  }
  &:hover {
    text-decoration: underline;
  }
`

export const Navbar = () => {
  const {
    wpMenu: {
      menuItems: {nodes},
    },
  } = useStaticQuery(graphql`
    query NavbarQuery {
      wpMenu {
        menuItems {
          nodes {
            path
            id
            label
          }
        }
      }
    }
  `)
  return <Nav>
    <NavList>
      {/*{*/}
      {/*  nodes.map(({id, label, path}, i) =>*/}
      {/*    i > 0 &&*/}
      {/*    (<li key={id} className={navItem}>*/}
      {/*      <Link to={`${path}`} className={navLink} activeClassName={navActiveLink}>*/}
      {/*        {label}*/}
      {/*      </Link>*/}
      {/*    </li>))*/}
      {/*}*/}
      <NavItem>
        <StyledNavLink to={'/services'} activeClassName={'active'}>Услуги</StyledNavLink>
      </NavItem>
      <NavItem>
        <StyledNavLink to={'/catalog'} activeClassName={'active'}>Каталог</StyledNavLink>
      </NavItem>
      <NavItem>
        <StyledNavLink to={'/projects'} activeClassName={'active'}>Проекты</StyledNavLink>
      </NavItem>
      <NavItem>
        <StyledNavLink to={'/about'} activeClassName={'active'}>О нас</StyledNavLink>
      </NavItem>
      <NavItem>
        <StyledNavLink to={'/contacts'} activeClassName={'active'}>Контакты</StyledNavLink>
      </NavItem>
    </NavList>
  </Nav>
}