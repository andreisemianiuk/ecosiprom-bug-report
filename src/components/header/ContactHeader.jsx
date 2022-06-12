import React from "react"
import styled from "styled-components"
import MobileIcon from "../../assets/mobile.svg"
import PhoneIcon from "../../assets/phone.svg"
import EmailIcon from "../../assets/email.svg"
import PhoneCircleIcon from "../../assets/phone-circle.svg"

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  height: 30px;
  background-color: #cfe0e6;
  padding: 0 135px;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: "pnum" on, "lnum" on;
  text-decoration: none;
`
const PhoneWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`
const PhoneCircleYIconContainer = styled.div`
  position: absolute;
  left: 41.67%;
  bottom: -14.83%;
`
const ItemWrapper = styled.a`
  display: flex;
  align-items: center;
  margin-left: 20px;
  &:first-child {
    margin-left: 0;
  }
`
const Item = styled.div`
  display: flex;
  align-items: center;
  width: 147px;
  font-weight: 500;
  padding-left: 10px;
`

export const ContactHeader = () => {
  return (
    <Wrapper>
      <ItemWrapper>
        <MobileIcon />
        <Item href="tel:+37529-662-30-04">+375(29)662-30-04</Item>
      </ItemWrapper>
      <ItemWrapper>
        <PhoneWrapper>
          <PhoneIcon />
          <PhoneCircleYIconContainer>
            <PhoneCircleIcon />
          </PhoneCircleYIconContainer>
        </PhoneWrapper>
        <Item href="tel:+37517-275-23-06">+375 (17) 275-23-06</Item>
      </ItemWrapper>
      <ItemWrapper>
        <EmailIcon />
        <Item href="mailto:info@ecosiprom.com">info@ecosiprom.com</Item>
      </ItemWrapper>
    </Wrapper>
  )
}
