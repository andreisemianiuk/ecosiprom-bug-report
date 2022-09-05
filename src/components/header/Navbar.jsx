import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import styled from "styled-components";
import {
  Desktop,
  TabletOrMobile,
  Mobile,
  Tablet,
} from "../../common/media-query-components/media-query-components";

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
const MobileNav = styled.nav`
  /*display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;*/
`;
const NavList = styled.ul`
  display: flex;
  justify-content: space-between;
  margin: 0;
`;
const MobileNavList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0;
`;
const NavItem = styled.li`
  font-size: 15px;
  font-weight: 600;
  line-height: 22px;
  padding-left: 35px;
  margin: 0;
  list-style: none;
  & :first-child {
    padding-left: 0;
  }
`;
const StyledNavLink = styled(Link)`
  position: relative;
  text-decoration: none;
  color: ${({ isActive }) => (isActive ? "#0e6683" : "inherit")};
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #0e6683;
  }
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 3px;
    border-radius: 1px;
    background-color: #0e6683;
    bottom: -33px;
    left: 0;
    transform-origin: ${({ isActive }) => (isActive ? "left" : "right")};
    transform: ${({ isActive }) => (isActive ? "scaleX(1)" : "scaleX(0)")};
    transition: transform 0.3s ease-in-out;
  }
  &:hover::before {
    transform-origin: left;
    transform: scaleX(1);
  }
`;

export const Navbar = ({ location }) => {
  const {
    wpMenu: {
      menuItems: { nodes },
    },
  } = useStaticQuery(graphql`
    query NavbarQuery {
      wpMenu(slug: { eq: "footer_menu" }) {
        menuItems {
          nodes {
            path
            id
            label
          }
        }
      }
    }
  `);
  return (
    <>
      <Desktop>
        <Nav>
          <NavList>
            {nodes.map(({ id, label, path }) => {
              const pathname =
                location.pathname.length > 1
                  ? location.pathname.match(/\/.*?\//)[0]
                  : location.pathname;
              const isActive = pathname === path;
              return (
                <NavItem key={id}>
                  <StyledNavLink to={path} isActive={isActive}>
                    {label
                      .split(" ")
                      .map((word, i) =>
                        i === 0
                          ? `${word[0].toUpperCase()}${word.slice(1)}`
                          : word
                      )
                      .join(" ")}
                  </StyledNavLink>
                </NavItem>
              );
            })}
          </NavList>
        </Nav>
      </Desktop>
      <Mobile>
        <MobileNav>
          <MobileNavList>
            {nodes.map(({ id, label, path }) => {
              const pathname =
                location.pathname.length > 1
                  ? location.pathname.match(/\/.*?\//)[0]
                  : location.pathname;
              const isActive = pathname === path;
              return (
                <NavItem key={id}>
                  <StyledNavLink to={path} isActive={isActive}>
                    {label
                      .split(" ")
                      .map((word, i) =>
                        i === 0
                          ? `${word[0].toUpperCase()}${word.slice(1)}`
                          : word
                      )
                      .join(" ")}
                  </StyledNavLink>
                </NavItem>
              );
            })}
          </MobileNavList>
        </MobileNav>
      </Mobile>
    </>
  );
};
