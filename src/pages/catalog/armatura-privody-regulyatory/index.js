import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby-plugin-modal-routing'
import parse, { domToReact } from 'html-react-parser'
import styled from 'styled-components'
import { CatalogLayout } from '../../../components/CatalogLayout'
import Layout from '../../../components/Layout'

let ProductWrapper = styled.section`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 75%;
`
const ProductLink = styled(Link)`
  text-decoration: none;
`
let Product = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  height: fit-content;
  border: 1px solid #333;
  margin: 10px 0;
  padding: 10px 5px 0;
`
let ProductTitle = styled.h3`
  font-family: Georgia, 'Times New Roman', Times, serif;
  text-align: center;
  font-size: 1.4rem;
`
let ImagesWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`
function ArmatyraPrivodyRegulyatoryPage({ data }) {
  const { content } = data?.wpPage || ''
  const { nodes } = data?.allWpMediaItem

  const options = {
    replace: domNode => {
      if (domNode.attribs && domNode.attribs.class === 'item') {
        return (
          <ProductLink
            to='/catalog/armatura-privody-regulyatory/regulyatory-davleniya-gaza/'
            asModal>
            <Product>{domToReact(domNode.children, options)}</Product>
          </ProductLink>
        )
      }
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
    },
  }

  return (
    <Layout>
      <CatalogLayout>
        <ProductWrapper>{parse(content, options)}</ProductWrapper>
      </CatalogLayout>
    </Layout>
  )
}

export default ArmatyraPrivodyRegulyatoryPage

export const pageQuery = graphql`
  query ArmatyraPrivodyRegulyatoryPageQuery {
    wpPage(title: { eq: "armatura,privody i regulyatory" }) {
      content
    }
    allWpMediaItem(filter: { title: { regex: "/apr-/" } }) {
      nodes {
        id
        title
        localFile {
          childImageSharp {
            gatsbyImageData(height: 100)
          }
        }
        altText
      }
    }
  }
`
