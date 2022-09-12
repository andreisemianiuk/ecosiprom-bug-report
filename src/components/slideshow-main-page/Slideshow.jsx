import { graphql, useStaticQuery } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import { getImage } from "gatsby-plugin-image";
import { convertToBgImage } from "gbimage-bridge";
import parse, { domToReact } from "html-react-parser";
import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import styled from "styled-components";
import {
  Default,
  DesktopOrLaptop,
  TabletOrMobile,
} from "../../common/media-query-components/media-query-components";
import LeftArrow from "../../images/left-arrow.png";
import RightArrow from "../../images/right-arrow.png";
import PrimaryButton from "../buttons/PrimaryButton";
import ProductionDirections from "../directions-of-production/ProductionDirections";

const SlideshowContainer = styled.div`
  width: 100%;
  margin-bottom: 204px;
  @media (max-width: 991px) {
    margin-bottom: 50px;
  }
  @media (max-width: 767px) {
    margin-bottom: 0;
  }
`;
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
  @media (max-width: 1223px) {
    max-width: 900px;
  }
  @media (max-width: 991px) {
    max-width: 700px;
  }
  @media (max-width: 767px) {
    max-width: fit-content;
    padding: 140px 20px 0;
  }
`;
const BackgroundImageLabel = styled.h1`
  max-width: 668px;
  padding: 116px 0 21px;
  margin: 0;
  @media (max-width: 767px) {
    font-size: 28px;
    line-height: 36px;
    padding: 0;
  }
`;
const BackgroundImageInfo = styled.p`
  width: 584px;
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  margin: 0;
  @media (max-width: 991px) {
    width: fit-content;
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;
const ButtonWrapper = styled.div`
  position: absolute;
  top: 425px;
  left: 0;
  width: 100%;
  z-index: 100;
  @media (max-width: 991px) {
    display: none;
  }
`;
const MobileButtonWrapper = styled.div`
  position: absolute;
  top: 480px;
  left: 0;
  width: 100%;
  z-index: 100;
`;
const ButtonContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1170px;
  margin: 0 auto;
  @media (max-width: 1223px) {
    max-width: 900px;
  }
  @media (max-width: 991px) {
    max-width: 740px;
    padding: 0 20px;
  }
`;
const DirectionsWrapper = styled.div`
  position: absolute;
  top: 660px;
  left: 0;
  width: 100%;
  z-index: 100;
  @media (max-width: 991px) {
    display: none;
  }
`;
const DirectionsContentWrapper = styled.div`
  width: 100%;
  max-width: 1170px;
  margin: 0 auto;
  @media (max-width: 1223px) {
    max-width: 900px;
  }
`;
const ArrowWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  @media (max-width: 1123px) {
    /*visibility: collapse;*/
  }
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
const Indicator = styled.div`
  width: 8px;
  height: 8px;
  background-color: #fff;
  cursor: pointer;
  z-index: 99;
  text-align: center;
  border: 1px solid #fff;
  border-radius: 5px;
  margin: 0;
  margin-right: 10px;
  transition: all 0.3s ease;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  &.active {
    border-color: #2787a7;
    background-color: #2787a7;
  }
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
              gatsbyImageData(formats: WEBP)
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

  const indicators = () => <Indicator />;
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
    indicators: indicators,
  };

  return (
    <SlideshowContainer>
      <DesktopOrLaptop>
        <ButtonWrapper>
          <ButtonContentWrapper>
            <PrimaryButton
              text={"Подробнее"}
              width={138}
              height={56}
              pathTo={"/projects/"}
            />
          </ButtonContentWrapper>
        </ButtonWrapper>
      </DesktopOrLaptop>
      <TabletOrMobile>
        <MobileButtonWrapper>
          <ButtonContentWrapper>
            <PrimaryButton
              text={"Подробнее"}
              isMobile
              height={48}
              pathTo={"/projects/"}
            />
          </ButtonContentWrapper>
        </MobileButtonWrapper>
      </TabletOrMobile>
      <DirectionsWrapper>
        <DirectionsContentWrapper>
          <ProductionDirections bottomMargin={130} isMain />
        </DirectionsContentWrapper>
      </DirectionsWrapper>
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
    </SlideshowContainer>
  );
};
