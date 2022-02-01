import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { getImage, GatsbyImage } from "gatsby-plugin-image"


function ServicesBackgroundImage ({imageTitle}) {debugger
  // let {
  //   allWpMediaItem: {
  //     nodes
  //   },
  // } = useStaticQuery(
  //   graphql`
  //     query {
  //       allWpMediaItem(filter: {title: {eq: "/naladka-3/"}}) {
  //         nodes {
  //           id
  //           title
  //           localFile {
  //             childImageSharp {
  //               gatsbyImageData
  //             }
  //           }
  //           altText
  //         }
  //       }
  //     }
  //   `
  // )
  // console.log('nodes >> ',nodes)
  // const image = getImage(data.allWpMediaItem.nodes[0].localFile.childImageSharp.gatsbyImageData)
  
  // Use like this:
  // const bgImage = convertToBgImage(image)
  // return (
  //   <BackgroundImage
  //     Tag="section"
  //     // Spread bgImage into BackgroundImage:
  //     {...bgImage}
  //     preserveStackingContext
  //   >
  //     <div style={{minHeight: 1000, minWidth: 1000}}>
  //       {/*<GatsbyImage image={image} alt={"testimage"}/>*/}
  //     </div>
  //   </BackgroundImage>
  // )
  return <div>Back Image</div>
}
export default ServicesBackgroundImage