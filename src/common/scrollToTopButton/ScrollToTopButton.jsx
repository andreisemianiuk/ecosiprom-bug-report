import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ArrowToTopIcon from "../../images/arrow-to-top.png";

const ScrollToTopButton = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const updateState = () => {
      let scrollY = window.pageYOffset;

      if (!showScroll && scrollY > 400) {
        setShowScroll(true);
      } else if (showScroll && scrollY <= 400) {
        setShowScroll(false);
      }
    };
    window.addEventListener("scroll", updateState);
    return () => window.removeEventListener("scroll", updateState);
  }, [showScroll]);

  const scrollTop = (e) => {
    e.stopPropagation();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container>
      <IconWrapper
        onClick={scrollTop}
        onKeyDown={scrollTop}
        style={
          showScroll === true ? { display: "block" } : { display: "none" }
        }>
        <Icon src={ArrowToTopIcon} alt="arrow button to top" />
      </IconWrapper>
    </Container>
  );
};
export default ScrollToTopButton;

const Container = styled.div`
  cursor: pointer;
  opacity: 1;
  &:hover {
    opacity: 0.8;
  }
  transition: opacity 0.3s ease-in-out;
`;
const IconWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 30px;
  z-index: 999;
`;
const Icon = styled.img`
  width: 60px;
  height: 60px;
`;
