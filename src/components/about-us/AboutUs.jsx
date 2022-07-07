import { graphql, useStaticQuery } from "gatsby";
import parse, { domToReact } from "html-react-parser";
import * as React from "react";
import styled from "styled-components";
import AboutUsCommon from "./AboutUsCommon";

const Container = styled.div`
  width: 100%;
  height: 350px;
  background-color: #f3f7f9;
`;
const InnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1170px;
  margin: 0 auto;
  padding: 80px 0;
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
`;
const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 278px;
  margin-top: 40px;
`;
const InfoLabel = styled.div`
  height: 50px;
  font-size: 46px;
  line-height: 40px;
  font-weight: 800;
  color: #0e6683;
  font-feature-settings: "pnum" on, "lnum" on;
`;
const InfoText = styled.div`
  font-size: 15px;
  font-weight: 400;
  line-height: 22px;
  color: #4a5763;
`;

const AboutUs = () => {
  const {
    wpContentNode: { id, content },
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
          domNode.attribs.class === "directions" ||
          domNode.attribs.class === "services-container" ||
          domNode.attribs.class === "implementation-cycle" ||
          domNode.attribs.class === "projects" ||
          domNode.attribs.class === "catalog" ||
          domNode.attribs.class === "about-us" ||
          domNode.attribs.class === "partners-logos" ||
          domNode.attribs.class === "equipment-logos")
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
      text: " Круглосуточная техническая поддержка и консультация",
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
