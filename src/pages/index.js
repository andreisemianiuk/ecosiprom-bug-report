import * as React from 'react'
import Layout from '../components/Layout'
import {graphql} from 'gatsby'
import parse, {domToReact} from 'html-react-parser'
import {Slideshow} from '../components/Slideshow'
import styled from 'styled-components'
import {devices} from '../common/MediaQuery/media-query'
import {GatsbyImage} from 'gatsby-plugin-image'

const SliderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${devices.mobileL} {
    display: none;
  }
`
const MainServicesList = styled.ul`
  color: #ffffff;
  background-color: #00637f;
  padding: 5px 5px 10px;
  margin: 20px 0;
  @media ${devices.mobileL} {
    padding: 0;
  }
`
const MainServicesItem = styled.li`
  font-size: 1.5em;
  font-weight: bold;
  max-width: 700px;
  padding-left: 50px;
  margin: 20px 0;
  list-style: none;
  @media ${devices.mobileL} {
    font-size: 1.3em;
    padding: 10px 10px 10px 20px;
    margin: 0;
  }
`
const MainServicesUnderLine = styled.div`
  width: 90%;
  max-width: 650px;
  height: 10px;
  background: linear-gradient(116deg, #d3f5f5 0%, #f9fbfd 98%, transparent 98%, transparent 100%);

  &:last-child {
    display: none;
  }
`
const Services = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin: 30px 0;
  @media ${devices.mobileL} {
    margin: 10px 5px
  }
`
const ServiceItem = styled.div`
  max-width: 350px;
  margin: 5px;

  &:hover {
    transform: scale(1.1);
    cursor: pointer;
    box-shadow: 0 14px 28px rgba(77, 99, 135, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }

  @media ${devices.mobileL} {
    max-width: 100%;
    &:hover {
      transform: scale(1);
    }
  }
`
const ServicesImage = styled.figure`
  display: flex;
  justify-content: center;
  align-items: center;
`
const ServicesTitle = styled.p`
  text-transform: uppercase;
  text-align: center;
  color: #00637f;
  font-size: 1.2em;
  font-weight: bolder;
  padding: 0 5px;
`
const ServicesList = styled.ul`
  padding: 0 10px 0 30px;
`
const ServicesListItem = styled.li`
  font-size: 1.1em;
`
const PartnersList = styled.div`
  display: flex;
  justify-content: space-between;
  //align-items: center;
  flex-wrap: wrap;
`
let PartnerItem = styled.div`
  max-height: 50px;
  //width: 200px;
`
const HomePage = ({data}) => {
  let {content} = data.allWpContentNode.edges[0].node
  let logos = data.allImageSharp.nodes.map(node => node.fluid)
  console.log('logos >> ', logos)
  
  const options = {
    replace: (domNode) => {
      if (domNode.attribs && domNode.attribs.class === 'main-services') {
        return (<MainServicesList>{domToReact(domNode.children, options)}</MainServicesList>)
      }
      if (domNode.attribs && domNode.attribs.class === 'main-services-item') {
        return (
          <>
            <MainServicesItem>
              {domToReact(domNode.children, options)}
            </MainServicesItem>
            <MainServicesUnderLine/>
          </>)
      }
      if (domNode.attribs && domNode.attribs.class === 'wp-block-group services') {
        return <Services>{domToReact(domNode.children[0].children, options)}</Services>
      }
      if (domNode.attribs && domNode.attribs.class === 'wp-block-group service-item') {
        return (<ServiceItem>
          {domToReact(domNode.children[0].children, options)}
        </ServiceItem>)
      }
      if (domNode.attribs && domNode.attribs.class === 'wp-block-image size-full services-image') {
        return <ServicesImage>{domToReact(domNode.children, options)}</ServicesImage>
      }
      if (domNode.attribs && domNode.attribs.class === 'services-title') {
        return <ServicesTitle>{domToReact(domNode.children, options)}</ServicesTitle>
      }
      if (domNode.attribs && domNode.attribs.class === 'services-list') {
        return <ServicesList>{domToReact(domNode.children, options)}</ServicesList>
      }
      if (domNode.attribs && domNode.attribs.class === 'services-list-item') {
        return <ServicesListItem>{domToReact(domNode.children, options)}</ServicesListItem>
      }
      // if (domNode.attribs && domNode.attribs.class === 'partner-item') {
      //   console.log('partner item domNode.children >> ', domNode.children)
      //   return <PartnerItem>{domToReact(domNode.children, options)}</PartnerItem>
      // }
      // if (domNode.attribs && domNode.attribs.class === 'partners-container') {
      //   return <PartnersList>{domToReact(domNode.children, options)}</PartnersList>
      // }
      
    },
  }
  return (
    <Layout>
      <SliderContainer>
        <Slideshow autoplay={true}/>
      </SliderContainer>
      {parse(content, options)}
      <PartnersList>
        {
          logos.map(logo => (<PartnerItem><GatsbyImage
            key={logo.src}
            alt={logo.src}
            image={{images: {fallback: {src: logo.src}}, layout: 'constrained', height: 50}}
          /></PartnerItem>))
        }
      </PartnersList>
    </Layout>
  )
}

export default HomePage

export const pageQuery = graphql`
  query {
    allWpContentNode(filter: {slug: {eq: "main"}}) {
      edges {
        node {
          ... on WpPage {
            id
            content
          }
        }
      }
    }
    allImageSharp(filter: {fluid: {src: {regex: "/logo/"}}}) {
      nodes {
        fluid(fit: FILL, cropFocus: CENTER) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`