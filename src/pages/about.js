import * as React from 'react'
import Layout from '../components/Layout'
import {graphql} from 'gatsby'

import parse from 'html-react-parser'

const AboutPage = ({data}) => {
  console.log('data >> ', data)
  const { content } = data.allWpContentNode.edges[0].node
  return (
    <Layout>
      About Page
      <div>{parse(content)}</div>
    </Layout>
  )
}

export default AboutPage

export const pageQuery = graphql`
  query MyQuery {
    allWpContentNode(filter: {slug: {eq: "installation-supervision"}}) {
      edges {
        node {
          ... on WpPage {
            id
            content
          }
        }
      }
    }
}

`