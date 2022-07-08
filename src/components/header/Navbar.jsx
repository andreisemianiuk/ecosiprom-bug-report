import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import styled from "styled-components";
// import { devices } from "../../common/MediaQuery/media-query"

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
const NavList = styled.ul`
  display: flex;
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
  color: inherit;
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
    transform-origin: right;
    transform: scaleX(0);
    transition: transform 0.3s ease-in-out;
  }
  &:hover::before {
    transform-origin: left;
    transform: scaleX(1);
  }
`;

export const Navbar = () => {
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
        {nodes.map(({ id, label, path }) => (
          <NavItem key={id}>
            <StyledNavLink to={`${path}`} activeClassName={"active"}>
              {label
                .split(" ")
                .map((word, i) =>
                  i === 0 ? `${word[0].toUpperCase()}${word.slice(1)}` : word
                )
                .join(" ")}
            </StyledNavLink>
          </NavItem>
        ))}
      </NavList>
    </Nav>
  );
};
