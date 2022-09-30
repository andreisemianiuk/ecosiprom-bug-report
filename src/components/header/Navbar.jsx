import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";
import styled from "styled-components";

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
    <Nav>
      <NavList>
        {nodes.map(({ id, label, path }) => {
          const pathname =
            location.pathname.length > 1
              ? location.pathname.match(/\/.*?\//)[0]
              : location.pathname;
          const isactive = pathname === path;
          return (
            <NavItem key={id}>
              <StyledNavLink to={path} isactive={isactive.toString()}>
                {label
                  .split(" ")
                  .map((word, i) =>
                    i === 0 ? `${word[0].toUpperCase()}${word.slice(1)}` : word
                  )
                  .join(" ")}
              </StyledNavLink>
            </NavItem>
          );
        })}
      </NavList>
    </Nav>
  );
};

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  @media (max-width: 1123px) {
    height: fit-content;
  }
`;
const NavList = styled.ul`
  display: flex;
  justify-content: space-between;
  margin: 0;
  @media (max-width: 1123px) {
    width: 100%;
    flex-direction: column;
  }
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
  @media (max-width: 1123px) {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    padding-left: 0;
    border-bottom: 1px solid #dbdbe1;
  }
`;
const StyledNavLink = styled(Link)`
  position: relative;
  text-decoration: none;
  color: ${({ isactive }) => (isactive === "true" ? "#0e6683" : "inherit")};
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
    transform-origin: ${({ isactive }) =>
      isactive === "true" ? "left" : "right"};
    transform: ${({ isactive }) =>
      isactive === "true" ? "scaleX(1)" : "scaleX(0)"};
    transition: transform 0.3s ease-in-out;
    @media (max-width: 1123px) {
      display: none;
    }
  }
  &:hover::before {
    transform-origin: left;
    transform: scaleX(1);
  }
`;
