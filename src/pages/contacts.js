import * as React from 'react'
import Layout from '../components/Layout'
import MyMap from '../components/MyMap'
import { graphql } from 'gatsby'
import parse, { domToReact } from 'html-react-parser'
import styled from 'styled-components'
import { devices } from '../common/MediaQuery/media-query'

let Section = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 0 50px 30px;
  @media ${devices.laptop} {
    flex-direction: column;
    padding: 0;
  }
  @media ${devices.mobileL} {
    padding: 0;
  }
`
let Container = styled.div`
  @media ${devices.mobileL} {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`
let Title = styled.h1`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: #c42034;
  @media ${devices.desktop} {
    font-size: 2em;
    text-align: center;
  }
  @media ${devices.laptopL} {
    font-size: 1.4em;
  }
  @media ${devices.mobileL} {
    font-size: 1.5em;
  }
`
let Description = styled.div`
  font-size: 1.5em;
  @media ${devices.laptopL} {
    font-size: 1.2em;
  }
  @media (max-width: 1200px) {
    font-size: 1em;
  }
  @media ${devices.mobileL} {
    padding-left: 0;
  }
`
let FieldsWrapper = styled.address`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  font-style: normal;
  @media ${devices.laptop} {
    flex-direction: row;
  }
  @media (max-width: 800px) {
    flex-direction: column;
  }
`
let Field = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 10px;
  @media ${devices.mobileL} {
  }
`
let FieldName = styled.div``
let Info = styled.div`
  color: #00637f;
  /* margin: 10px; */
`
let Name = styled.div`
  color: #283043;
  font-weight: bold;
  margin-top: 30px;
  text-align: center;
  font-size: 1.2em;
`
let Phone = styled.a`
  display: block;
  color: #00637f;
  text-decoration: none;
`
let Email = styled.a``
let MapContainer = styled.div`
  padding-top: 50px;
  @media ${devices.mobileL} {
    padding: 0;
    margin: 20px 0;
  }
`

function ContactsPage({ data }) {
  let { content } = data.allWpContentNode.edges[0].node

  let options = {
    replace: domNode => {
      if (domNode.attribs && domNode.attribs.class === 'title') {
        return <Title>{domToReact(domNode.children, options)}</Title>
      }
      if (domNode.attribs && domNode.attribs.class === 'description') {
        return (
          <Description>{domToReact(domNode.children, options)}</Description>
        )
      }
      if (domNode.attribs && domNode.attribs.class === 'fields-wrapper') {
        return (
          <FieldsWrapper>{domToReact(domNode.children, options)}</FieldsWrapper>
        )
      }
      if (domNode.attribs && domNode.attribs.class === 'field') {
        return <Field>{domToReact(domNode.children, options)}</Field>
      }
      if (domNode.attribs && domNode.attribs.class === 'field-name') {
        return <FieldName>{domToReact(domNode.children, options)}</FieldName>
      }
      if (domNode.attribs && domNode.attribs.class === 'field-info') {
        return <Info>{domToReact(domNode.children, options)}</Info>
      }
      if (domNode.attribs && domNode.attribs.class === 'contact-name') {
        return <Name>{domToReact(domNode.children, options)}</Name>
      }
      if (domNode.attribs && domNode.attribs.class === 'phone') {
        const tel =
          domNode.children[0].data &&
          typeof domNode.children[0].data === 'string' &&
          domNode.children[0].data.replace(/[\)\(\s]/g, '')
        return (
          <Phone href={`tel:${tel}`}>
            {domToReact(domNode.children, options)}
          </Phone>
        )
      }
      if (domNode.attribs && domNode.attribs.class === 'email') {
        return (
          <Email href={`mailto:${domNode.children[0].data}`}>
            {domToReact(domNode.children, options)}
          </Email>
        )
      }
    },
  }
  return (
    <Layout>
      <Section>
        <div>{parse(content, options)}</div>
        <MapContainer>
          <MyMap />
        </MapContainer>
      </Section>
    </Layout>
  )
}

export default ContactsPage

export const contactsPageQuery = graphql`
  query {
    allWpContentNode(filter: { slug: { eq: "contacts" } }) {
      edges {
        node {
          ... on WpPage {
            id
            content
          }
        }
      }
    }
  }
`
