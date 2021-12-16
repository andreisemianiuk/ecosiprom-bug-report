import * as React from 'react'
import Layout from '../components/Layout'
import {graphql} from 'gatsby'
import parse, {domToReact} from 'html-react-parser'
import {Slideshow} from '../components/Slideshow'
import {useMediaQuery} from 'react-responsive'
import styled from 'styled-components'
import {devices} from '../common/MediaQuery/media-query'

const SliderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${devices.mobileL} {
    display: none;
  }
`
const Services = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  
  @media ${devices.mobileL} {
    //display: flex;
    //flex-direction: column;
  }
`
const ServiceItem = styled.div`
  width: 350px;
`
const Li = styled.li`
  list-style: none;
`
const Ul = styled.ul`
  padding-left: 50px;
  @media ${devices.mobileL} {
    padding-left: 0;
  }
`
const P = styled.p`
  text-transform: uppercase;
  text-align: center;
  font-weight: bolder;
`
const Figure = styled.figure`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`

const HomePage = ({data}) => {
  const {content} = data.allWpContentNode.edges[0].node
  
  const options = {
    replace: (domNode) => {
      if (domNode.name === 'figure') {
        return <Figure>{domToReact(domNode.children, options)}</Figure>
      }
      if (domNode.attribs && domNode.attribs.class === 'wp-block-group services') {
        return <Services>{domToReact(domNode.children[0].children, options)}</Services>
      }
      if (domNode.attribs && domNode.attribs.class === 'wp-block-group service-item') {
        return (<ServiceItem>
          {domToReact(domNode.children[0].children, options)}
        </ServiceItem>)
      }
      if (domNode.name === 'ul') {
        return <Ul>{domToReact(domNode.children, options)}</Ul>
      }
      if (domNode.name === 'li') {
        return <Li>- {domToReact(domNode.children, options)}</Li>
      }
      if (domNode.name === 'p') {
        return <P>{domToReact(domNode.children, options)}</P>
      }
      // if (domNode.attribs && domNode.attribs.class === 'gatsby-image-wrapper') {
      //   return <Image>{domToReact(domNode.children, options)}</Image>
      // }
    },
  }
  
  return (
    <Layout>
      <SliderContainer>
        <Slideshow autoplay={true}/>
      </SliderContainer>
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

