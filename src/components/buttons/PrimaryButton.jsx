import { Link } from "gatsby";
import * as React from "react";
import styled from "styled-components";
import RightArrowIcon from "../../assets/right-arrow.svg";

const StyledButton = styled.button`
  width: ${(props) => (props.width ? props.width : `173`)}px;
  height: ${(props) => (props.height ? props.height : `48`)}px;
  padding: 0 18px;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  gap: 8px;
  color: ${(props) => (props.color ? props.color : `#ffffff`)};
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : `#0e6683`};
  border: ${(props) => (props.border ? "1px solid #DBDBE1" : "none")};
  border-radius: ${(props) => (props.border ? "0" : "2px")};
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: ${(props) =>
      props.hoverStyles?.backgroundColor
        ? props.hoverStyles?.backgroundColor
        : `#1a7897`};
    color: ${(props) =>
      props.hoverStyles?.color ? props.hoverStyles?.color : "#fff"};
  }
`;

const Text = styled.div`
  position: relative;
`;
const StyledArrowIcon = styled(RightArrowIcon)`
  margin-left: 10px;
`;

const PrimaryButton = ({
  text,
  width,
  height,
  border,
  pathTo,
  color,
  backgroundColor,
  hoverStyles,
  isRightArrow,
  callback,
  state,
  type,
}) => {
  return (
    <Link to={pathTo} state={state}>
      <StyledButton
        onClick={callback}
        color={color}
        width={width}
        height={height}
        border={border}
        type={type}
        backgroundColor={backgroundColor}
        hoverStyles={hoverStyles}>
        <Text>
          <span>{text}</span>
          {isRightArrow && <StyledArrowIcon />}
        </Text>
      </StyledButton>
    </Link>
  );
};

export default React.memo(PrimaryButton);
