import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import PrimaryButton from "../buttons/PrimaryButton"
import { Logo } from "./Logo"
import { Navbar } from "./Navbar"
import { ContactHeader } from "./ContactHeader"

const LogoNavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 80px;
  background-color: #ffffff;
  padding: 0 135px;
`
const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  /* overflow: hidden; */
  z-index: 1000;
`
const Header = () => {
  return (
    <HeaderContainer>
      <ContactHeader />
      <LogoNavbarContainer>
        <Link to={"/"}>
          <Logo />
        </Link>
        <Navbar />
        <PrimaryButton text={"Оставить заявку"} />
      </LogoNavbarContainer>
    </HeaderContainer>
  )
}

export default Header
