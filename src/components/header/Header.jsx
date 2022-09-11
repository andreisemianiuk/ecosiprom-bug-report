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
const MenuContainer = styled.div`
  position: fixed;
  top: 81px;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #fff;
  transition: left 0.5s ease-in-out;
`;
const ContactHeaderWrapper = styled.div`
  padding-bottom: 100px;
  background-color: #f3f7f9;
`;
const SendButtonWrapper = styled.div`
  width: 100%;
  padding: 0 20px;
`;

const Header = ({ location }) => {
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const handleMobileMenu = () => {
    setIsOpenMobileMenu(!isOpenMobileMenu);
  };

  return (
    <HeaderContainer>
      <Desktop>
        <ContactHeader />
      </Desktop>
      <LogoNavbarContainer>
        <ContentWrapper>
          <Default>
            {!isOpenMobileMenu ? (
              <HamburgerWrapper onClick={handleMobileMenu}>
                <HamburgerIcon />
              </HamburgerWrapper>
            ) : (
              <HamburgerWrapper onClick={handleMobileMenu}>
                <CrossIcon />
              </HamburgerWrapper>
            )}
          </Default>
          <Link to={"/"}>
            <Logo color={"primary"} width={isMobile ? 170 : 230} />
          </Link>
          <Default>
            <PhoneIconWrapper>
              <PhoneIcon />
            </PhoneIconWrapper>
            {isOpenMobileMenu && (
              <MenuContainer>
                <Navbar location={location} />
                <ContactHeaderWrapper>
                  <ContactHeader />
                  <SendButtonWrapper>
                    <PrimaryButton
                      isMobile
                      height={48}
                      text={"Оставить заявку"}
                      pathTo={"/send-form"}
                      state={{ modal: true }}
                    />
                  </SendButtonWrapper>
                </ContactHeaderWrapper>
              </MenuContainer>
            )}
          </Default>
          <Desktop>
            <Navbar location={location} />
            <PrimaryButton
              text={"Оставить заявку"}
              pathTo={"/send-form"}
              state={{ modal: true }}
            />
          </Desktop>
        </ContentWrapper>
      </LogoNavbarContainer>
    </HeaderContainer>
  );
};

export default Header;
