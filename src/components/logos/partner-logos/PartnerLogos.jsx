import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import * as React from "react";
import styled from "styled-components";

const ContentWrapper = styled.section`
  width: 100%;
  max-width: 1170px;
  margin: 0 auto;
  padding: 80px 0 89px;
`;
const Title = styled.h1`
  margin: 0;
  padding-bottom: 40px;
  line-height: 48px;
`;
const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(178px, 1fr));
  grid-gap: 20px;
  justify-content: center;
  align-items: center;
`;
const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 178px;
  height: 90px;
`;

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
        {nodes.map((node) => {
          return (
            <LogoWrapper>
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
