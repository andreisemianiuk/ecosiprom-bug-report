import * as React from "react"
import styled from "styled-components"
import Footer from "./Footer"
import Header from "./header/Header"

const MainContent = styled.div`
  min-height: 80vh;
`

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <MainContent>{children}</MainContent>
      <Footer />
    </>
  )
}
