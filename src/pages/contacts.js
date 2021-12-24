import * as React from 'react'
import Layout from '../components/Layout'
import MyMap from '../components/MyMap'
import {graphql} from 'gatsby'
import parse, {domToReact} from 'html-react-parser'
import styled from 'styled-components'
import {devices} from '../common/MediaQuery/media-query'

let Section = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 50px 30px;
  @media ${devices.mobileL} {
    //display: flex;
    flex-direction: column;
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
  color: #00637f;
  margin-top: 10px;
  @media ${devices.mobileL} {
    text-align: center;
    font-size: 1.5em;
  }
`
let Description = styled.div`
  padding-left: 20px;
  @media ${devices.mobileL} {
    padding-left: 0;
  }
`
let Field = styled.div`
  @media ${devices.mobileL} {
    text-align: center;
  }
`
let Info = styled.div`
  color: #00637f;
  font-weight: bold;
  margin: 10px;
  @media ${devices.mobileL} {
    text-align: center;
  }
`
let Name = styled.div`
  color: #00637f;
  font-weight: bold;
  margin-top: 30px;
  text-align: center;
  font-size: 1.4em;
`
let MapContainer = styled.div`
  padding-left: 20px;
  padding-top: 50px;
  @media ${devices.mobileL} {
    padding: 0;
    margin: 20px 0;
  }
`

function ContactsPage({data}) {
  let {content} = data.allWpContentNode.edges[0].node
  
  let options = {
    replace: (domNode) => {
      if (domNode.attribs && domNode.attribs.class === 'contacts-title') {
        return (<Title>{domToReact(domNode.children, options)}</Title>)
      }
      if (domNode.attribs && domNode.attribs.class === 'contacts-description') {
        return (<Description>{domToReact(domNode.children, options)}</Description>)
      }
      if (domNode.attribs && domNode.attribs.class === 'contact-field') {
        return (<Field>{domToReact(domNode.children, options)}</Field>)
      }
      if (domNode.attribs && domNode.attribs.class === 'contact-field-info') {
        return (<Info>{domToReact(domNode.children, options)}</Info>)
      }
      if (domNode.attribs && domNode.attribs.class === 'contacts-container') {
        return (<Container>{domToReact(domNode.children, options)}</Container>)
      }
      if (domNode.attribs && domNode.attribs.class === 'contact-name') {
        return (<Name>{domToReact(domNode.children, options)}</Name>)
      }
    },
  }
  return (
    <Layout>
      <Section>
        {parse(content, options)}
        <MapContainer>
          <MyMap/>
        </MapContainer>
      </Section>
    </Layout>
  )
}

export default ContactsPage

export const contactsPageQuery = graphql`
  query {
    allWpContentNode(filter: {slug: {eq: "contacts"}}) {
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