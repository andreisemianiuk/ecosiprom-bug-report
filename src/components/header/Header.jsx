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
import useScreenWidth from "../../common/screen-width/useScreenWidth.js";
import { useState } from "react";

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
  @media (max-width: 768px) {
    padding: 0 20px;
  }
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
`;

const Header = ({ location }) => {
  const screenWidth = useScreenWidth();
  const isMobile = screenWidth < 768;
  console.log("🚀 ~ file: Header.jsx ~ line 54 ~ Header ~ isMobile", isMobile);
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);

  const handleMobileMenu = () => {
    setIsOpenMobileMenu(!isOpenMobileMenu);
  };

  return (
    <HeaderContainer>
      {!isMobile && <ContactHeader />}
      <LogoNavbarContainer>
        <ContentWrapper>
          {isMobile ? (
            !isOpenMobileMenu ? (
              <HamburgerWrapper onClick={handleMobileMenu}>
                <HamburgerIcon />
              </HamburgerWrapper>
            ) : (
              <HamburgerWrapper onClick={handleMobileMenu}>
                <CrossIcon />
              </HamburgerWrapper>
            )
          ) : null}
          <Link to={"/"}>
            <Logo color={"primary"} width={!isMobile ? 230 : 170} />
          </Link>
          {!isMobile && <Navbar location={location} />}
          {!isMobile && (
            <PrimaryButton
              text={"Оставить заявку"}
              pathTo={"/send-form"}
              state={{ modal: true }}
            />
          )}
          {isMobile && <PhoneIcon />}
        </ContentWrapper>
      </LogoNavbarContainer>
    </HeaderContainer>
  );
};

export default Header;
