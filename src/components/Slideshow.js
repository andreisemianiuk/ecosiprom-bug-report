import { graphql, useStaticQuery } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import { getImage } from "gatsby-plugin-image"
import { convertToBgImage } from "gbimage-bridge"
import React from "react"
import { Fade } from "react-slideshow-image"
import "react-slideshow-image/dist/styles.css"
import styled from "styled-components"
import parse, { domToReact } from "html-react-parser"
import LeftArrow from "../images/left-arrow.png"
import RightArrow from "../images/right-arrow.png"

const ImageWrapper = styled.div`
  background: linear-gradient(
    89.9deg,
    rgba(3, 20, 26, 0.8) 0.5%,
    rgba(3, 20, 26, 0.4) 99.91%
  );
  background-position: center;
  background-size: 100%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`
const BackgroundImageContainer = styled(BackgroundImage)`
  width: 100%;
  height: 500px;
`
const BackgroundImageLabel = styled.h1`
  position: absolute;
  top: 116px;
  left: 135px;
  width: 668px;

  color: #fff;
`
const BackgroundImageInfo = styled.p`
  position: absolute;
  top: 137px;
  left: 0;
  width: 584px;
  height: 51px;
  color: #fff;
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
`
const ArrowContainer = styled.div`
  position: absolute;
  top: 400px;
  left: ${v => v.left}px;
  right: ${v => v.right}px;
  cursor: pointer;
`
const ArrowImage = styled.img`
  width: 36px;
  height: 36px;
  src: ${v => v.src};
  alt: ${v => v.alt};
`

export const Slideshow = ({ children }) => {
  const {
    allWpMediaItem: { nodes },
  } = useStaticQuery(graphql`
    query SlideshowQuery {
      allWpMediaItem(filter: { title: { regex: "/main-back/" } }) {
        nodes {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
          title
          caption
        }
      }
    }
  `)
  const options = {
    replace: domNode => {
      if (domNode.name === "p") {
        return (
          <BackgroundImageInfo>
            {domToReact(domNode.children, options)}
          </BackgroundImageInfo>
        )
      }
    },
  }

  const properties = {
    prevArrow: (
      <ArrowContainer left={71}>
        <ArrowImage src={LeftArrow} alt="left arrow" />
      </ArrowContainer>
    ),
    nextArrow: (
      <ArrowContainer right={71}>
        <ArrowImage src={RightArrow} alt="right arrow" />
      </ArrowContainer>
    ),
  }

  return (
    <div style={{ width: "100%" }}>
      <Fade {...properties}>
        {nodes.map(node => {
          let image = getImage(node.localFile.childImageSharp.gatsbyImageData)
          let bgImage = convertToBgImage(image)
          let label = node.title.replace("main-back-", "")
          return (
            <ImageWrapper key={node.title}>
              <BackgroundImageContainer
                Tag="div"
                // Spread bgImage into BackgroundImage:
                {...bgImage}
                preserveStackingContext>
                {children}
              </BackgroundImageContainer>
              <BackgroundImageLabel>
                {label}
                {node.caption && parse(node.caption, options)}
              </BackgroundImageLabel>
            </ImageWrapper>
          )
        })}
      </Fade>
    </div>
  )
}
