import React from "react";
import styled from "styled-components";
import MobileIcon from "../../assets/mobile.svg";
import PhoneIcon from "../../assets/phone.svg";
import EmailIcon from "../../assets/email.svg";
import PhoneCircleIcon from "../../assets/phone-circle.svg";

export const ContactHeader = () => {
  return (
    <Wrapper>
      <ContentWrapper>
        <ItemWrapper href="tel:+37529-662-30-04">
          <IconWrapper>
            <MobileIcon />
          </IconWrapper>
          <Item>+375 (29) 662-30-04</Item>
        </ItemWrapper>
        <ItemWrapper href="tel:+37517-275-23-06">
          <PhoneWrapper>
            <IconWrapper>
              <PhoneIcon />
              <PhoneCircleIconContainer>
                <PhoneCircleIcon />
              </PhoneCircleIconContainer>
            </IconWrapper>
          </PhoneWrapper>
          <Item>+375 (17) 275-23-06</Item>
        </ItemWrapper>
        <ItemWrapper href="mailto:info@ecosiprom.com">
          <IconWrapper>
            <EmailIcon />
          </IconWrapper>
          <Item>info@ecosiprom.com</Item>
        </ItemWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 30px;
  background-color: #cfe0e6;
  font-size: 14px;
  font-feature-settings: "pnum" on, "lnum" on;
  text-decoration: none;
  @media (max-width: 1123px) {
    flex-direction: column;
    justify-content: space-between;
    height: fit-content;
    padding-top: 30px;
    padding-bottom: 20px;
    background-color: inherit;
  }
`;
const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  max-width: 1170px;
  margin: 0 auto;
  @media (max-width: 1123px) {
    flex-direction: column;
    width: 200px;
    justify-content: center;
  }
`;
const ItemWrapper = styled.a`
  display: flex;
  align-items: center;
  margin-left: 26px;
  text-decoration: none;
  &:first-child {
    margin-left: 0;
  }
  @media (max-width: 1123px) {
    margin-left: 0;
    margin-bottom: 10px;
  }
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  color: #03141a;
  font-weight: 500;
  padding-left: 10px;
`;
const PhoneWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;
const IconWrapper = styled.div`
  width: 20px;

  display: flex;
  justify-content: center;
`;
const PhoneCircleIconContainer = styled.div`
  position: absolute;
  left: 7px;
  bottom: -4.5px;
`;
