import * as React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  width: 173px;
  height: 48px;
  padding: 14px 18px;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  gap: 8px;
  color: #ffffff;
  background-color: #0e6683;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: #1a7897;
  }
`;

const PrimaryButton = ({ text, callback }) => {
  return <StyledButton onClick={callback}>{text}</StyledButton>;
};

export default PrimaryButton;
