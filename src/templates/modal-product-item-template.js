import * as React from 'react'
import { graphql } from 'gatsby'
import parse, { domToReact } from 'html-react-parser'
import styled from 'styled-components'
import { GatsbyImage } from 'gatsby-plugin-image'
import Modal from '../components/Modal'

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
  justify-content: ${({ count }) => (count > 1 ? 'space-between' : 'center')};
  width: 50%;
`
let ProductTitle = styled.h3`
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  color: red;
  text-align: center;
  text-transform: uppercase;
`
const Instruction = styled.a`
  color: blue;
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
        <ImagesWrapper count={nodes.length}>
          {nodes.map((image, index) => (
            <GatsbyImage
              image={image.localFile.childImageSharp.gatsbyImageData}
              alt={image.altText}
              key={image.altText + index}
            />
          ))}
        </ImagesWrapper>
        {parse(content, options)}
      </Container>
    </Modal>
  )
}

export default ModalProductItemTemplate

export const pageQuery = graphql`
  query RegulyatoryDavleniyaGazaPageQuery($id: String!) {
    wpPage(id: { eq: $id }) {
      content
      title
      wpParent {
        node {
          uri
        }
      }
    }
    allWpMediaItem(filter: { wpParent: { node: { id: { eq: $id } } } }) {
      nodes {
        id
        title
        localFile {
          childImageSharp {
            gatsbyImageData(height: 250, placeholder: BLURRED)
          }
        }
        altText
      }
    }
  }
`
