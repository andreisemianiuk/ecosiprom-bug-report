import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import * as React from "react";
import styled from "styled-components";

const PartnerLogos = () => {
  const {
    allWpMediaItem: { nodes },
  } = useStaticQuery(graphql`
    query PartnersLogosQuery {
      allWpMediaItem(
        filter: { title: { regex: "/partners/" } }
        sort: { fields: caption }
      ) {
        nodes {
          id
          localFile {
            childImageSharp {
              gatsbyImageData(
                placeholder: BLURRED
                formats: PNG
                height: 76
                quality: 100
              )
            }
          }
        }
      }
    }
  `);

  return (
    <ContentWrapper>
      <Title>Наши партнеры</Title>
      <Container>
        {nodes.map((node, index) => {
          return (
            <LogoWrapper key={index}>
              <GatsbyImage
                image={node.localFile.childImageSharp.gatsbyImageData}
                alt=""
              />
            </LogoWrapper>
          );
        })}
      </Container>
    </ContentWrapper>
  );
};

export default PartnerLogos;

const ContentWrapper = styled.section`
  width: 100%;
  max-width: 1170px;
  margin: 0 auto;
  padding: 80px 0 89px;
  @media (max-width: 1223px) {
    max-width: 900px;
  }
  @media (max-width: 991px) {
    max-width: 700px;
  }
  @media (max-width: 767px) {
    padding: 50px 20px;
  }
`;
const Title = styled.h1`
  margin: 0;
  padding-bottom: 40px;
  line-height: 48px;
  @media (max-width: 767px) {
    text-align: center;
  }
`;
const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(178px, 1fr));
  grid-gap: 20px;
  justify-content: center;
  align-items: center;
  @media (max-width: 767px) {
    grid-template-columns: repeat(2, auto);
  }
`;
const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 178px;
  height: 100%;
  max-height: 90px;
`;
