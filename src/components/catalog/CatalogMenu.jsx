import * as React from "react";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import { useAppContext } from "../../api/contextApi";
import PrimaryButton from "../buttons/PrimaryButton";
import DropdownIcon from "../../assets/dropdown-white.svg";

const CatalogMenu = () => {
  const { state, dispatch } = useAppContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { privody: "Арматура, приводы и регуляторы" },
    { gorelki: "Промышленные горелки" },
    { nasosy: "Топливные насосы" },
    { datchiki: "Датчики реле, автоматы горения" },
    { ask: "Оборудование АСК" },
  ];
  const isTablet = useMediaQuery({ minWidth: 767, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isMobileS = useMediaQuery({ maxWidth: 350 });
  if (isMobile) {
    const currentIndex = menuItems.findIndex((item) => {
      const key = Object.keys(item)[0];
      if (state.catalogCurrentItem === key) return true;
      return false;
    });

    const el = menuItems.splice(currentIndex, 1)[0];
    menuItems.splice(0, 0, el);
  }

  const handleClickMenuItem = (key) => {
    dispatch({ type: "CATALOG-MENU", payload: key });
    setIsMobileMenuOpen(false);
  };
  const handleMobileMenuDropdown = (e) => {
    e.stopPropagation();
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <Container height={isMobileMenuOpen ? "100%" : null}>
      {menuItems.map((item) => {
        const key = Object.keys(item)[0];
        const value = Object.values(item)[0];

        const isCurrent = state.catalogCurrentItem === key;

        return (
          <Item
            key={key}
            isCurrent={isCurrent}
            isMobileMenuOpen={isMobileMenuOpen}
            onClick={() => handleClickMenuItem(key)}>
            <PrimaryButton
              text={value}
              isMobile
              fontSize={isTablet || isMobileS ? 13 : null}
              padding={isTablet ? "0" : isMobileS ? "0 20px 0 0" : null}
              height={60}
              border
              backgroundColor={isCurrent ? "#0E6683" : "#fff"}
              color={isCurrent ? "#fff" : "#0E6683"}
              hoverStyles={{
                backgroundColor: "#0E6683",
                color: "#fff",
              }}
            />
            <DropdownIconWrapper
              onClick={(e) => handleMobileMenuDropdown(e)}
              rotate={isMobileMenuOpen ? "true" : "false"}>
              <DropdownIcon />
            </DropdownIconWrapper>
          </Item>
        );
      })}
    </Container>
  );
};

export default React.memo(CatalogMenu);

const Container = styled.div`
  display: flex;
  margin-bottom: 40px;
  @media (max-width: 767px) {
    z-index: 100;
    width: 100%;
    position: absolute;
    top: 232px;
    left: 0;
    height: ${({ height }) => (height ? height : "60px")};
    overflow: hidden;
    flex-direction: column;
    padding: 0 20px;
  }
`;
const Item = styled.div`
  width: 100%;
  max-width: 234px;
  height: 60px;
  position: relative;
  @media (max-width: 767px) {
    max-width: 100%;
    display: ${({ isCurrent, isMobileMenuOpen }) =>
      isMobileMenuOpen ? "block" : isCurrent ? "block" : "none"};
  }
`;
const DropdownIconWrapper = styled.div`
  display: none;
  @media (max-width: 767px) {
    display: block;
    z-index: 1000;
    position: absolute;
    top: 20px;
    right: 15px;
    width: 20px;
    height: 20px;
    transform: ${({ rotate }) => (rotate === "true" ? "rotate(-180deg)" : "0")};
    transition: transform 0.3s ease-in-out;
  }
`;
