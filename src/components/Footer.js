import React from 'react'
import styled from 'styled-components'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { devices } from '../common/MediaQuery/media-query'

let FooterContainer = styled.footer`
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 1.2em;
  color: #dedbe6;
  background-color: #00637f;
  padding: 20px 100px;
  @media ${devices.laptopL} {
    font-size: 1em;
  }
  @media (max-width: 1200px) {
    padding: 20px 40px;
    font-size: 0.9em;
  }
  @media (max-width: 1000px) {
    font-size: 1em;
    flex-direction: column;
  }
  @media (max-width: 600px) {
    font-size: 0.9em;
    padding: 10px 5px;
  }
  @media (max-width: 450px) {
    font-size: 0.8em;
  }
  @media (max-width: 350px) {
    font-size: 0.8em;
  }
  @media ${devices.mobileS} {
    font-size: 0.7em;
  }
`
let LinkList = styled.div`
  display: flex;
`
let FooterLink = styled(Link)`
  text-decoration: none;
  color: #dedbe6;
  margin: 10px;
  @media ${devices.mobileL} {
    font-size: 0.8em;
    margin: 5px;
  }
`
let CompanyInfo = styled.div`
  font-size: 0.8em;
`
let ContactInfo = styled.address`
  @media (max-width: 1000px) {
    margin: 10px 0;
  }
`
let Email = styled.a`
  color: #c48d74;
`
const PhonesWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 0.8em;
`
const Phone = styled.a`
  color: #dedbe6;
  text-decoration: none;
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
  return (
    <FooterContainer>
      <LinkList>
        {nodes.map(({ path, label }) => (
          <FooterLink key={'footer_' + path} to={path}>
            {label}
          </FooterLink>
        ))}
      </LinkList>
      <ContactInfo>
        <Email href='mailto:info@ecosiprom.com'>info@ecosiprom.com</Email>
        <PhonesWrapper>
          <Phone href='tel:+37529-662-30-04'>+375 (29) 662-30-04</Phone>
          <Phone href='tel:+37517-275-23-06'>+375 (17) 275-23-06</Phone>
        </PhonesWrapper>
      </ContactInfo>
      <CompanyInfo>&copy;2022 Экосипром. Все права защищены</CompanyInfo>
    </FooterContainer>
  )
}

export default Footer
