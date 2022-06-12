import * as React from "react"
import styled from "styled-components"

const StyledButton = styled.button`
  width: 173px;
  height: 48px;
  padding: 18px, 30px, 18px, 30px;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: #ffffff;
  background-color: #0e6683;
  border: none;
  border-radius: 2px;
  cursor: pointer;
`

const PrimaryButton = ({ ...props }) => {
  return (
    <StyledButton {...props} onClick={() => console.log("button clicked")}>
      Оставить заявку
    </StyledButton>
  )
}

export default PrimaryButton
