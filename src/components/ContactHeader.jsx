import React from 'react'
import styled from 'styled-components'
import { devices } from '../common/MediaQuery/media-query'
import PhoneCall from '../assets/phone-call2.svg'
import EmailIcon from '../assets/email.svg'

const Container = styled.address`
  display: flex;
  font-style: normal;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 1em;
  color: #00637f;
  font-weight: bold;
  @media ${devices.laptopL} {
    font-size: 0.8em;
  }
  @media (max-width: 1300px) {
    font-size: 0.75em;
  }
  @media (max-width: 1200px) {
    font-size: 0.6em;
  }
  @media (max-width: 950px) {
    margin-top: 20px;
    font-size: 0.9em;
  }
  @media (max-width: 600px) {
    font-size: 0.9em;
    flex-direction: column;
    align-items: center;
  }
  @media ${devices.mobileL} {
    font-size: 0.9em;
  }
  @media ${devices.mobileM} {
    font-size: 0.8em;
  }
  @media ${devices.mobileM} {
    font-size: 0.7em;
  }
`
const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 30px;
  @media (max-width: 600px) {
    margin-right: 0;
  }
`
const EmailWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
  @media (max-width: 600px) {
    margin-bottom: 10px;
  }
`
const EmailIconContainer = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 15px;
`
const Email = styled.a``
const Adress = styled.div``
const PhonesWrapper = styled.div`
  display: flex;
  align-items: center;
`
const Phones = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 10px;
`
const PhoneIcon = styled.div`
  width: 20px;
  height: 20px;
`
const Phone = styled.a`
  color: #00637f;
  text-decoration: none;
  margin: 2px 0;
`

export const ContactHeader = () => {
  return (
    <Container>
      <Info>
        <Adress>220073 г. Минск ул. Гусовского 2а</Adress>
        <EmailWrapper>
          <EmailIconContainer>
            <EmailIcon />
          </EmailIconContainer>
          <Email href='mailto:info@ecosiprom.com'>info@ecosiprom.com</Email>
        </EmailWrapper>
      </Info>
      <PhonesWrapper>
        <PhoneIcon>
          <PhoneCall />
        </PhoneIcon>
        <Phones>
          <Phone href='tel:+37529-662-30-04'>+375 (29) 662-30-04</Phone>
          <Phone href='tel:+37517-275-23-06'>+375 (17) 275-23-06</Phone>
        </Phones>
      </PhonesWrapper>
    </Container>
  )
}
