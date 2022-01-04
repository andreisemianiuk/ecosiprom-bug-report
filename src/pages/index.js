import * as React from 'react'
import Layout from '../components/Layout'
import {graphql} from 'gatsby'
import parse, {domToReact} from 'html-react-parser'
import {Slideshow} from '../components/Slideshow'
import styled from 'styled-components'
import {devices} from '../common/MediaQuery/media-query'
import {GatsbyImage,getImage} from 'gatsby-plugin-image'

let SliderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${devices.mobileL} {
    display: none;
  }
`
let MainServicesList = styled.ul`
  color: #ffffff;
  background-color: #00637f;
  padding: 5px 5px 10px;
  margin: 20px 0;
  @media ${devices.mobileL} {
    padding: 0;
  }
`
let MainServicesItem = styled.li`
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
let MainServicesUnderLine = styled.div`
  width: 90%;
  max-width: 650px;
  height: 10px;
  background: linear-gradient(116deg, #d3f5f5 0%, #f9fbfd 98%, transparent 98%, transparent 100%);

  &:last-child {
    display: none;
  }
`
let Services = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin: 30px 0;
  @media ${devices.mobileL} {
    margin: 10px 5px
  }
`
let ServiceItem = styled.div`
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
let ServicesImage = styled.figure`
  display: flex;
  justify-content: center;
  align-items: center;
`
let ServicesTitle = styled.p`
  text-transform: uppercase;
  text-align: center;
  color: #00637f;
  font-size: 1.2em;
  font-weight: bolder;
  padding: 0 5px;
`
let ServicesList = styled.ul`
  padding: 0 10px 0 30px;
`
let ServicesListItem = styled.li`
  font-size: 1.1em;
`

let EquipmentListContainer = styled.div`

`
let EquipmentList = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 20px 10px 40px;
  flex-wrap: wrap;
  @media ${devices.mobileL} {
    margin: 0;
  }
`
let EquipmentItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
`
let EquipmentTitle = styled.h3`
  text-align: center;
  color: #00637f;
`
function HomePage ({data})  {
  let {content} = data.allWpContentNode.edges[0].node
  
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
      // if (domNode.attribs && domNode.attribs.class === 'wp-block-group equipment-partners-container') {
      //   return <EquipmentList>{domToReact(domNode.children[0].children, options)}</EquipmentList>
      // }
      // if (domNode.attribs && domNode.attribs.class === 'equipment-title') {
      //   return <EquipmentTitle>{domToReact(domNode.children, options)}</EquipmentTitle>
      // }
      // if (domNode.attribs && domNode.attribs.class === 'wp-block-image size-full equipment-item') {
      //   return <EquipmentItem>{domToReact(domNode.children, options)}</EquipmentItem>
      // }
    },
  }
  // const logoImage = getImage(data.allImageSharp.ed)
  let logoImagesContainer = data.allImageSharp.edges
  return (
    <Layout>
      <SliderContainer>
        <Slideshow autoplay={true}/>
      </SliderContainer>
      {parse(content, options)}
      <EquipmentListContainer>
        <EquipmentTitle>Мы работаем с компаниями</EquipmentTitle>
        <EquipmentList>
        {logoImagesContainer.map(img => /logo-/.test(img.node.fluid.src) &&
          <EquipmentItem><GatsbyImage image={img.node.gatsbyImageData} alt={img.node.id}/></EquipmentItem>)}
      </EquipmentList>
      </EquipmentListContainer>
      <EquipmentListContainer>
        <EquipmentTitle>Мы работаем с оборудованием</EquipmentTitle>
        <EquipmentList>
        {logoImagesContainer.map(img => /-logo/.test(img.node.fluid.src) &&
          <EquipmentItem><GatsbyImage image={img.node.gatsbyImageData} alt={img.node.id}/></EquipmentItem>)}
      </EquipmentList>
      </EquipmentListContainer>
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
      edges {
        node {
          id
          gatsbyImageData
          fluid {
            src
          }
        }
      }
    }
  }
`