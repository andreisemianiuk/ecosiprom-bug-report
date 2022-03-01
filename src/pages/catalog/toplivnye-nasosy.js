import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import parse, { domToReact } from 'html-react-parser'
import * as React from 'react'
import styled from 'styled-components'
import { CatalogLayout } from '../../components/CatalogLayout'
import Layout from '../../components/Layout'

let ProductWrapper = styled.section`
  display: flex;
  justify-content: space-evenly;
  /* flex-direction: column; */
  flex-wrap: wrap;
  width: 75%;
`

let Product = styled.div`
  width: 500px;
  display: flex;
  /* justify-content: center; */
  /* align-items: center; */
  flex-direction: column;
  height: fit-content;
  border: 1px solid #333;
  margin: 10px 0;
  padding: 5px;
`
let ImagesWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`

function ToplivnyeNasosyPage({ data }) {
  const { content } = data?.wpPage || ''
  const { nodes } = data?.allWpMediaItem
  const options = {
    replace: domNode => {
      if (domNode.attribs && domNode.attribs.class === 'item') {
        return <Product>{domToReact(domNode.children, options)}</Product>
      }
      if (domNode.attribs && domNode.attribs.class === 'image-wrapper') {
        const regex = new RegExp(`${domNode.attribs['data-image']}`, 'i')
        const images = nodes.filter(node => regex.test(node.title))
        // console.log('images >> ', images)
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

export default ToplivnyeNasosyPage

export const pageQuery = graphql`
  query ToplivnyeNasosyPageQuery {
    wpPage(title: { eq: "топливные насосы" }) {
      content
    }
    allWpMediaItem(filter: { title: { regex: "/tn-/" } }) {
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
