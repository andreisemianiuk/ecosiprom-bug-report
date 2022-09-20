import React from "react";
import styled from "styled-components";
import { graphql, Link, useStaticQuery } from "gatsby";
import { Logo } from "../../common/logo/Logo";
import PhoneIcon from "../../assets/footer/phone.svg";
import MailIcon from "../../assets/footer/mail.svg";
import LocationIcon from "../../assets/footer/location.svg";
import InstagramIcon from "../../assets/footer/instagram.svg";

function Footer() {
  const {
    wpMenu: {
      menuItems: { nodes },
    },
  } = useStaticQuery(graphql`
    query FooterQuery {
      wpMenu(slug: { eq: "footer_menu" }) {
        menuItems {
          nodes {
            path
            label
          }
        }
      }
    }
  `);

  return (
    <Container>
      <TopContent>
        <Line />
        <ContentWrapper>
          <Link to={"/"} style={{ paddingTop: "11px" }}>
            <Logo color={"white"} width={233} />
          </Link>
          <LinkList>
            {nodes.map(({ path, label }) => (
              <FooterLink key={"footer_" + path} to={path}>
                {label}
              </FooterLink>
            ))}
          </LinkList>
          <CompanyInfo>
            <PhonesWrapper>
              <IconWrapper>
                <PhoneIcon />
              </IconWrapper>
              <Phones>
                <Phone href="tel:+37529-662-30-04">+375 (29) 662-30-04</Phone>
                <Phone href="tel:+37517-275-23-06">+375 (17) 275-23-06</Phone>
              </Phones>
            </PhonesWrapper>
            <LocationWrapper>
              <IconWrapper>
                <LocationIcon />
              </IconWrapper>
              <Location>г. Минск ул. Гусовского, д.4, пом. 802А</Location>
            </LocationWrapper>
            <EmailWrapper>
              <IconWrapper>
                <MailIcon />
              </IconWrapper>
              <Email href="mailto:info@ecosiprom.com">info@ecosiprom.com</Email>
            </EmailWrapper>
            <InstagramWrapper>
              <IconWrapper>
                <InstagramIcon />
              </IconWrapper>
              <Instagram href="http://instagram.com/">instagram</Instagram>
            </InstagramWrapper>
          </CompanyInfo>
        </ContentWrapper>
      </TopContent>
      <BottomContent>
        <ContentWrapper>
          <CopyrightAndPolicy>
            © 2022 Ecosiprom, Все права защищены
          </CopyrightAndPolicy>
          <CopyrightAndPolicy>Политика конфиденциальности</CopyrightAndPolicy>
        </ContentWrapper>
      </BottomContent>
    </Container>
  );
}

export default Footer;

const Container = styled.footer`
  width: 100%;
  background-color: #0e6683;
  color: #fff;
`;
const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1170px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  @media (max-width: 1223px) {
    max-width: 900px;
  }
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: center;
  }
  @media (max-width: 500px) {
    align-items: flex-start;
  }
`;
const TopContent = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 50px 0;
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: center;
  }
  @media (max-width: 767px) {
    padding: 50px 20px;
  }
`;
const Line = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: #1a7897;
`;

const LinkList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 99px);
  column-gap: 100px;
  max-height: 90px;
  @media (max-width: 1223px) {
    column-gap: 20px;
  }
  @media (max-width: 991px) {
    grid-template-columns: repeat(3, minmax(auto, 99px));
    margin: 20px 0;
  }
`;
const FooterLink = styled(Link)`
  font-size: 15px;
  font-weight: 600;
  line-height: 32px;
  text-decoration: none;
  color: #fff;
`;
const CompanyInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const PhonesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 308px;
  height: 30px;
`;
const Phones = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 280px;
  margin-left: 7px;
  @media (max-width: 320px) {
    margin: 0;
  }
`;
const Phone = styled.a`
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: #fff;
  font-feature-settings: "pnum" on, "lnum" on;
  text-decoration: none;
  &:first-child {
    margin-right: 15px;
  }
  @media (max-width: 340px) {
    &:first-child {
      margin-right: 0;
      font-size: 13px;
    }
  }
`;
const LocationWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
`;
const Location = styled.address`
  font-size: 14px;
  font-weight: 500;
  font-style: normal;
  line-height: 20px;
  margin-left: 8px;
  font-feature-settings: "pnum" on, "lnum" on;
  @media (max-width: 340px) {
    font-size: 13px;
  }
`;
const EmailWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
`;
const Email = styled.a`
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  margin-left: 8px;
  color: #fff;
  text-decoration: none;
`;
const InstagramWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
`;
const Instagram = styled.a`
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  margin-left: 8px;
  color: #fff;
  text-decoration: none;
`;
const IconWrapper = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BottomContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  @media (max-width: 991px) {
    flex-direction: column;
    height: fit-content;
  }
  @media (max-width: 767px) {
    padding: 20px;
  }
`;
const CopyrightAndPolicy = styled.div`
  height: 100%;
  display: flex;
  align-items: center;

  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  @media (max-width: 767px) {
    height: 32px;
  }
`;
