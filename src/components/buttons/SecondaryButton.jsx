import * as React from "react";
import styled from "styled-components";
import RightArrowIcon from "../../assets/right-arrow.svg";
import SecondaryIcon from "../../assets/secondary.svg";

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 102px;
  height: 20px;
  padding: 0;
  background-color: transparent;
  border: none;
  border-radius: 2px;
  gap: 8px;
  cursor: pointer;
`;
const StyledIcon = styled(SecondaryIcon)`
  position: absolute;
  top: 2px;
  left: 0;
  transition: filter 0.5s ease-in-out;
  filter: ${({ hovered }) =>
    hovered
      ? "invert(36%) sepia(81%) saturate(469%) hue-rotate(149deg) brightness(93%) contrast(91%)"
      : "none"};
`;
const StyledArrowIcon = styled(RightArrowIcon)`
  position: absolute;
  top: 6px;
  left: 2px;
`;
const Title = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: ${({ hovered }) => (hovered ? "#1a7897" : "#4a5763")};

  transition: color 0.4s ease-in-out;
`;

const SecondaryButton = ({ title, callback, hovered }) => {
  return (
    <StyledButton onClick={callback}>
      <StyledIcon hovered={hovered} />
      <StyledArrowIcon />
      <Title hovered={hovered}>{title}</Title>
    </StyledButton>
  );
};

export default SecondaryButton;
