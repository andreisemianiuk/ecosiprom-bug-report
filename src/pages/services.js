import * as React from 'react'
import Layout from '../components/Layout'
import { graphql } from 'gatsby'
import parse, { domToReact } from 'html-react-parser'
import styled from 'styled-components'
import { devices } from '../common/MediaQuery/media-query'
import ServicesBackgroundImage from '../components/ServicesBackgroundImage'

let ServicesContainer = styled.main`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 90vh;
  // padding-bottom: 30px;
  // flex-wrap: nowrap;
  // @media ${devices.mobileL} {
  //   flex-wrap: wrap;
  // }
`
let ServicesList = styled.div`
  height: fit-content;
  background-color: rgba(255, 255, 255, 0.5);
  margin-top: 30px;
  padding: 10px;
  border-radius: 5px;
`
let ServicesListItem = styled.div`
  max-width: 320px;
  text-align: center;
  border: 1px solid gray;
  border-radius: 2px;
  margin: 10px;
  padding: 5px 0;
  color: ${({ active }) => (active ? 'rgba(255, 255, 255)' : '#00637f')};
  background-color: ${({ active }) =>
    active ? '#00637f' : 'rgba(255, 255, 255)'};
  font-weight: bold;
  font-size: 0.75em;
  cursor: pointer;
  &:hover {
    background-color: #00637f;
    color: white;
  }
  // padding-bottom: 30px;
  // flex-wrap: nowrap;
  // @media ${devices.mobileL} {
  //   flex-wrap: wrap;
  // }
`
let ServiceDescriptionWrapper = styled.div`
  width: 40%;
  /* height: fit-content; */
  font-size: 0.8em;
  background-color: rgba(255, 255, 255, 0.8);
  color: #333;
  padding: 20px 30px;
  /* margin-top: 50px; */
`
function ServicesPage({ data }) {
  let { content } = data.allWpContentNode.edges[0].node
  // console.log('content >> ',content)

  let [description, setDescription] = React.useState('ПРОЕКТИРОВАНИЕ')

  let handleClick = e => {
    let name = e.target.innerText
    setDescription(name)
  }
  let arrOfServices = []
  let desc = {}
  let options = {
    replace: domNode => {
      if (domNode.attribs && domNode.attribs.class === 'wp-block-group') {
        return <>{domToReact(domNode.children[0].children, options)}</>
      }
      if (domNode.attribs && domNode.attribs.class === 'services-container') {
        return <>{domToReact(domNode.children[0].children, options)}</>
      }
      if (
        domNode.attribs &&
        domNode.attribs.class === 'services-item-description'
      ) {
        return <></>
      }
      if (domNode.attribs && domNode.attribs.data) {
        let key = domNode.attribs.data
        let value = domNode.attribs.text
        arrOfServices.push(key)
        desc[key] = value
        console.log('desc >> ', desc[description])
        // console.log('arrOfServices >> ', arrOfServices)
        return <></>
      }
    },
  }
  return (
    <Layout>
      <>{parse(content, options)}</>
      <ServicesBackgroundImage description={description}>
        <ServicesContainer>
          <ServicesList>
            {arrOfServices.map(item => {
              return (
                <ServicesListItem
                  active={item === description}
                  onClick={handleClick}
                  key={item}>
                  {item}
                </ServicesListItem>
              )
            })}
          </ServicesList>
          <ServiceDescriptionWrapper>
            {parse(desc[description])}
          </ServiceDescriptionWrapper>
        </ServicesContainer>
      </ServicesBackgroundImage>
    </Layout>
  )
}

export default ServicesPage

export const pageQuery = graphql`
  query ServicesQuery {
    allWpContentNode(filter: { slug: { eq: "services" } }) {
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
