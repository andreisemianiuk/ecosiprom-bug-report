import * as React from 'react'
import { graphql, Link } from 'gatsby'
import parse, { domToReact } from 'html-react-parser'
import styled from 'styled-components'
import Layout from '../../components/Layout'
import { CatalogLayout } from '../../components/CatalogLayout'

let Container = styled.section`
  width: 80%;
  padding: min(10vw, 50px);
`
let CommonText = styled.div`
  /* color: chocolate; */
`

function CatalogPage({ data }) {
  let { content } = data.wpPage

  let contentHTML
  const options = {
    replace: domNode => {
      if (domNode.attribs && domNode.attribs.class === 'sidebar') {
        return <></>
      }
      if (domNode.attribs && domNode.attribs.class === 'common-text') {
        contentHTML = domNode.children[0].data
        return <></>
      }
    },
  }
  parse(content, options)
  return (
    <Layout>
      <CatalogLayout>
        <Container>
          <CommonText>{contentHTML}</CommonText>
        </Container>
      </CatalogLayout>
    </Layout>
  )
}

export default CatalogPage

export const pageQuery = graphql`
  query CatalogQuery {
    wpPage(title: { eq: "Каталог" }) {
      content
    }
  }
`

// allWpMediaItem(filter: { title: { regex: "//" } }) {
//       nodes {
//         id
//         title
//         localFile {
//           childImageSharp {
//             gatsbyImageData
//           }
//         }
//         altText
//       }
//     }
