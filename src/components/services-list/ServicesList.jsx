import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import styled from "styled-components";
import PrimaryButton from "../buttons/PrimaryButton";
import ServiceBox from "./ServiceBox";

const ContentWrapper = styled.section`
  max-width: 1170px;
  margin: 0 auto;
  padding-bottom: 80px;
`;
const Title = styled.h1`
  line-height: 48px;
  margin-bottom: 40px;
`;
const ItemsWrapper = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(3, 377px);
  grid-template-rows: repeat(2, 350px);

  justify-content: center;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const ServicesList = () => {
  const [hoveredItemId, setHoveredItemId] = React.useState(null);
  const {
    allWpMediaItem: { nodes },
  } = useStaticQuery(graphql`
    query ServicesListQuery {
      allWpMediaItem(
        filter: { title: { regex: "/services/" } }
        sort: { fields: caption }
      ) {
        nodes {
          id
          altText
          description
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  `);

  const handleHoverOn = index => {
    setHoveredItemId(index);
  };
  const handleHoverOff = () => {
    setHoveredItemId(null);
  };

  return (
    <ContentWrapper>
      <Title>Наши услуги</Title>
      <ItemsWrapper>
        {nodes.map(service => {
          let hovered = hoveredItemId === service.id ? true : false;
          return (
            <ServiceBox
              handleHoverOn={handleHoverOn}
              handleHoverOff={handleHoverOff}
              service={service}
              hovered={hovered}
            />
          );
        })}
      </ItemsWrapper>
      <ButtonWrapper>
        <PrimaryButton text={"Оставить заявку"} />
      </ButtonWrapper>
    </ContentWrapper>
  );
};

export default ServicesList;
