import { Link } from "gatsby";
import * as React from "react";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import { useAppContext } from "../../api/contextApi";
import DropdownIcon from "../../assets/dropdown-white.svg";
import AskIcon from "../../assets/services/ask.svg";
import AvtomatIcon from "../../assets/services/avtomat.svg";
import ElectroIcon from "../../assets/services/electro.svg";
import GazIcon from "../../assets/services/gaz.svg";
import OtoplenieIcon from "../../assets/services/otoplenie.svg";
import { NotMobile } from "../../common/media-query-components/media-query-components";
import SecondaryButton from "../buttons/SecondaryButton";

const icons = [
  { title: "Автоматизированные системы контроля выбросов", icon: AskIcon },
  { title: "Производство электрощитовой продукции", icon: ElectroIcon },
  { title: "Системы газоснабжения и газопотребления", icon: GazIcon },
  { title: "Автоматизация технологических процессов", icon: AvtomatIcon },
  { title: "Система отопления и кондиционирования", icon: OtoplenieIcon },
];

const ProductionDirections = ({ isMain, bottomMargin }) => {
  const { state, dispatch } = useAppContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  if (isMobile && !isMain) {
    const currentIndex = icons.findIndex((item) => {
      if (state.projectsCurrentItem === item.title) return true;
      return false;
    });
    const el = icons.splice(currentIndex, 1)[0];
    icons.splice(0, 0, el);
  }

  const handleClickMenuItem = (key) => {
    dispatch({ type: "PROJECTS-MENU", payload: key });
    setIsMobileMenuOpen(false);
  };

  const handleMobileMenuDropdown = (e) => {
    e.stopPropagation();
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <DirectionsList
      bottomMargin={bottomMargin}
      height={isMobileMenuOpen ? "100%" : null}>
      {icons.map((item, index) => (
        <div key={index}>
          <DirectionsItem
            handleClickMenuItem={() => handleClickMenuItem(item.title)}
            isMain={isMain}
            item={item}
            isCurrentItem={
              item.title === state.projectsCurrentItem ? true : false
            }
          />
          <DropdownIconWrapper
            onClick={(e) => handleMobileMenuDropdown(e)}
            rotate={isMobileMenuOpen ? "true" : "false"}>
            <DropdownIcon />
          </DropdownIconWrapper>
        </div>
      ))}
    </DirectionsList>
  );
};

const DirectionsItem = ({
  item,
  handleClickMenuItem,
  isMain,
  isCurrentItem,
}) => {
  const [hovered, setHovered] = React.useState(false);

  const handleHoverOn = () => {
    setHovered(true);
  };
  const handleHoverOff = () => {
    if (!isCurrentItem) {
      setHovered(false);
    }
  };

  useEffect(() => {
    if (isCurrentItem) {
      setHovered(true);
    } else {
      setHovered(false);
    }
  }, [isCurrentItem]);

  return (
    <DirectionsItemStyled
      onClick={handleClickMenuItem}
      isCurrentItem={isCurrentItem}
      onMouseOver={handleHoverOn}
      onMouseLeave={handleHoverOff}>
      <NotMobile>
        <StyledIcon hovered={hovered}>
          <item.icon />
        </StyledIcon>
      </NotMobile>
      <DirectionTitle>{item.title}</DirectionTitle>
      <NotMobile>
        <Link to={isMain ? "/projects/" : ""}>
          <SecondaryButton
            title={"Подробнее"}
            hovered={hovered}
            fontSize={"13px"}
          />
        </Link>
      </NotMobile>
    </DirectionsItemStyled>
  );
};

export default ProductionDirections;

const DirectionsList = styled.ul`
  display: flex;
  justify-content: center;
  position: relative;
  bottom: ${({ bottomMargin }) => (bottomMargin ? `${bottomMargin}px` : 0)};
  overflow: hidden;
  z-index: 100;
  @media (max-width: 767px) {
    justify-content: flex-start;
    width: 100%;
    max-width: 700px;
    position: absolute;
    top: 230px;
    bottom: auto;
    left: 0;
    height: ${({ height }) => (height ? height : "60px")};
    flex-direction: column;
    padding: 0 20px;
  }
`;
const DirectionsItemStyled = styled.li`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  cursor: none;
  position: relative;
  width: 100%;
  max-width: 234px;
  height: 230px;
  box-sizing: border-box;
  background: #ffffff;
  box-shadow: inset 0px 1px 0px #dbdbe1, inset 1px 0px 0px #dbdbe1,
    inset -1px 0px 0px #dbdbe1, inset 0px -2px 0px #dbdbe1;
  border-radius: 2px;
  padding: 20px;
  margin: 0;
  list-style: none;
  cursor: pointer;
  @media (min-width: 768px) {
    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: ${({ isCurrentItem }) => (isCurrentItem ? "4px" : 0)};
      border-radius: 1px;
      background-color: #0e6683;
      bottom: ${({ isCurrentItem }) => (isCurrentItem ? " calc(0px)" : 0)};
      left: 0;
      will-change: top;
      transition: all 0.3s ease-in-out;
    }
    &:hover::before {
      height: 4px;
      bottom: calc(0px);
    }
  }
  @media (max-width: 991px) {
    padding: 20px 7px;
  }
  @media (max-width: 767px) {
    max-width: none;
    height: 60px;
    background-color: ${({ isCurrentItem }) =>
      isCurrentItem ? "#0e6683" : "#fff"};
    color: ${({ isCurrentItem }) => (!isCurrentItem ? "#0e6683" : "#fff")};
    padding: 20px 0 0 20px;
    box-shadow: none;
    border: 1px solid #dbdbe1;
  }
  @media (max-width: 450px) {
    padding: 10px 60px 0 20px;
  }
`;
const DirectionTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  line-height: 22px;
  height: 66px;
  @media (max-width: 1223px) {
    font-size: 13px;
  }
  @media (max-width: 991px) {
    font-size: 12px;
  }
  @media (max-width: 767px) {
    font-size: 14px;
  }
`;
const StyledIcon = styled.div`
  transition: filter 0.4s ease-in-out;
  filter: ${({ hovered }) =>
    hovered
      ? "brightness(0) saturate(100%) invert(30%) sepia(61%) saturate(748%) hue-rotate(151deg) brightness(93%) contrast(92%)"
      : "none"};
`;
const DropdownIconWrapper = styled.div`
  display: none;
  @media (max-width: 767px) {
    display: block;
    z-index: 1000;
    position: absolute;
    top: 20px;
    right: 40px;
    width: 20px;
    height: 20px;
    transform: ${({ rotate }) => (rotate === "true" ? "rotate(-180deg)" : "0")};
    transition: transform 0.3s ease-in-out;
  }
`;
