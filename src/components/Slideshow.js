import { graphql, useStaticQuery } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import { getImage } from 'gatsby-plugin-image'
import { convertToBgImage } from 'gbimage-bridge'
import React from 'react'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'

// const slideImages = [
//   {
//     url: `${mainOne}`,
//     caption: 'Slide 1',
//   },
//   {
//     url: `${mainTwo}`,
//     caption: 'Slide 2',
//   },
//   {
//     url: `${mainThree}`,
//     caption: 'Slide 3',
//   },
//   {
//     url: `${mainFour}`,
//     caption: 'Slide 4',
//   },
// ]

export const Slideshow = ({ children }) => {
  const {
    allWpMediaItem: { nodes },
  } = useStaticQuery(graphql`
    query SlideshowQuery {
      allWpMediaItem(filter: { title: { regex: "/main/" } }) {
        nodes {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  `)
  return (
    <div className='slide-container' style={{ width: '100%' }}>
      <Slide>
        {nodes.map(node => {
          let image = getImage(node.localFile.childImageSharp.gatsbyImageData)
          let bgImage = convertToBgImage(image)
          return (
            <div
              style={{
                backgroundPosition: 'center',
                backgroundSize: '100%',
              }}>
              <BackgroundImage
                Tag='div'
                style={{ width: '100%', height: '500px' }}
                // Spread bgImage into BackgroundImage:
                {...bgImage}
                preserveStackingContext>
                {children}
              </BackgroundImage>
            </div>
          )
        })}
      </Slide>
    </div>
  )
}
