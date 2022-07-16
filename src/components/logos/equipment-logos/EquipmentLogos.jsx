import * as React from "react";
import { graphql, Link } from "gatsby";
import { useStaticQuery } from "gatsby";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import styled from "styled-components";
import { GatsbyImage } from "gatsby-plugin-image";
import LeftArrow from "../../../assets/slider-arrow-left.svg";
import RightArrow from "../../../assets/slider-arrow-right.svg";

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1170px;
  margin: 0 auto;
  padding: ${({ padding }) => (padding ? padding : "80px 0")};
`;
const Title = styled.h1`
  margin: 0;
  padding-bottom: 40px;
  line-height: 48px;
`;
const Container = styled(Slide)`
  width: 100%;
`;
const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 178px;
  height: 110px;
  position: relative;
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
`;

const EquipmentLogos = ({ padding }) => {
  const {
    allWpMediaItem: { nodes },
  } = useStaticQuery(graphql`
    query EquipmentLogosQuery {
      allWpMediaItem(filter: { title: { regex: "/equipment/" } }) {
        nodes {
          id
          localFile {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, formats: PNG, height: 60)
            }
          }
        }
      }
    }
  `);

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
    slidesToShow: 6,
  };

  return (
    <ContentWrapper padding={padding}>
      <Title>Мы работаем с оборудованием</Title>
      <Container {...properties}>
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

export default EquipmentLogos;
