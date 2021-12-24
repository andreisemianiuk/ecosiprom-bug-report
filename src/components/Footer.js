import React from 'react'
import styled from 'styled-components'
import {graphql, Link, useStaticQuery} from 'gatsby'

let FooterContainer = styled.footer`
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: #c5fcff;
  background-color: #00637f;
`
let LinkList = styled.div`
  display: flex;
`
let FooterLink = styled(Link)`
  text-decoration: none;
  color: #c5fcff;
  margin: 10px;
  font-size: .9em;
`
let CompanyInfo = styled.div`
  //color: white;
  font-size: 0.8em;
`

function Footer() {
  const {
    wpMenu: {
      menuItems: {nodes},
    },
  } = useStaticQuery(graphql`
    query FooterQuery {
      wpMenu {
        menuItems {
          nodes {
            path
            label
          }
        }
      }
    }
  `)
  return (
    <FooterContainer>
      <LinkList>{nodes.map(({path, label}) => !(/Шеф-монтаж|Газовый/.test(label)) &&
        <FooterLink to={path}>{label}</FooterLink>)}
      </LinkList>
      <CompanyInfo>&copy;2021 Экосипром. Все права защищены</CompanyInfo>
    </FooterContainer>
  )
}

export default Footer