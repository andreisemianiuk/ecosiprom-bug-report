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

const Header = () => {
  return (
    <>
      <ContactHeader />
      <LogoNavbarContainer>
        <Link to={"/"}>
          <Logo />
        </Link>
        <Navbar />
        <PrimaryButton />
      </LogoNavbarContainer>
    </>
  )
}

export default Header
