import { graphql, useStaticQuery } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import { getImage } from "gatsby-plugin-image";
import { convertToBgImage } from "gbimage-bridge";
import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import styled from "styled-components";
import parse, { domToReact } from "html-react-parser";
import LeftArrow from "../images/left-arrow.png";
import RightArrow from "../images/right-arrow.png";
// import { useMediaQueryHook } from "../common/MediaQuery/useMediaQueryHook";
// import { sizes } from "../common/MediaQuery/media-query";

const ImageWrapper = styled.div`
  background: linear-gradient(
    89.9deg,
    rgba(3, 20, 26, 0.8) 0.5%,
    rgba(3, 20, 26, 0.4) 99.91%
  );
  background-position: center;
  background-size: 100%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
const BackgroundImageContainer = styled(BackgroundImage)`
  width: 100%;
  height: 500px;
`;
const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1170px;
  color: #fff;
`;
const BackgroundImageLabel = styled.h1`
  max-width: 668px;
  padding-top: 116px;
`;
const BackgroundImageInfo = styled.p`
  width: 584px;
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  margin-top: 21px;
`;
const ArrowContainer = styled.div`
  position: absolute;
  top: 350px;
  left: ${v => v.left}px;
  right: ${v => v.right}px;
  cursor: pointer;
`;
const ArrowImage = styled.img`
  width: 36px;
  height: 36px;
  src: ${v => v.src};
  alt: ${v => v.alt};
`;

export const Slideshow = () => {
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
  `);

  const options = {
    replace: domNode => {
      if (domNode.name === "p") {
        return (
          <BackgroundImageInfo>
            {domToReact(domNode.children, options)}
          </BackgroundImageInfo>
        );
      }
    },
  };

  // const device = useMediaQueryHook();
  // const arrowsPadding = device => {
  //   let deviceSize = parseInt(sizes[device]);
  //   let widthWithoutContent = deviceSize - 1170;
  //   let widthOfSingleSide = widthWithoutContent / 2;
  //   let widthForPadding = widthOfSingleSide * 0.75;
  //   let res = widthForPadding;
  //   return widthForPadding;
  // };
  // const arrowsPad = arrowsPadding(device);

  const properties = {
    prevArrow: (
      <ArrowContainer left={135}>
        <ArrowImage src={LeftArrow} alt="left arrow" />
      </ArrowContainer>
    ),
    nextArrow: (
      <ArrowContainer right={135}>
        <ArrowImage src={RightArrow} alt="right arrow" />
      </ArrowContainer>
    ),
  };

  return (
    <div style={{ width: "100%" }}>
      <Fade {...properties}>
        {nodes.map(node => {
          let image = getImage(node.localFile.childImageSharp.gatsbyImageData);
          let bgImage = convertToBgImage(image);
          let label = node.title.replace("main-back-", "");
          return (
            <ImageWrapper key={node.title}>
              <BackgroundImageContainer
                Tag="div"
                // Spread bgImage into BackgroundImage:
                {...bgImage}
                preserveStackingContext>
                <InnerContainer>
                  <ContentWrapper>
                    <BackgroundImageLabel>
                      {label}
                      {node.caption && parse(node.caption, options)}
                    </BackgroundImageLabel>
                  </ContentWrapper>
                </InnerContainer>
              </BackgroundImageContainer>
            </ImageWrapper>
          );
        })}
      </Fade>
    </div>
  );
};
