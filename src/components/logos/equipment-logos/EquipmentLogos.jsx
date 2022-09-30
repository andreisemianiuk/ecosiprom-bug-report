import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import * as React from "react";
import { useMediaQuery } from "react-responsive";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import styled from "styled-components";
import LeftArrow from "../../../assets/slider-arrow-left.svg";
import RightArrow from "../../../assets/slider-arrow-right.svg";
import { NotMobile } from "../../../common/media-query-components/media-query-components";

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

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTabletOrLaptop = useMediaQuery({ minWidth: 768, maxWidth: 1223 });

  const propertiesDefault = {
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
  const propertiesForMobile = {
    arrows: false,
    slidesToShow: 3,
  };
  const propertiesForTabletOrLaptop = {
    arrows: false,
    slidesToShow: 4,
  };
  const properties = isMobile
    ? propertiesForMobile
    : isTabletOrLaptop
    ? propertiesForTabletOrLaptop
    : propertiesDefault;

  return (
    <ContentWrapper padding={padding}>
      <NotMobile>
        <Title>Мы работаем с оборудованием</Title>
      </NotMobile>
      <Container {...properties}>
        {nodes.map((node, id) => {
          return (
            <LogoWrapper key={id}>
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

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1170px;
  margin: 0 auto;
  padding: ${({ padding }) => (padding ? padding : "80px 0")};
  @media (max-width: 1223px) {
    max-width: 900px;
  }
  @media (max-width: 991px) {
    max-width: 700px;
  }
  @media (max-width: 767px) {
    padding: 0 10px;
  }
`;
const Title = styled.h1`
  margin: 0;
  padding-bottom: 40px;
  line-height: 48px;
  @media (max-width: 1223px) {
    padding-left: 20px;
  }
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
  @media (max-width: 1223px) {
    padding: 0 10px;
  }
  @media (max-width: 767px) {
    width: 100%;
    padding: 0 10px;
    &::after {
      position: absolute;
      display: block;
      content: "";
      top: 40px;
      left: 0;
      width: 1px;
      height: 40px;
      border-right: 1px solid #cfe0e6;
    }
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
    visibility: hidden;
  }
`;
