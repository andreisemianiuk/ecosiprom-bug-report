import * as React from 'react'
import { graphql } from 'gatsby'
import parse, { domToReact } from 'html-react-parser'
import styled from 'styled-components'
import { GatsbyImage } from 'gatsby-plugin-image'
import Modal from '../components/Modal'
import { devices } from '../common/MediaQuery/media-query'

let Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-decoration: none;
`
let ProductDescription = styled.div`
  padding: 50px 100px 10px;
  font-size: 1.4rem;
  @media ${devices.desktop} {
    font-size: 1.2rem;
  }
  @media ${devices.tablet} {
    padding: 30px 20px 10px;
  }
  @media ${devices.mobileL} {
    font-size: 1rem;
    padding: 10px 20px;
  }
`
let ImagesContaier = styled.div`
  display: flex;
  justify-content: ${({ count }) => (count > 1 ? 'space-between' : 'center')};
  width: clamp(300px, 70%, 500px);
  padding: 20px 0;
`
let GatsbyImageWrapper = styled.div`
  padding: 0 10px;
`
let ProductTitle = styled.h3`
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  color: #d43d3d;
  text-align: center;
  text-transform: uppercase;

  @media ${devices.mobileL} {
    font-size: 1.2em;
  }
`
let Instruction = styled.a`
  color: #00637f;
  margin: 10px 0 30px;
`
const ModalProductItemTemplate = ({
  data: {
    wpPage: {
      content,
      title,
      wpParent: {
        node: { uri },
      },
    },
    allWpMediaItem: { nodes },
  },
}) => {
  let options = {
    replace: domNode => {
      if (domNode.attribs && domNode.attribs.class === 'image-wrapper') {
        const regex = new RegExp(`${domNode.attribs['data-image']}`, 'i')
        const images = nodes.filter(node => regex.test(node.title))
        return (
          <ImagesContaier count={images.length}>
            {images.map((image, index) => (
              <GatsbyImageWrapper>
                <GatsbyImage
                  image={image.localFile.childImageSharp.gatsbyImageData}
                  alt={image.altText}
                  key={image.altText + index}
                />
              </GatsbyImageWrapper>
            ))}
          </ImagesContaier>
        )
      }
      if (domNode.attribs && domNode.attribs.class === 'download') {
        return (
          <Instruction href={`${domNode.attribs['data-link']}`} download>
            {domToReact(domNode.children, options)}
          </Instruction>
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
    <Modal location={uri}>
      <Container>
        <ProductTitle>{title}</ProductTitle>
        {parse(content, options)}
      </Container>
    </Modal>
  )
}

export default ModalProductItemTemplate

export const pageQuery = graphql`
  query ModalProductItemTemplateQuery($id: String!, $parentId: String!) {
    wpPage(id: { eq: $id }) {
      content
      title
      wpParent {
        node {
          uri
        }
      }
    }
    allWpMediaItem(filter: { wpParent: { node: { id: { eq: $parentId } } } }) {
      nodes {
        id
        title
        localFile {
          childImageSharp {
            gatsbyImageData(height: 200, placeholder: BLURRED)
          }
        }
        altText
      }
    }
  }
`
