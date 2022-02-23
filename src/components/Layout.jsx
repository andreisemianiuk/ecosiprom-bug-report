import * as React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { devices } from '../common/MediaQuery/media-query'
import { ContactHeader } from './ContactHeader'
import { Logo } from './Logo'
import { Navbar } from './Navbar'
import Footer from './Footer'

const Container = styled.div``
const MainContent = styled.div`
  min-height: 80vh;
`
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
  @media ${devices.tablet} {
    flex-direction: column;
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
