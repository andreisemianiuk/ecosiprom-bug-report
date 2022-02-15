import React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import styled from 'styled-components'
import { devices } from '../common/MediaQuery/media-query'

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  padding: 0 50px;
  @media ${devices.laptopL} {
    padding: 0 20px;
  }
  @media ${devices.laptop} {
    padding: 0 5px;
  }
  @media ${devices.mobileL} {
    padding: 0;
    margin-top: 20px;
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
  font-size: 2rem;
  padding-left: 50px;
  margin: 0;
  list-style: none;
  & :first-child {
    padding-left: 0;
  }
  @media ${devices.laptopL} {
    padding-left: 20px;
    font-size: 1.4rem;
  }
  @media ${devices.laptop} {
    padding-left: 10px;
    font-size: 1rem;
  }
  @media ${devices.tablet} {
    padding-left: 10px;
    font-size: 0.9rem;
  }
  @media ${devices.mobileL} {
    padding: 2px 4px;
    font-size: 1.15rem;
  }
  @media ${devices.mobileM} {
    font-size: 1rem;
  }
  @media ${devices.mobileS} {
    font-size: 0.8rem;
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
