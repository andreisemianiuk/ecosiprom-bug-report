import * as React from 'react'
import { graphql, Link } from 'gatsby'
import parse, { domToReact } from 'html-react-parser'
import styled from 'styled-components'
import Layout from '../../components/Layout'
import { CatalogLayout } from '../../components/CatalogLayout'

let Container = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 50px 20px;
`
let Sidebar = styled.div`
  display: flex;
  /* justify-content: center; */
  /* align-items: center; */
  flex-direction: column;
  /* width: 300px; */
  padding-left: 50px;
`
let Content = styled.div`
  display: flex;
  width: 80%;
`
let MenuItem = styled.li`
  list-style: none;
  cursor: pointer;
`
let CommonText = styled.div`
  color: chocolate;
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
        <CommonText>{contentHTML}</CommonText>
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
