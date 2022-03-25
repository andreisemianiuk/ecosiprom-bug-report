import { GatsbyImage } from 'gatsby-plugin-image'
import * as React from 'react'
import styled from 'styled-components'
import { devices } from '../common/MediaQuery/media-query'
import { graphql, useStaticQuery } from 'gatsby'

let LogosList = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 20px 10px 40px;
  flex-wrap: wrap;
  @media ${devices.mobileL} {
    margin: 0;
  }
`
let LogosItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
`
let LogosTitle = styled.h3`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 1.2em;
  color: #c42034;
  text-align: center;
`

export function Logos({ type }) {
  let {
    allWpMediaItem: { nodes },
  } = useStaticQuery(graphql`
    query LogosQuery {
      allWpMediaItem(filter: { title: { regex: "/logo/" } }) {
        nodes {
          id
          title
          localFile {
            childImageSharp {
              gatsbyImageData(height: 50, formats: PNG)
            }
          }
          altText
        }
      }
    }
  `)
  let regexForLogos = type === 'компаниями' ? /logo-/ : /-logo/

  return (
    <div>
      <LogosTitle>Мы работаем с {type}</LogosTitle>
      <LogosList>
        {nodes.map(
          item =>
            regexForLogos.test(item.title) && (
              <LogosItem key={item.id}>
                <GatsbyImage
                  image={item.localFile.childImageSharp.gatsbyImageData}
                  alt={item.altText}
                  height={50}
                />
              </LogosItem>
            )
        )}
      </LogosList>
    </div>
  )
}
