import React from "react";
import styled from "styled-components";

const LoaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ffff;
  z-index: 9999;
  display: none;
  justify-content: center;
  align-items: center;
`;
const Loader = () => {
  return <LoaderWrapper id={"loader-wrapper"}>Loading...</LoaderWrapper>;
};

export default Loader;
