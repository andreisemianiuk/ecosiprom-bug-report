import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import PrimaryButton from "../buttons/PrimaryButton";
import { Logo } from "../../common/logo/Logo";
import { Navbar } from "./Navbar";
import { ContactHeader } from "./ContactHeader";
import HamburgerIcon from "../../assets/mobile/hamburger.svg";
import PhoneIcon from "../../assets/mobile/phone_for_mobile_header.svg";
import CrossIcon from "../../assets/mobile/cross_mobile.svg";
import { useState } from "react";
import {
  Desktop,
  Default,
} from "../../common/media-query-components/media-query-components";
import { useMediaQuery } from "react-responsive";

const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1000;
  border-bottom: 1px solid #dbdbe1;
  /*@media (max-width: 768px) {
    width: 100vw;
  }*/
`;
const LogoNavbarContainer = styled.div`
  display: flex;
  justify-content: center;

  height: 80px;
  background-color: #ffffff;
`;
const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  max-width: 1170px;
`;
const HamburgerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  cursor: pointer;
  margin-left: 25px;
`;
const PhoneIconWrapper = styled.div`
  margin-right: 25px;
`;

const Header = ({ location }) => {
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const handleMobileMenu = () => {
    setIsOpenMobileMenu(!isOpenMobileMenu);
  };

  return (
    <>
      <Desktop>
        <HeaderContainer>
          <ContactHeader />
          <LogoNavbarContainer>
            <ContentWrapper>
              <Link to={"/"}>
                <Logo color={"primary"} width={isMobile ? 170 : 230} />
              </Link>
              <Navbar location={location} />
              <PrimaryButton
                text={"Оставить заявку"}
                pathTo={"/send-form"}
                state={{ modal: true }}
              />
            </ContentWrapper>
          </LogoNavbarContainer>
        </HeaderContainer>
      </Desktop>
      <Default>
        <HeaderContainer>
          <LogoNavbarContainer>
            <ContentWrapper>
              {!isOpenMobileMenu ? (
                <HamburgerWrapper onClick={handleMobileMenu}>
                  <HamburgerIcon />
                </HamburgerWrapper>
              ) : (
                <HamburgerWrapper onClick={handleMobileMenu}>
                  <CrossIcon />
                </HamburgerWrapper>
              )}
              <Link to={"/"}>
                <Logo color={"primary"} width={isMobile ? 170 : 230} />
              </Link>
              <PhoneIconWrapper>
                <PhoneIcon />
              </PhoneIconWrapper>
            </ContentWrapper>
          </LogoNavbarContainer>
        </HeaderContainer>
      </Default>
    </>
  );
};

export default Header;
