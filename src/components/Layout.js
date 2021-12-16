import * as React from 'react'
import {Navbar} from './Navbar'
import {StaticImage} from 'gatsby-plugin-image'
import {Link} from 'gatsby'
import {ContactHeader} from './ContactHeader'
import styled from 'styled-components'
import {devices} from '../common/MediaQuery/media-query'
import {Footer} from './Footer'

const Container = styled.div`

`
const MainContent = styled.div`
  padding: 20px 50px;
  @media ${devices.mobileL} {
    padding-block: 20px;
    padding-inline: 10px;
  }
`
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  @media ${devices.tablet} {
    flex-direction: column;
  }
`
const StyledLink = styled(Link)`
  text-align: center;
`
const LogoItem = styled.div`
  margin: 0 auto 20px;
`

export default function Layout({children}) {
  return (
    <Container>
      <Header>
        <StyledLink to={'/'}>
          <Logo/>
        </StyledLink>
        <ContactHeader/>
        <Navbar/>
      </Header>
      <MainContent>
        {children}
      </MainContent>
      <Footer/>
    </Container>
  )
}

function Logo() {
  return (
    <LogoItem>
      <StaticImage
        src="../images/logo-ecosiprom.png"
        alt="Logo for site"
        placeholder="blurred"
        layout="constrained"
        width={250}
      />
    </LogoItem>
  )
}