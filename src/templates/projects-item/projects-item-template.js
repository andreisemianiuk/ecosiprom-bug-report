import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import parse, { domToReact } from "html-react-parser";
import * as React from "react";
import { Breadcrumb } from "../../common/breadCrumb/Breadcrumb";
import FeedbackForm from "../../components/feedback-form/FeedbackForm";
import ServicesList from "../../components/services-list/ServicesList";
import Layout from "../../components/layout/Layout";
import { Slide } from "react-slideshow-image";
import LeftArrow from "../../../src/assets/slider-arrow-left.svg";
import RightArrow from "../../../src/assets/slider-arrow-right.svg";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import {
  Mobile,
  NotMobile,
} from "../../common/media-query-components/media-query-components";
import { convertToBgImage } from "gbimage-bridge";
import BackgroundImage from "gatsby-background-image";

const ProjectsPageTemplate = ({
  data: {
    wpPage: { content },
    wpMediaItem: { localFile, altText },
    allWpMediaItem: { nodes },
  },
  pageContext,
  location,
}) => {
  let completedServices;
  const options = {
    replace: (domNode) => {
      if (domNode.attribs && domNode.attribs.class === "images-wrapper") {
        return <></>;
      }
      if (domNode.attribs && domNode.attribs.class === "completed-services") {
        completedServices = domNode.children[0].data.split(", ");
        return <></>;
      }
      if (domNode.attribs && domNode.attribs.class === "description") {
        return (
          <InfoParagraph>{domToReact(domNode.children, options)}</InfoParagraph>
        );
      }
    },
  };

  const {
    breadcrumb: { crumbs },
  } = pageContext;

  const image = getImage(localFile.childImageSharp.gatsbyImageData);

  const isTabletOrMobile = useMediaQuery({ maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const indicators = () => <Indicator />;

  const properties = {
    prevArrow: (
      <ArrowContainer left={isTabletOrMobile ? -20 : -35}>
        <LeftArrow />
      </ArrowContainer>
    ),
    nextArrow: (
      <ArrowContainer right={isTabletOrMobile ? -20 : -35}>
        <RightArrow />
      </ArrowContainer>
    ),
    slidesToShow: isMobile ? 1 : 3,
    indicators: isMobile && indicators,
  };

  return (
    <Layout location={location}>
      <ImageContainer>
        <GatsbyImage
          key={altText}
          image={image}
          alt={altText}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <ImageLayout />
        <InnerContainer>
          <ContentWrapper>
            <Breadcrumb crumbs={crumbs} color={"#fff"} />
            <BackgroundImageLabel>{altText}</BackgroundImageLabel>
          </ContentWrapper>
        </InnerContainer>
      </ImageContainer>
      <Info>{parse(content, options)}</Info>
      <SliderContentWrapper padding={isMobile ? "30px 0 0 0" : "80px 0 60px 0"}>
        <Slide style={{ width: "100%" }} {...properties}>
          {nodes.map((node, index) => {
            let bgImage = convertToBgImage(
              node.localFile.childImageSharp.gatsbyImageData
            );
            return (
              <SliderImageWrapper key={index}>
                <NotMobile>
                  <GatsbyImage
                    image={node.localFile.childImageSharp.gatsbyImageData}
                    alt=""
                  />
                </NotMobile>
                <Mobile>
                  <BackgroundImage
                    style={{ width: "100%", height: "300px" }}
                    Tag="div"
                    // Spread bgImage into BackgroundImage:
                    {...bgImage}
                    preserveStackingContext
                  />
                </Mobile>
              </SliderImageWrapper>
            );
          })}
        </Slide>
      </SliderContentWrapper>
      <ServicesList
        isMain
        title={"Что было сделано"}
        completedServices={completedServices}
      />
      <FeedbackForm />
    </Layout>
  );
};

export default ProjectsPageTemplate;

export const pageQuery = graphql`
  query ProjectsPageTemplateQuery($id: String!) {
    wpPage(id: { eq: $id }) {
      content
    }
    wpMediaItem(
      wpParent: { node: { id: { eq: $id } } }
      title: { regex: "/cropped-/" }
    ) {
      title
      caption
      altText
      localFile {
        childImageSharp {
          gatsbyImageData(formats: PNG, height: 300)
        }
      }
    }
    allWpMediaItem(
      filter: {
        wpParent: { node: { id: { eq: $id } } }
        title: { regex: "/^(?!cropped).*$/" }
      }
    ) {
      nodes {
        title
        altText
        id
        localFile {
          childImageSharp {
            gatsbyImageData(formats: PNG, height: 300, width: 377)
          }
        }
      }
    }
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
`;
const ImageLayout = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 300px;
  background: #03141a;
  opacity: 0.5;
`;
const InnerContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  @media (max-width: 767px) {
    justify-content: flex-start;
  }
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1170px;
  padding-top: 100px;
  @media (max-width: 1223px) {
    max-width: 900px;
  }
  @media (max-width: 991px) {
    max-width: 700px;
  }
  @media (max-width: 767px) {
    max-width: max-content;
    padding: 80px 20px 0;
  }
`;
const BackgroundImageLabel = styled.h1`
  color: #fff;
  padding-top: 20px;
  margin: 0;
`;
const Info = styled.div`
  width: 100%;
  max-width: 1170px;
  margin: 80px auto 0;
  color: #4a5763;
  line-height: 24px;
  font-feature-settings: "pnum" on, "lnum" on;
  @media (max-width: 1223px) {
    max-width: 900px;
  }
  @media (max-width: 991px) {
    max-width: 700px;
  }
  @media (max-width: 767px) {
    margin: 50px auto 0;
    padding: 0 20px;
  }
`;
const InfoParagraph = styled.p`
  &:last-child {
    margin-bottom: 0;
  }
`;
const SliderContentWrapper = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: ${({ padding }) => (padding ? padding : "80px 0")};
  @media (max-width: 1223px) {
    max-width: 900px;
  }
  @media (max-width: 991px) {
    max-width: 700px;
  }
  @media (max-width: 767px) {
    max-width: 450px;
  }
`;
const SliderImageWrapper = styled.div`
  margin: 0 10px;
  @media (max-width: 991px) {
    margin: 0 5px;
  }
  @media (max-width: 767px) {
    /*margin: 0;*/
  }
`;
const ArrowContainer = styled.div`
  position: relative;
  left: ${(v) => v.left}px;
  right: ${(v) => v.right}px;
  cursor: pointer;
  transition: filter 0.4s ease-in-out;
  &:hover {
    filter: brightness(0) saturate(100%) invert(30%) sepia(61%) saturate(748%)
      hue-rotate(151deg) brightness(93%) contrast(92%);
  }
  @media (max-width: 767px) {
    display: none;
  }
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
