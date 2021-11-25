import * as React from 'react'
import Layout from '../components/Layout'
import {graphql} from 'gatsby'
import parse, {domToReact} from 'html-react-parser'

const HomePage = ({data}) => {
  const {content} = data.allWpContentNode.edges[0].node
  
  const options = {
    replace: (domNode) => {
      if (domNode.name === 'li') {
        return <li style={styles.li}>{domToReact(domNode.children,options)}</li>
      }
      if (domNode.name === 'ul') {
        return <ul style={styles.ul}>{domToReact(domNode.children,options)}</ul>
      }
      if (domNode.name === 'figure') {
        return null
      }
    }
  }
  
  return (
    <Layout>
      {/*<img/>*/}
      {parse(content,options)}
    </Layout>
  )
}

export default HomePage

export const pageQuery = graphql`
  query {
    allWpContentNode(filter: {slug: {eq: "main"}}) {
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

const styles = {
  li: {
    // color: 'red'
  },
  ul: {
    // display: 'flex'
  }
}