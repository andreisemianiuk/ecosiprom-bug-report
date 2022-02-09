import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import { getImage } from 'gatsby-plugin-image'
import { convertToBgImage } from 'gbimage-bridge'
import styled from 'styled-components'
// import { useBgQuery } from './useBgQuery'
function BackImage({ className, description, children }) {
  let {
    allWpMediaItem: { nodes },
  } = useStaticQuery(
    graphql`
      query {
        allWpMediaItem(filter: { title: { regex: "/back/" } }) {
          nodes {
            id
            title
            localFile {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED)
              }
            }
            altText
          }
        }
      }
    `
  )
  // console.log('nodes >> ', nodes)
  let currentImage = nodes.find(v => v.altText === description)
  // console.log('images >> ', images)
  let image = getImage(currentImage.localFile.childImageSharp.gatsbyImageData)
  let bgImage = convertToBgImage(image)
  return (
    <BackgroundImage
      className={className}
      Tag='section'
      // Spread bgImage into BackgroundImage:
      {...bgImage}
      preserveStackingContext>
      {children}
    </BackgroundImage>
  )
}

const ServicesBackgroundImage = styled(BackImage)`
  background-position: center;
  background-size: cover;
`

export default ServicesBackgroundImage
