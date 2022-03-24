import React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import styled from 'styled-components'
import { devices } from '../common/MediaQuery/media-query'

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 50px;
  @media (max-width: 1800px) {
    padding: 0 20px;
  }
  @media (max-width: 1200px) {
    padding: 0 8px;
  }
  @media ${devices.laptop} {
    padding: 0;
  }
  @media (max-width: 950px) {
    margin-top: 20px;
  }
  @media ${devices.mobileL} {
    padding: 0;
  }
`
const NavList = styled.ul`
  display: flex;
  justify-content: space-between;
  margin: 0;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  text-transform: uppercase;
`
const NavItem = styled.li`
  font-size: 1.6em;
  padding-left: 50px;
  margin: 0;
  list-style: none;
  & :first-child {
    padding-left: 0;
  }
  @media (max-width: 1800px) {
    padding-left: 20px;
    font-size: 1.5em;
  }
  @media ${devices.laptopL} {
    padding-left: 10px;
    font-size: 1.3em;
  }
  @media (max-width: 1250px) {
    padding-left: 5px;
    font-size: 1.1em;
  }
  @media ${devices.laptop} {
    font-size: 1em;
  }
  @media (max-width: 950px) {
    font-size: 1.2em;
    padding: 4px 8px;
  }
  @media ${devices.tablet} {
    font-size: 1em;
    padding: 2px 4px;
  }
  @media ${devices.mobileL} {
    font-size: 0.9em;
    padding: 0;
  }
  @media ${devices.mobileM} {
    font-size: 0.8em;
  }
  @media ${devices.mobileS} {
    font-size: 0.7em;
  }
`
const StyledNavLink = styled(Link)`
  text-decoration: none;
  box-shadow: inset 0 0 0 0 #00637f;
  color: #00637f;
  padding: 0 0.25rem;
  transition: color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: inset 100px 0 0 0 #00637f;
    color: white;
  }
`

export const Navbar = () => {
  const {
    wpMenu: {
      menuItems: { nodes },
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
  return (
    <Nav>
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
          <StyledNavLink to={'/services'} activeClassName={'active'}>
            Услуги
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to={'/catalog'} activeClassName={'active'}>
            Каталог
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to={'/projects'} activeClassName={'active'}>
            Проекты
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to={'/about'} activeClassName={'active'}>
            О нас
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to={'/contacts'} activeClassName={'active'}>
            Контакты
          </StyledNavLink>
        </NavItem>
      </NavList>
    </Nav>
  )
}
