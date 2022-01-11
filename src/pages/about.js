import * as React from 'react'
import Layout from '../components/Layout'
import {graphql} from 'gatsby'
import parse, {domToReact} from 'html-react-parser'
import styled from 'styled-components'
import {devices} from '../common/MediaQuery/media-query'
import {GatsbyImage} from 'gatsby-plugin-image'

let AboutContainer = styled.div`
  padding: 50px 0;
  @media ${devices.mobileL} {
    padding-bottom: 20px;
  }
`
let AboutInfo = styled.p`
  padding-left: 20px;
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
  @media ${devices.mobileS} {
    margin: 0;
  }
`

const AboutPage = ({data}) => {
  let {content} = data.allWpContentNode.edges[0].node
  let photos = data.allWpMediaItem.nodes
  console.log('photos >> ', photos)
  
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
    },
  }
  return (
    <Layout>
      {parse(content, options)}
      <LicenseContainer>
        {photos.map(item => (<LicenseItem key={item.id}>
          <GatsbyImage
            image={item.localFile.childImageSharp.gatsbyImageData}
            alt={item.altText}
          />
        </LicenseItem>))
        }
      </LicenseContainer>
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
    allWpMediaItem(filter: {title: {regex: "/attestat|license|sertifikat/"}}) {
      nodes {
        id
        title
        localFile {
          childImageSharp {
            gatsbyImageData(width: 250, formats: PNG)
          }
        }
        altText
      }
    }
  }
`