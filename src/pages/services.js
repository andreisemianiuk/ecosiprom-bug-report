import * as React from 'react'
import Layout from '../components/Layout'
import {graphql} from 'gatsby'
import parse, {domToReact} from 'html-react-parser'
import styled from 'styled-components'
import {devices} from '../common/MediaQuery/media-query'
import ServicesBackgroundImage from '../components/ServicesBackgroundImage'

let ServicesContainer = styled.div`
  // display: flex;
  // justify-content: space-evenly;
  // padding-bottom: 30px;
  // flex-wrap: nowrap;
    // @media ${devices.mobileL} {
  //   flex-wrap: wrap;
  // }
`
let ServicesListItem = styled.div`
  // display: flex;
  // justify-content: space-evenly;
  // padding-bottom: 30px;
  // flex-wrap: nowrap;
    // @media ${devices.mobileL} {
  //   flex-wrap: wrap;
  // }
`

function ServicesPage({data}) {
  let {content} = data.allWpContentNode.edges[0].node
  // console.log('content >> ',content)
  let options = {
    replace: (domNode) => {
      if (domNode.attribs && domNode.attribs.class === 'services-container') {
        return (<ServicesContainer>
          {domToReact(domNode.children, options)}
        </ServicesContainer>)
      }
      if (domNode.attribs && domNode.attribs.class === 'services-list-item') {
        return (<ServicesListItem>{domToReact(domNode.children, options)}</ServicesListItem>)
      }
    },
  }
  return (
    <Layout>
      <ServicesBackgroundImage imageTitle={'proektirovanie'}/>
      <div>{parse(content, options)}</div>
    </Layout>
  )
}

export default ServicesPage

export const pageQuery = graphql`
  query ServicesQuery {
    allWpContentNode(filter: {slug: {eq: "services"}}) {
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