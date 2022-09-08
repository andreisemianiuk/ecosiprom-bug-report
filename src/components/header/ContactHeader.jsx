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
  &:first-child {
    margin-left: 0;
  }
  @media (max-width: 1123px) {
    margin-left: 0;
    margin-bottom: 10px;
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

export const ContactHeader = () => {
  return (
    <Wrapper>
      <ContentWrapper>
        <ItemWrapper>
          <IconWrapper>
            <MobileIcon />
          </IconWrapper>
          <Item href="tel:+37529-662-30-04">+375 (29) 662-30-04</Item>
        </ItemWrapper>
        <ItemWrapper>
          <PhoneWrapper>
            <IconWrapper>
              <PhoneIcon />
              <PhoneCircleIconContainer>
                <PhoneCircleIcon />
              </PhoneCircleIconContainer>
            </IconWrapper>
          </PhoneWrapper>
          <Item href="tel:+37517-275-23-06">+375 (17) 275-23-06</Item>
        </ItemWrapper>
        <ItemWrapper>
          <IconWrapper>
            <EmailIcon />
          </IconWrapper>
          <Item href="mailto:info@ecosiprom.com">info@ecosiprom.com</Item>
        </ItemWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};
