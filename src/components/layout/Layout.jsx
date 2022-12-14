import * as React from "react";
import styled from "styled-components";
import Footer from "../footer/Footer";
import Header from "../header/Header";

const MainContent = styled.div`
  /*min-height: 80vh;*/
`;

const Layout = ({ children, location = "/" }) => {
  if (typeof window === `undefined`) {
    return <></>;
  }
  return (
    <>
      <Header location={location} />
      <MainContent>{children}</MainContent>
      <Footer />
    </>
  );
};

export default Layout;
