import { graphql, useStaticQuery } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import { getImage } from "gatsby-plugin-image";
import { convertToBgImage } from "gbimage-bridge";
import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import styled from "styled-components";
import parse, { domToReact } from "html-react-parser";
import LeftArrow from "../../images/left-arrow.png";
import RightArrow from "../../images/right-arrow.png";
import PrimaryButton from "../buttons/PrimaryButton";

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
  height: 540px;
`;
const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: 1170px;
  color: #fff;
  padding: 0 0 169px;
`;
const BackgroundImageLabel = styled.h1`
  max-width: 668px;
  padding: 116px 0 21px;
  margin: 0;
`;
const BackgroundImageInfo = styled.p`
  width: 584px;
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  margin: 0;
`;
const ButtonWrapper = styled.div`
  position: absolute;
  top: 425px;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
`;
const ButtonContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1170px;
  margin: 0 auto;
`;
const ArrowWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
const ArrowInnerWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1170px;
  height: 100%;
  margin: 0 auto;
  z-index: 1000;
`;
const ArrowContainer = styled.div`
  position: absolute;
  top: 340px;
  left: ${(v) => v.left}px;
  right: ${(v) => v.right}px;
  cursor: pointer;
`;
const ArrowImage = styled.img`
  width: 36px;
  height: 36px;
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
    replace: (domNode) => {
      if (domNode.name === "p") {
        return (
          <BackgroundImageInfo>
            {domToReact(domNode.children, options)}
          </BackgroundImageInfo>
        );
      }
    },
  };

  const properties = {
    prevArrow: (
      <ArrowWrapper>
        <ArrowInnerWrapper>
          <ArrowContainer left={-81}>
            <ArrowImage src={LeftArrow} alt="left arrow" />
          </ArrowContainer>
        </ArrowInnerWrapper>
      </ArrowWrapper>
    ),
    nextArrow: (
      <ArrowWrapper>
        <ArrowInnerWrapper>
          <ArrowContainer right={-81}>
            <ArrowImage src={RightArrow} alt="right arrow" />
          </ArrowContainer>
        </ArrowInnerWrapper>
      </ArrowWrapper>
    ),
  };

  return (
    <div style={{ width: "100%" }}>
      <ButtonWrapper>
        <ButtonContentWrapper>
          <PrimaryButton
            text={"Подробнее"}
            width={138}
            height={56}
            pathTo={"/services"}
          />
        </ButtonContentWrapper>
      </ButtonWrapper>
      <Fade {...properties}>
        {nodes.map((node) => {
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
                    <div>
                      <BackgroundImageLabel>{label}</BackgroundImageLabel>
                      {node.caption && parse(node.caption, options)}
                    </div>
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
