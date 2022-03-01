import * as React from 'react'
import styled from 'styled-components'
import Modal from '../../../components/Modal'
import parse, { domToReact } from 'html-react-parser'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 80%;
  text-decoration: none;
`
let ProductDescription = styled.div`
  padding: 50px 100px 0;
  font-size: 1.4rem;
`
let ImagesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
`
let ProductTitle = styled.h3`
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  color: red;
  text-align: center;
  text-transform: uppercase;
`
const Insruction = styled.a`
  color: blue;
`
const RegulyatoryDavleniyaGaza = ({ data }) => {
  const { content } = data?.wpPage || ''
  const { nodes } = data?.allWpMediaItem
  const options = {
    replace: domNode => {
      if (domNode.attribs && domNode.attribs.class === 'image-wrapper') {
        const regex = new RegExp(`${domNode.attribs['data-image']}`, 'i')
        const images = nodes.filter(node => regex.test(node.title))

        return (
          <ImagesWrapper>
            {images.map(image => (
              <GatsbyImage
                image={image.localFile.childImageSharp.gatsbyImageData}
                alt={image.altText}
              />
            ))}
          </ImagesWrapper>
        )
      }
      if (domNode.attribs && domNode.attribs.class === 'title') {
        return (
          <ProductTitle>{domToReact(domNode.children, options)}</ProductTitle>
        )
      }
      if (domNode.attribs && domNode.attribs.class === 'download') {
        return (
          <Insruction href={`${domNode.attribs['data-link']}`} download>
            {domToReact(domNode.children, options)}
          </Insruction>
        )
      }
      if (domNode.attribs && domNode.attribs.class === 'description') {
        return (
          <ProductDescription>
            {domToReact(domNode.children, options)}
          </ProductDescription>
        )
      }
    },
  }
  return (
    <Modal location={'/catalog/armatura-privody-regulyatory/'}>
      <Container>{parse(content, options)}</Container>
    </Modal>
  )
}

export default RegulyatoryDavleniyaGaza

export const pageQuery = graphql`
  query RegulyatoryDavleniyaGazaPageQuery {
    wpPage(title: { eq: "регуляторы давления газа" }) {
      content
    }
    allWpMediaItem(filter: { title: { regex: "/Регуляторы газа/" } }) {
      nodes {
        id
        title
        localFile {
          childImageSharp {
            gatsbyImageData(height: 250)
          }
        }
        altText
      }
    }
  }
`
