import React from "react";
import styled from "styled-components";
import { graphql, Link, useStaticQuery } from "gatsby";
import { Logo } from "../../common/logo/Logo";
import PhoneIcon from "../../assets/footer/phone.svg";
import MailIcon from "../../assets/footer/mail.svg";
import LocationIcon from "../../assets/footer/location.svg";
import InstagramIcon from "../../assets/footer/instagram.svg";

const Container = styled.footer`
  width: 100%;
  height: 280px;
  background-color: #0e6683;
  color: #fff;
  position: relative;
`;
const Line = styled.div`
  position: absolute;
  top: 220px;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: #1a7897;
`;
const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1170px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const TopContent = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  padding-top: 50px;
`;

const LinkList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 99px);
  column-gap: 100px;
  max-height: 90px;
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
  width: 308px;
  height: 30px;
`;
const Phones = styled.div`
  display: flex;
  justify-content: space-between;
  width: 280px;
`;
const Phone = styled.a`
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: #fff;
  font-feature-settings: "pnum" on, "lnum" on;
  text-decoration: none;
`;
const LocationWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
`;
const Location = styled.address`
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  margin-left: 8px;
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
  height: 60px;

  display: flex;
  justify-content: space-between;
`;
const CopyrightAndPolicy = styled.div`
  height: 100%;
  display: flex;
  align-items: center;

  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
`;

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
      <Line />
      <ContentWrapper>
        <TopContent>
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
        </TopContent>
        <BottomContent>
          <CopyrightAndPolicy>
            © 2022 Ecosiprom, Все права защищены
          </CopyrightAndPolicy>
          <CopyrightAndPolicy>Политика конфиденциальности</CopyrightAndPolicy>
        </BottomContent>
      </ContentWrapper>
    </Container>
  );
}

export default Footer;
