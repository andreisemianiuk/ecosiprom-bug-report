import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import parse, { domToReact } from "html-react-parser";
import * as React from "react";
import styled from "styled-components";
import { Breadcrumb } from "../common/breadCrumb/Breadcrumb";
import FeedbackForm from "../components/feedback-form/FeedbackForm";
import Layout from "../components/layout/Layout";
import ProjectsMain from "../components/projects/ProjectsMain";

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
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1170px;
  padding-top: 100px;
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
`;
const InfoParagraph = styled.p`
  &:last-child {
    margin-bottom: 0;
  }
`;

const ServicePageTemplate = ({
  data: {
    wpPage: { content },
    wpMediaItem: { localFile, altText },
  },
  pageContext,
  location,
}) => {
  const options = {
    replace: (domNode) => {
      if (domNode.name === "img") {
        return <></>;
      }
      if (domNode.name === "p") {
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
      <ProjectsMain />
      <FeedbackForm />
    </Layout>
  );
};

export default ServicePageTemplate;

export const pageQuery = graphql`
  query ServicePageTemplateQuery($id: String!) {
    wpPage(id: { eq: $id }) {
      content
    }
    wpMediaItem(wpParent: { node: { id: { eq: $id } } }) {
      title
      caption
      altText
      localFile {
        childImageSharp {
          gatsbyImageData(formats: PNG, height: 300)
        }
      }
    }
  }
`;
