import React from 'react'
import styled from 'styled-components'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { devices } from '../common/MediaQuery/media-query'

let FooterContainer = styled.footer`
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #c5fcff;
  background-color: #00637f;
  padding: 20px 100px;
  @media ${devices.mobileL} {
    flex-direction: column;
    padding: 10px;
  }
`
let LinkList = styled.div`
  display: flex;
`
let FooterLink = styled(Link)`
  text-decoration: none;
  color: #c5fcff;
  margin: 10px;
  font-size: 0.9em;
`
let CompanyInfo = styled.div`
  font-size: 0.8em;
`
let ContactInfo = styled.div`
  @media ${devices.mobileL} {
    margin: 10px 0;
  }
`

function Footer() {
  const {
    wpMenu: {
      menuItems: { nodes },
    },
  } = useStaticQuery(graphql`
    query FooterQuery {
      wpMenu(slug: { eq: "footer_menu" }) {
        menuItems {
          nodes {
            path
            label
          }
        }
      }
    }
  `)
  console.log('nodes >> ', nodes)
  return (
    <FooterContainer>
      <LinkList>
        {nodes.map(
          ({ path, label }) =>
            !/Шеф-монтаж|Газовый/.test(label) && (
              <FooterLink key={'footer_' + path} to={path}>
                {label}
              </FooterLink>
            )
        )}
      </LinkList>
      <ContactInfo>
        info@ecosiprom.com
        <br /> +375 (29) 662-30-04
      </ContactInfo>
      <CompanyInfo>&copy;2022 Экосипром. Все права защищены</CompanyInfo>
    </FooterContainer>
  )
}

export default Footer
