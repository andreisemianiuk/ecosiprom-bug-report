import { graphql } from "gatsby";
import parse, { domToReact } from "html-react-parser";
import * as React from "react";
import styled from "styled-components";
import AddressIcon from "../assets/address.svg";
import EmailIcon from "../assets/email.svg";
import FaxIcon from "../assets/fax.svg";
import MobileIcon from "../assets/mobile.svg";
import PhoneCircleIcon from "../assets/phone-circle.svg";
import PhoneIcon from "../assets/phone.svg";
import TimeTableIcon from "../assets/time-table.svg";
import { Breadcrumb } from "../common/breadCrumb/Breadcrumb";
import FeedbackForm from "../components/feedback-form/FeedbackForm";
import Layout from "../components/layout/Layout";
import YandexMap from "../components/yandex-map/YandexMap";

const Contacts = ({
  data: {
    wpPage: { title, content },
  },
  pageContext,
  location,
}) => {
  const {
    breadcrumb: { crumbs },
  } = pageContext;

  let options = {
    replace: (domNode) => {
      if (domNode.attribs && domNode.attribs.class === "address") {
        return (
          <ItemWrapper href="#">
            <IconWrapper>
              <AddressIcon />
            </IconWrapper>
            <Item>{domToReact(domNode.children, options)}</Item>
          </ItemWrapper>
        );
      }
      if (domNode.attribs && domNode.attribs.class === "city-phone") {
        return (
          <ItemWrapper href={`tel:${domNode.children[0].data}`}>
            <PhoneWrapper>
              <IconWrapper>
                <PhoneIcon />
              </IconWrapper>
              <PhoneCircleIconContainer>
                <PhoneCircleIcon />
              </PhoneCircleIconContainer>
            </PhoneWrapper>
            <Item>{domToReact(domNode.children, options)}</Item>
          </ItemWrapper>
        );
      }
      if (domNode.attribs && domNode.attribs.class === "mobile-phone") {
        return (
          <ItemWrapper href={`tel:${domNode.children[0].data}`}>
            <IconWrapper>
              <MobileIcon />
            </IconWrapper>
            <Item>{domToReact(domNode.children, options)}</Item>
          </ItemWrapper>
        );
      }
      if (domNode.attribs && domNode.attribs.class === "fax") {
        return (
          <ItemWrapper href={`fax:${domNode.children[0].data}`}>
            <IconWrapper>
              <FaxIcon />
            </IconWrapper>
            <Item>{domToReact(domNode.children, options)}</Item>
          </ItemWrapper>
        );
      }
      if (domNode.attribs && domNode.attribs.class === "email") {
        return (
          <ItemWrapper href={`mailto:${domNode.children[0].data}`}>
            <IconWrapper>
              <EmailIcon />
            </IconWrapper>
            <Item>{domToReact(domNode.children, options)}</Item>
          </ItemWrapper>
        );
      }
      if (domNode.attribs && domNode.attribs.class === "time-table") {
        return (
          <ItemWrapper href="#">
            <IconWrapper>
              <TimeTableIcon />
            </IconWrapper>
            <Item>{domToReact(domNode.children, options)}</Item>
          </ItemWrapper>
        );
      }
    },
  };
  return (
    <Layout location={location}>
      <Container>
        <InfoBlock>
          <Breadcrumb crumbs={crumbs} color={"#4a5763"} />
          <Title>{title}</Title>
          <TextContainer>{parse(content, options)}</TextContainer>
          <CompanyName>?????? ??????????????????????</CompanyName>
        </InfoBlock>
        <MapContainer>
          <YandexMap />
        </MapContainer>
      </Container>
      <FeedbackForm />
    </Layout>
  );
};

export default Contacts;

export const pageQuery = graphql`
  query ContactsPageQuery {
    wpPage(title: { eq: "????????????????" }) {
      title
      content
    }
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1170px;
  margin: 50px auto;
  @media (max-width: 1223px) {
    max-width: 900px;
  }
  @media (max-width: 991px) {
    max-width: 750px;
  }
  @media (max-width: 767px) {
    flex-direction: column;
    margin: 50px auto 0;
  }
`;
const InfoBlock = styled.div`
  @media (max-width: 767px) {
    padding: 0 20px;
    margin-bottom: 20px;
  }
`;
const Title = styled.h1`
  margin: 20px 0 50px;
  @media (max-width: 767px) {
    margin: 20px 0;
  }
`;
const TextContainer = styled.div`
  line-height: 20px;
  font-weight: 500;
  font-feature-settings: "pnum" on, "lnum" on;
`;
const PhoneWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;
const PhoneCircleIconContainer = styled.div`
  position: absolute;
  left: 6.9px;
  bottom: -1.5px;
`;
const MapContainer = styled.div`
  width: 100%;
  max-width: 872px;
  height: 480px;
  @media (max-width: 1223px) {
    max-width: 672px;
    height: 380px;
  }
  @media (max-width: 991px) {
    max-width: 500px;
  }
  @media (max-width: 767px) {
    max-width: 767px;
  }
`;
const ItemWrapper = styled.a`
  display: flex;
  align-items: flex-start;
  text-decoration: none;
  color: inherit;
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 5px;
`;
const Item = styled.span`
  max-width: 170px;
  padding-left: 10px;
`;
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`;
const CompanyName = styled.div`
  font-size: 24px;
  color: #000000;
  font-weight: 800;
  line-height: 27px;
  margin-top: 40px;
  @media (max-width: 767px) {
    margin-top: 20px;
  }
`;
