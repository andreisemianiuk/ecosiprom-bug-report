import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import parse, { domToReact } from "html-react-parser";
import * as React from "react";
import { Breadcrumb } from "../../common/breadCrumb/Breadcrumb";
import FeedbackForm from "../../components/feedback-form/FeedbackForm";
import Layout from "../../components/Layout";
import { Slide } from "react-slideshow-image";
import LeftArrow from "../../../src/assets/slider-arrow-left.svg";
import RightArrow from "../../../src/assets/slider-arrow-right.svg";

import {
  BackgroundImageLabel,
  ContentWrapper,
  ImageContainer,
  ImageLayout,
  Info,
  InfoParagraph,
  InnerContainer,
  SliderContentWrapper,
  SliderImageWrapper,
  ArrowContainer,
} from "./styles.js";
import ServicesList from "../../components/services-list/ServicesList";

const ServicePageTemplate = ({
  data: {
    wpPage: { content },
    wpMediaItem: { localFile, altText },
    allWpMediaItem: { nodes },
  },
  pageContext,
}) => {
  console.log(
    "🚀 ~ file: projects-item-template.js ~ line 34 ~ localFile",
    localFile
  );
  console.log(
    "🚀 ~ file: projects-item-template.js ~ line 34 ~ altText",
    altText
  );
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

  const properties = {
    prevArrow: (
      <ArrowContainer left={-65}>
        <LeftArrow />
      </ArrowContainer>
    ),
    nextArrow: (
      <ArrowContainer right={-65}>
        <RightArrow />
      </ArrowContainer>
    ),
    slidesToShow: 3,
  };

  return (
    <Layout>
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
      <SliderContentWrapper padding={"80px 0 60px 0"}>
        <Slide style={{ width: "100%" }} {...properties}>
          {nodes.map((node) => {
            return (
              <SliderImageWrapper>
                <GatsbyImage
                  image={node.localFile.childImageSharp.gatsbyImageData}
                  alt=""
                />
              </SliderImageWrapper>
            );
          })}
        </Slide>
      </SliderContentWrapper>
      <ServicesList
        title={"Что было сделано"}
        completedServices={completedServices}
      />
      <FeedbackForm />
    </Layout>
  );
};

export default ServicePageTemplate;

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
