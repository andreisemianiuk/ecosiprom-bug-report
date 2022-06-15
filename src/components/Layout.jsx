import * as React from "react"
import styled from "styled-components"
import Footer from "./Footer"
import Header from "./header/Header"

// const Container = styled.div`
//   position: relative;
// `
// const HeaderContainer = styled.div`
//   position: fixed;
//   top: 0;
//   width: 100%;
//   overflow: hidden;
// `
const MainContent = styled.div`
  min-height: 80vh;
  padding-top: 110px;
`

export default function Layout({ children }) {
  return (
    <>
      {/* <HeaderContainer> */}
      <Header />
      {/* </HeaderContainer> */}
      <MainContent>{children}</MainContent>
      <Footer />
    </>
  )
}
