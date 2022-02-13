import { graphql } from 'gatsby'
import parse, { domToReact } from 'html-react-parser'
import * as React from 'react'
import { useMediaQuery } from 'react-responsive'
import styled from 'styled-components'
import { check } from '../common/check/check'
import { devices } from '../common/MediaQuery/media-query'
import Layout from '../components/Layout'
import ServicesBackgroundImage from '../components/ServicesBackgroundImage'
import ServicesSlider from '../components/servicesSlider'

let ServicesContainer = styled.main`
  display: flex;
  justify-content: space-evenly;
  height: 90vh;
  padding-top: 50px;
  @media ${devices.mobileL} {
    width: 100%;
  }
`
let ServicesMobileContainer = styled.main`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 70vh;
  padding-top: 0;
`
let ServicesList = styled.div`
  height: fit-content;
  max-height: 90%;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 10px;
  border-radius: 5px;
`
let ServicesMobileList = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 5px;
`
let ServicesListItem = styled.div`
  max-width: 420px;
  text-align: center;
  border: 1px solid gray;
  border-radius: 3px;
  margin: 15px;
  padding: 5px 0;
  color: ${({ active }) => (active ? 'rgba(255, 255, 255)' : '#00637f')};
  background-color: ${({ active }) =>
    active ? '#00637f' : 'rgba(255, 255, 255)'};
  font-weight: bold;
  font-size: 0.8em;
  cursor: pointer;
  &:hover {
    background-color: #00637f;
    color: white;
  }
  @media ${devices.laptopL} {
    font-size: 0.7em;
    margin: 10px;
    max-width: 320px;
  }
`
let ServiceDescriptionWrapper = styled.div`
  width: 50%;
  height: 70vh;
  border-radius: 10px;
  overflow: hidden;
  @media ${devices.laptopL} {
    width: 100%;
  }
`
let ServiceDescription = styled.div`
  width: 100%;
  height: fit-content;
  max-height: 70vh;
  font-size: 1em;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.6);
  color: #222038;
  padding: 20px 30px;
  overflow-y: auto;
  @media ${devices.laptopL} {
    font-size: 0.8em;
  }
  @media ${devices.mobileL} {
    font-size: 0.8em;
    width: 100%;
  }
`
function ServicesPage({ data }) {
  let { content } = data.allWpContentNode.edges[0].node
  let [description, setDescription] = React.useState('ПРОЕКТИРОВАНИЕ')
  const isMobile = useMediaQuery({ query: '(max-width: 500px)' })
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
        let node = domNode.children
        let value = check(node)
        arrOfServices.push(key)
        desc[key] = value
        return <></>
      }
    },
  }

  return (
    <Layout>
      <>{parse(content, options)}</>
      <ServicesBackgroundImage description={description}>
        {isMobile ? (
          <ServicesMobileContainer>
            <ServicesMobileList>
              <ServicesSlider
                items={arrOfServices}
                desc={description}
                switchItem={setDescription}
              />
            </ServicesMobileList>
            <ServiceDescriptionWrapper>
              <ServiceDescription>
                {parse(desc[description])}
              </ServiceDescription>
            </ServiceDescriptionWrapper>
          </ServicesMobileContainer>
        ) : (
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
              <ServiceDescription>
                {parse(desc[description])}
              </ServiceDescription>
            </ServiceDescriptionWrapper>
          </ServicesContainer>
        )}
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
