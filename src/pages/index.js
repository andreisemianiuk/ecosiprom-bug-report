import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import parse, { domToReact } from "html-react-parser"
import * as React from "react"
import styled from "styled-components"
import { devices } from "../common/MediaQuery/media-query"
import Layout from "../components/Layout"
import { Logos } from "../components/Logos"
import { Slideshow } from "../components/Slideshow"

let SliderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${devices.mobileL} {
    display: none;
  }
`
let MainServicesList = styled.ul`
  /* font-family: Verdana, sans-serif; */
  color: #dedbe6;
  background-color: #00637f;
  padding: 5px 0 10px;
  margin: 20px 0;
  @media ${devices.mobileL} {
    padding: 0;
  }
`
let MainServicesItem = styled.li`
  font-size: 1.2em;
  font-weight: bold;
  max-width: 700px;
  padding-left: 30px;
  margin: 20px 0;
  list-style: none;
  @media ${devices.mobileL} {
    font-size: 1.3em;
    padding: 10px 10px 10px 20px;
    margin: 0;
  }
`
let MainServicesUnderLine = styled.div`
  width: 100%;
  max-width: 650px;
  height: 10px;
  background: linear-gradient(
    116deg,
    #fff 0%,
    #dedbe6 98%,
    transparent 98%,
    transparent 100%
  );

  &:last-child {
    display: none;
  }
`
let Services = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  /* font-family: Verdana, sans-serif; */
  margin: 30px 0;
  @media ${devices.mobileL} {
    margin: 10px 5px;
  }
`
let ServiceItem = styled(Link)`
  max-width: 350px;
  color: #292734;
  margin: 5px;
  text-decoration: none;
  padding: 20px 10px;

  &:hover {
    cursor: pointer;
    box-shadow: 0 14px 28px rgba(77, 99, 135, 0.25),
      0 10px 10px rgba(0, 0, 0, 0.22);
  }

  @media ${devices.mobileL} {
    max-width: 100%;
    padding: 20px 0 0;
    margin: 0;
    &:hover {
      transform: scale(1);
    }
  }
`
let ServicesImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
let ServicesTitle = styled.p`
  text-transform: uppercase;
  text-align: center;
  color: #c42034;
  /* font-size: 1.2em; */
  font-weight: bolder;
  padding: 10px 5px;
`
let ServicesList = styled.ul`
  font-size: 1em;
  padding: 0 10px 0 30px;
`
let ServicesListItem = styled.li`
  /* font-size: 1.1em; */
`

function HomePage({ data }) {
  let { content } = data.allWpContentNode.edges[0].node
  let services = data.allWpMediaItem.edges.filter(node =>
    /services/.test(node.node.title)
  )

  let options = {
    replace: domNode => {
      if (
        domNode.attribs &&
        domNode.attribs.class === "partners-icons-wrapper"
      ) {
        return <></>
      }
      if (domNode.attribs && domNode.attribs.class === "main-services") {
        return (
          <MainServicesList>
            {domToReact(domNode.children, options)}
          </MainServicesList>
        )
      }
      if (domNode.attribs && domNode.attribs.class === "main-services-item") {
        return (
          <>
            <MainServicesItem>
              {domToReact(domNode.children, options)}
            </MainServicesItem>
            <MainServicesUnderLine />
          </>
        )
      }
      if (domNode.attribs && domNode.attribs.class === "services-container") {
        return <Services>{domToReact(domNode.children, options)}</Services>
      }
      if (domNode.attribs && domNode.attribs.class === "services-item") {
        return (
          <ServiceItem to="/services">
            {domToReact(domNode.children, options)}
          </ServiceItem>
        )
      }
      if (domNode.attribs && domNode.attribs.class === "services-title") {
        return (
          <ServicesTitle>{domToReact(domNode.children, options)}</ServicesTitle>
        )
      }
      if (
        domNode.attribs &&
        domNode.attribs.class === "services-image-wrapper"
      ) {
        let dataAttribute = new RegExp(`${domNode.next.attribs.data}`)

        let image = services.find(
          item =>
            domNode.next.attribs.data && dataAttribute.test(item.node.title)
        )
        if (image) {
          return (
            <ServicesImage>
              <GatsbyImage
                image={image.node.localFile.childImageSharp.gatsbyImageData}
                alt={image.node.title}
              />
            </ServicesImage>
          )
        } else {
          return <div>image</div>
        }
      }
      if (domNode.attribs && domNode.attribs.class === "services-list") {
        return (
          <ServicesList>{domToReact(domNode.children, options)}</ServicesList>
        )
      }
      if (domNode.attribs && domNode.attribs.class === "services-list-item") {
        return (
          <ServicesListItem>
            {domToReact(domNode.children, options)}
          </ServicesListItem>
        )
      }
      if (
        domNode.attribs &&
        domNode.attribs.class === "main-slideshow-images"
      ) {
        return <></>
      }
    },
  }

  return (
    <Layout>
      <SliderContainer>
        <Slideshow autoplay={true} />
      </SliderContainer>
      {parse(content, options)}
      <Logos type={"компаниями"} />
      <Logos type={"оборудованием"} />
    </Layout>
  )
}

export default HomePage

export const pageQuery = graphql`
  query {
    allWpContentNode(filter: { slug: { eq: "main" } }) {
      edges {
        node {
          ... on WpPage {
            id
            content
          }
        }
      }
    }
    allWpMediaItem(filter: { title: { regex: "/services/" } }) {
      edges {
        node {
          title
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  }
`
