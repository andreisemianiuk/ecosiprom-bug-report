import { graphql, useStaticQuery } from "gatsby";
import parse, { domToReact } from "html-react-parser";
import * as React from "react";
import styled from "styled-components";
import AboutUsCommon from "./AboutUsCommon";

const AboutUs = () => {
  const {
    wpContentNode: { content },
  } = useStaticQuery(graphql`
    query AboutFooterQuery {
      wpContentNode(slug: { eq: "main" }) {
        ... on WpPage {
          id
          content
        }
      }
    }
  `);

  let options = {
    replace: (domNode) => {
      if (
        domNode.attribs &&
        (domNode.attribs.class === "main-slideshow-images" ||
          domNode.attribs.class === "services-container" ||
          domNode.attribs.class === "catalog" ||
          domNode.attribs.class === "equipment-logos" ||
          domNode.attribs.class === "partners-logos" ||
          domNode.attribs.class === "implementation-cycle" ||
          domNode.attribs.class === "about-us")
      ) {
        return <></>;
      }
      if (domNode.attribs && domNode.attribs.class === "about-footer-title") {
        return (
          <FooterTitle>{domToReact(domNode.children, options)}</FooterTitle>
        );
      }
    },
  };

  const infoItems = [
    {
      label: "> 20 лет",
      text: "Опыт работы наших сотрудников в промышленности РБ и странах СНГ",
    },
    {
      label: "450+",
      text: "Объектов спроектировано, укомплектовано и построено",
    },
    {
      label: "100%",
      text: "Довольных клиентов",
    },
    {
      label: "24/7",
      text: "Круглосуточная техническая поддержка и консультация",
    },
  ];

  return (
    <>
      <AboutUsCommon isMain={true} />
      <Container>
        <InnerWrapper>
          {parse(content, options)}
          <InfoWrapper>
            {infoItems.map((item, index) => (
              <InfoItem key={index}>
                <InfoLabel>{item.label}</InfoLabel>
                <InfoText>{item.text}</InfoText>
              </InfoItem>
            ))}
          </InfoWrapper>
        </InnerWrapper>
      </Container>
    </>
  );
};

export default AboutUs;

const Container = styled.div`
  width: 100%;
  height: 350px;
  background-color: #f3f7f9;
  @media (max-width: 767px) {
    height: max-content;
  }
`;
const InnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1170px;
  margin: 0 auto;
  padding: 80px 0;
  @media (max-width: 1223px) {
    max-width: 900px;
  }
  @media (max-width: 991px) {
    max-width: 700px;
    padding: 50px 0;
  }
  @media (max-width: 767px) {
    padding: 50px 20px;
  }
`;
const FooterTitle = styled.h3`
  width: 100%;
  max-width: 1100px;
  text-align: center;
  margin: 0 auto;
  line-height: 24px;
`;
const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
  }
`;
const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 278px;
  margin-top: 40px;
  @media (max-width: 1223px) {
    align-items: center;
  }
`;
const InfoLabel = styled.div`
  height: 50px;
  font-size: 46px;
  line-height: 40px;
  font-weight: 800;
  color: #0e6683;
  font-feature-settings: "pnum" on, "lnum" on;
  @media (max-width: 991px) {
    font-size: 42px;
  }
  @media (max-width: 767px) {
    font-size: 46px;
  }
`;
const InfoText = styled.div`
  font-size: 15px;
  font-weight: 400;
  line-height: 22px;
  color: #4a5763;
  @media (max-width: 1223px) {
    text-align: center;
    padding: 0 10px;
  }
`;
