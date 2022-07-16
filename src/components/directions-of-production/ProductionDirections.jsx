import * as React from "react";
import styled from "styled-components";
import AskIcon from "../../assets/services/ask.svg";
import AvtomatIcon from "../../assets/services/avtomat.svg";
import ElectroIcon from "../../assets/services/electro.svg";
import GazIcon from "../../assets/services/gaz.svg";
import OtoplenieIcon from "../../assets/services/otoplenie.svg";
import SecondaryButton from "../buttons/SecondaryButton";

const DirectionsList = styled.ul`
  display: flex;
  justify-content: center;

  position: relative;
  bottom: 130px;
  overflow: hidden;
  z-index: 100;
`;
const DirectionsItemStyled = styled.li`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  position: relative;
  width: 234px;
  height: 230px;
  box-sizing: border-box;
  background: #ffffff;
  box-shadow: inset 1px 0px 0px #dbdbe1, inset -1px 0px 0px #dbdbe1,
    inset 0px -2px 0px #dbdbe1;
  border-radius: 2px;
  padding: 20px;
  margin: 0;
  list-style: none;
  cursor: pointer;
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 0;
    border-radius: 1px;
    background-color: #0e6683;
    bottom: 0;
    left: 0;
    will-change: top;
    transition: all 0.3s ease-in-out;
  }
  &:hover::before {
    height: 4px;
    bottom: calc(0px);
  }
`;
const DirectionTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  line-height: 22px;
  height: 66px;
`;
const StyledIcon = styled.div`
  transition: filter 0.4s ease-in-out;
  filter: ${({ hovered }) =>
    hovered
      ? "brightness(0) saturate(100%) invert(30%) sepia(61%) saturate(748%) hue-rotate(151deg) brightness(93%) contrast(92%)"
      : "none"};
`;

const icons = [
  { title: "Автоматизированные системы контроля выбросов", icon: AskIcon },
  { title: "Производство электрощитовой продукции", icon: ElectroIcon },
  { title: "Системы газоснабжения и газопотребления", icon: GazIcon },
  { title: "Автоматизация технологических процессов", icon: AvtomatIcon },
  { title: "Система отопления и кондиционирования", icon: OtoplenieIcon },
];

const ProductionDirections = () => {
  console.log("🚀 ~rendered  ProductionDirections");

  return (
    <DirectionsList>
      {icons.map((item, index) => (
        <DirectionsItem index={index} item={item} />
      ))}
    </DirectionsList>
  );
};

const DirectionsItem = ({ index, item }) => {
  console.log("🚀 ~rendered  DirectionsItem");
  const [hovered, setHovered] = React.useState(false);

  const handleHoverOn = () => {
    setHovered(true);
  };
  const handleHoverOff = () => {
    setHovered(false);
  };

  return (
    <DirectionsItemStyled
      key={index}
      onMouseOver={handleHoverOn}
      onMouseLeave={handleHoverOff}>
      <StyledIcon hovered={hovered}>
        <item.icon />
      </StyledIcon>
      <DirectionTitle>{item.title}</DirectionTitle>
      <SecondaryButton title={"Подробнее"} hovered={hovered} />
    </DirectionsItemStyled>
  );
};

export default ProductionDirections;
