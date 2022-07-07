import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import PrimaryButton from "../buttons/PrimaryButton";
import { Logo } from "../../common/logo/Logo";
import { Navbar } from "./Navbar";
import { ContactHeader } from "./ContactHeader";

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
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
const Header = () => {
  return (
    <HeaderContainer>
      <ContactHeader />
      <LogoNavbarContainer>
        <ContentWrapper>
          <Link to={"/"}>
            <Logo color={"primary"} width={170} />
          </Link>
          <Navbar />
          <PrimaryButton text={"Оставить заявку"} />
        </ContentWrapper>
      </LogoNavbarContainer>
    </HeaderContainer>
  );
};

export default Header;
