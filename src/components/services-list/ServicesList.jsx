import { graphql, useStaticQuery } from "gatsby";
import * as React from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import PrimaryButton from "../buttons/PrimaryButton";
import ServiceBox from "./ServiceBox";

const ServicesList = ({ isMain, children, completedServices, title }) => {
  // isMain should be true if we are on the main page
  // completedServices is an array of services that we want to display

  const isTabletOrMobile = useMediaQuery({ maxWidth: 991 });

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
          slug
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  `);

  const filteredNodes = completedServices
    ? nodes.filter((node) => {
        return completedServices.includes(node.altText);
      })
    : nodes;

  return (
    <ContentWrapper isMain={isMain}>
      {!isMain && <Navigation>{children}</Navigation>}
      <Title>{title}</Title>
      <ItemsWrapper>
        {filteredNodes.map((service) => {
          return <ServiceBox key={service.id} service={service} />;
        })}
      </ItemsWrapper>
      {isMain && (
        <ButtonWrapper>
          <PrimaryButton
            isMobile={isTabletOrMobile}
            text={"Оставить заявку"}
            pathTo={"/send-form"}
            state={{ modal: true }}
          />
        </ButtonWrapper>
      )}
    </ContentWrapper>
  );
};

export default ServicesList;

const ContentWrapper = styled.section`
  max-width: 1170px;
  margin: 0 auto;
  padding-bottom: 80px;
  @media (max-width: 1223px) {
    max-width: 900px;
  }
  @media (max-width: 991px) {
    max-width: 700px;
  }
  @media (max-width: 767px) {
    padding: ${({ isMain }) => (isMain ? "20px 20px 50px" : "0 20px 50px")};
  }
`;
const Navigation = styled.div`
  padding: 50px 0 20px;
`;
const Title = styled.h1`
  line-height: 48px;
  margin: 0;
  margin-bottom: 40px;
  @media (max-width: 767px) {
    margin-bottom: 20px;
    /*margin-left: 20px;*/
    line-height: 40px;
    font-size: 32px;
  }
`;
const ItemsWrapper = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(3, 377px);
  grid-template-rows: repeat(2, 350px);
  justify-content: center;
  @media (max-width: 1223px) {
    column-gap: 20px;
    grid-template-columns: repeat(2, max(377px));
    grid-template-rows: repeat(3, max(350px));
  }
  @media (max-width: 767px) {
    column-gap: 20px;
    grid-template-columns: repeat(1, max(377px));
    grid-template-rows: repeat(6, max(350px));
  }
`;
const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 30px;
  @media (max-width: 767px) {
    display: block;
  }
`;
