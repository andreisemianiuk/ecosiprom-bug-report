import { Link } from 'gatsby'
import * as React from 'react'
import styled from 'styled-components'
import { ContactHeader } from './ContactHeader'
import Footer from './Footer'
import { Logo } from './Logo'
import { Navbar } from './Navbar'

const Container = styled.div``
const MainContent = styled.div`
  min-height: 80vh;
`
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
  @media (max-width: 950px) {
    flex-direction: column;
  }
  @media (max-width: 500px) {
    margin: 15px 0;
  }
`
const StyledLink = styled(Link)``

export default function Layout({ children }) {
  return (
    <Container>
      <Header>
        <StyledLink to={'/'}>
          <Logo />
        </StyledLink>
        <ContactHeader />
        <Navbar />
      </Header>
      <MainContent>{children}</MainContent>
      <Footer />
    </Container>
  )
}
