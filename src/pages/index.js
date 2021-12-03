import * as React from 'react'
import Layout from '../components/Layout'
import {graphql} from 'gatsby'
import parse, {domToReact} from 'html-react-parser'
import {Slideshow} from '../components/Slideshow'

const HomePage = ({data}) => {
  const {content} = data.allWpContentNode.edges[0].node
  
  const options = {
    replace: (domNode) => {
      if (domNode.name === 'figure') {
        return <figure style={inlineStyles.figure}>{domToReact(domNode.children, options)}</figure>
      }
      if (domNode.attribs && domNode.attribs.class === 'wp-block-group services') {
        return <div style={inlineStyles.services}>{domToReact(domNode.children[0].children, options)}</div>
      }
      if (domNode.attribs && domNode.attribs.class === 'wp-block-group service-item') {
        return <div style={inlineStyles.serviceItem}>{domToReact(domNode.children[0].children, options)}</div>
      }
      if (domNode.name === 'ul') {
        return <ul style={inlineStyles.ul}>{domToReact(domNode.children, options)}</ul>
      }
      if (domNode.name === 'li') {
        return <li style={inlineStyles.li}>- {domToReact(domNode.children, options)}</li>
      }
      if (domNode.name === 'p') {
        return <p style={inlineStyles.p}>{domToReact(domNode.children, options)}</p>
      }
    }
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
  services: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap'
  },
  serviceItem: {
    width: '350px'
  },
  li: {
    listStyle:'none'
  },
  ul: {
    paddingLeft:'50px'
  },
  p: {
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: 'bolder'
  },
  figure: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    display: 'flex',
    justifyContent: 'center',
  },
  sliderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
}