import React from "react";
import styled from "styled-components";
import MobileIcon from "../../assets/mobile.svg";
import PhoneIcon from "../../assets/phone.svg";
import EmailIcon from "../../assets/email.svg";
import PhoneCircleIcon from "../../assets/phone-circle.svg";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 30px;
  background-color: #cfe0e6;
  font-size: 14px;
  font-feature-settings: "pnum" on, "lnum" on;
  text-decoration: none;
`;
const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  max-width: 1170px;
  margin: 0 auto;
`;
const PhoneWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;
const PhoneCircleIconContainer = styled.div`
  position: absolute;
  left: 6.3px;
  bottom: -4.5px;
`;
const ItemWrapper = styled.a`
  display: flex;
  align-items: center;
  margin-left: 26px;
  &:first-child {
    margin-left: 0;
  }
`;
const Item = styled.a`
  display: flex;
  align-items: center;
  color: inherit;
  font-weight: 500;
  padding-left: 10px;
  text-decoration: none;
`;

export const ContactHeader = () => {
  return (
    <Wrapper>
      <ContentWrapper>
        <ItemWrapper>
          <MobileIcon />
          <Item href="tel:+37529-662-30-04">+375 (29) 662-30-04</Item>
        </ItemWrapper>
        <ItemWrapper>
          <PhoneWrapper>
            <PhoneIcon />
            <PhoneCircleIconContainer>
              <PhoneCircleIcon />
            </PhoneCircleIconContainer>
          </PhoneWrapper>
          <Item href="tel:+37517-275-23-06">+375 (17) 275-23-06</Item>
        </ItemWrapper>
        <ItemWrapper>
          <EmailIcon />
          <Item href="mailto:info@ecosiprom.com">info@ecosiprom.com</Item>
        </ItemWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};
