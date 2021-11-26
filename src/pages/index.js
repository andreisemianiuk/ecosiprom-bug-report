import * as React from 'react'
import Layout from '../components/Layout'
import {graphql} from 'gatsby'
import parse, {domToReact} from 'html-react-parser'
import {Slideshow} from '../components/Slideshow'

const HomePage = ({data}) => {
  const {content} = data.allWpContentNode.edges[0].node
  
  const options = {
    replace: (domNode) => {
      if (domNode.name === 'li') {
        return <li style={inlineStyles.li}>{domToReact(domNode.children, options)}</li>
      }
      if (domNode.name === 'ul') {
        return <ul style={inlineStyles.ul}>{domToReact(domNode.children, options)}</ul>
      }
      if (domNode.name === 'figure') return <></>
    },
  }
  
  return (
    <Layout>
      <div style={inlineStyles.sliderContainer}>
        <Slideshow autoplay={true}/>
      </div>
      {parse(content, options)}
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

const inlineStyles = {
  li: {
    // color: 'red'
  },
  ul: {
    // display: 'flex'
  },
  image: {
    display: 'flex',
    justifyContent: 'center',
  },
  sliderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}