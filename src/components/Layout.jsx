import * as React from "react";
import styled from "styled-components";
import Footer from "./footer/Footer";
import Header from "./header/Header";

const MainContent = styled.div`
  min-height: 80vh;
  padding-top: 110px;
`;

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <MainContent>{children}</MainContent>
      <Footer />
    </>
  );
}
