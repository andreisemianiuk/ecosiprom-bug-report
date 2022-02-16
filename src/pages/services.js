import { graphql } from 'gatsby'
import parse, { domToReact } from 'html-react-parser'
import * as React from 'react'
import { useMediaQuery } from 'react-responsive'
import styled from 'styled-components'
import { check } from '../common/check/check'
import { devices } from '../common/MediaQuery/media-query'
import Layout from '../components/Layout'
import ServicesBackgroundImage from '../components/ServicesBackgroundImage'
import { ServicesSlider } from '../components/ServicesSlider'

let ServicesContainer = styled.main`
  display: flex;
  justify-content: space-evenly;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  height: 90vh;
  padding-top: 70px;
  @media ${devices.laptopL} {
    padding-top: 50px;
  }
  @media ${devices.mobileL} {
    width: 100%;
  }
`
let ServicesMobileContainer = styled.main`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`
let ServicesList = styled.div`
  height: fit-content;
  max-height: 90%;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 10px;
  border-radius: 5px;
  @media ${devices.tablet} {
    padding: 5px;
  }
`
let ServicesMobileList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 0;
  border-radius: 0;
  @media ${devices.mobileL} {
    /* border-radius: 0; */
    /* padding: 0; */
  }
`
let ServicesListItem = styled.div`
  max-width: 600px;
  text-align: center;
  border: 1px solid gray;
  border-radius: 5px;
  margin: 15px;
  padding: 10px 5px;
  color: ${({ active }) => (active ? 'rgba(255, 255, 255)' : '#00637f')};
  background-color: ${({ active }) =>
    active ? '#00637f' : 'rgba(255, 255, 255)'};
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: 1.2rem;
  cursor: pointer;
  &:hover {
    background-color: #00637f;
    color: white;
  }
  @media ${devices.laptopL} {
    font-size: 0.8rem;
    margin: 10px;
    padding: 4px 2px;
    max-width: 420px;
  }
  @media ${devices.laptop} {
    max-width: 320px;
  }
  @media ${devices.tablet} {
    max-width: 270px;
    font-size: 0.7rem;
    padding: 4px 2px;
    margin: 10px 5px;
  }
`
let ServiceDescriptionWrapper = styled.div`
  width: 50%;
  height: 70vh;
  border-radius: 10px;
  overflow: hidden;
  @media ${devices.mobileL} {
    width: 100%;
    height: auto;
    border-radius: 0;
    margin: 20px 0;
  }
`
let ServiceDescription = styled.div`
  width: 100%;
  height: fit-content;
  max-height: 70vh;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.4rem;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  color: #222038;
  padding: 20px 30px;
  overflow-y: auto;
  @media ${devices.laptopL} {
    font-size: 1rem;
  }
  @media ${devices.laptop} {
    font-size: 0.9rem;
  }
  @media ${devices.tablet} {
    font-size: 0.7rem;
    padding: 15px 10px;
  }
  @media ${devices.mobileL} {
    font-size: 1rem;
    width: 100%;
    border-radius: 0;
  }
  @media ${devices.mobileM} {
    font-size: 0.9rem;
  }
  @media ${devices.mobileS} {
    font-size: 0.8rem;
  }
`
function ServicesPage({ data }) {
  let { content } = data.allWpContentNode.edges[0].node
  let [description, setDescription] = React.useState('ПРОЕКТИРОВАНИЕ')
  const isMobile = useMediaQuery({ query: devices.mobileL })
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
