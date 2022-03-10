import * as React from 'react'
import { graphql } from 'gatsby'
import parse, { domToReact } from 'html-react-parser'
import styled from 'styled-components'
import { GatsbyImage } from 'gatsby-plugin-image'
import Modal from '../components/Modal'
import { devices } from '../common/MediaQuery/media-query'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  /* height: 100%; */
  text-decoration: none;
`
let ProductDescription = styled.div`
  padding: 50px 100px 0;
  font-size: 1.4rem;
  @media ${devices.desktop} {
    font-size: 1.2rem;
  }
  @media ${devices.mobileL} {
    font-size: 1rem;
    padding: 10px;
  }
`
let ImagesWrapper = styled.div`
  display: flex;
  justify-content: ${({ count }) => (count > 1 ? 'space-between' : 'center')};
  width: clamp(300px, 50%, 500px);
  @media ${devices.mobileL} {
    /* width: 90%; */
  }
`
let ProductTitle = styled.h3`
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  color: red;
  text-align: center;
  text-transform: uppercase;

  @media ${devices.mobileL} {
    font-size: 1.2em;
  }
`
const Instruction = styled.a`
  color: blue;
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
  const options = {
    replace: domNode => {
      if (domNode.attribs && domNode.attribs.class === 'image-wrapper') {
        const regex = new RegExp(`${domNode.attribs['data-image']}`, 'i')
        const images = nodes.filter(node => regex.test(node.title))
        return (
          <ImagesWrapper count={images.length}>
            {images.map((image, index) => (
              <GatsbyImage
                // imgStyle={{ height: '100px' }}
                image={image.localFile.childImageSharp.gatsbyImageData}
                alt={image.altText}
                key={image.altText + index}
              />
            ))}
          </ImagesWrapper>
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
