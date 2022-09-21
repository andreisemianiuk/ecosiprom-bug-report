import * as React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

export const Breadcrumb = ({ crumbs, color }) => {
  return (
    <List>
      {crumbs.map((crumb, index) => {
        return (
          <Item key={index}>
            <BreadcrumbLink to={crumb.pathname} color={color}>
              {crumb.crumbLabel}
            </BreadcrumbLink>
            {index !== crumbs.length - 1 && <Separator color={color} />}
          </Item>
        );
      })}
    </List>
  );
};

const List = styled.ol`
  display: flex;
  list-style: none;
  margin: 0;
  line-height: 20px;
  flex-wrap: wrap;
  max-width: 710px;
  @media (max-width: 1223px) {
    max-width: 510px;
  }
  @media (max-width: 991px) {
    max-width: 400px;
  }
  @media (max-width: 767px) {
    max-width: 370px;
  }
  @media (max-width: 425px) {
    max-width: 350px;
  }
  @media (max-width: 350px) {
    max-width: 310px;
  }
`;
const Item = styled.li`
  margin: 0;
  margin-right: 28px;
  &:last-child {
    margin-right: 0;
  }
`;
const BreadcrumbLink = styled(Link)`
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  color: ${({ color }) => color};
  text-decoration: none;
`;
const Separator = styled.span`
  position: relative;
  top: -2px;
  left: 14px;
  content: "";
  display: inline-block;
  width: 3px;
  height: 3px;
  border: 1px solid ${({ color }) => color};
  border-top: none;
  border-left: none;
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
`;
