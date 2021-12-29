import * as React from 'react'
import Layout from '../components/Layout'
import {graphql} from 'gatsby'
import parse, {domToReact} from 'html-react-parser'
import styled from 'styled-components'
import {devices} from '../common/MediaQuery/media-query'

let AboutContainer = styled.div`
  padding: 50px 30px;
  @media ${devices.mobileL} {
    padding: 0 10px 20px;
  }
`
let AboutInfo = styled.p`
  @media ${devices.mobileL} {
    text-align: center;
  }
`
let AboutListItem = styled.li`
  margin-left: 30px;
`
let LicenseContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding-bottom: 30px;
  flex-wrap: nowrap;
  @media ${devices.mobileL} {
    flex-wrap: wrap;
  }
`
let LicenseItem = styled.div`
  width: 250px;
  margin: 10px;
  @media ${devices.mobileL} {
    width: 150px;
  }
`

const AboutPage = ({data}) => {
  const {content} = data.allWpContentNode.edges[0].node
  const options = {
    replace: (domNode) => {
      if (domNode.attribs && domNode.attribs.class === 'about-container') {
        return (<AboutContainer>{domToReact(domNode.children, options)}</AboutContainer>)
      }
      if (domNode.attribs && domNode.attribs.class === 'about-info') {
        return (<AboutInfo>{domToReact(domNode.children, options)}</AboutInfo>)
      }
      if (domNode.attribs && domNode.attribs.class === 'about-list-item') {
        return (<AboutListItem>{domToReact(domNode.children, options)}</AboutListItem>)
      }
      if (domNode.attribs && domNode.attribs.class === 'license-container') {
        return (<LicenseContainer>{domToReact(domNode.children, options)}</LicenseContainer>)
      }
      if (domNode.attribs && domNode.attribs.class === 'license-item') {
        return (<LicenseItem>{domToReact(domNode.children, options)}</LicenseItem>)
      }
    },
  }
  return (
    <Layout>
      <div>{parse(content, options)}</div>
    </Layout>
  )
}

export default AboutPage

export const pageQuery = graphql`
  query MyQuery {
    allWpContentNode(filter: {slug: {eq: "about-us"}}) {
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