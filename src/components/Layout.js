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
  // @media ${devices.mobileL} {
  // }
`
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  margin: 20px;
  @media ${devices.laptop} {
    flex-direction: column;
    margin: 0 0 10px 0;
  }
`
const StyledLink = styled(Link)`
  @media ${devices.laptop} {
    padding-top: 20px;
    text-align: center;
  }
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