import * as React from 'react'
import { graphql } from 'gatsby'
import parse from 'html-react-parser'
import styled from 'styled-components'
import { devices } from '../../common/MediaQuery/media-query'
import { CatalogLayout } from '../../components/CatalogLayout'
import Layout from '../../components/Layout'

let Container = styled.section`
  width: 73%;
  padding: min(10vw, 50px);
  @media ${devices.mobileL} {
    width: 100%;
    padding: 0 20px 30px;
  }
`
let CommonText = styled.div`
  /* color: chocolate; */
`

function CatalogPage({ data, location: { pathname } }) {
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
