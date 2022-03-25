import React from 'react'
import styled from 'styled-components'
import { devices } from '../common/MediaQuery/media-query'

const Container = styled.address`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: clamp(300px, 30%, 600px);
  text-align: center;
  font-style: normal;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 1.4em;
  color: #00637f;
  font-weight: bold;
  @media (max-width: 1800px) {
    font-size: 1em;
  }
  @media ${devices.laptopL} {
    font-size: 0.9em;
  }
  @media (max-width: 1300px) {
    font-size: 0.8em;
  }
  @media (max-width: 1200px) {
    font-size: 0.7em;
  }
  @media (max-width: 950px) {
    width: clamp(300px, 100%, 400px);
    margin-top: 20px;
    font-size: 1em;
  }
  @media ${devices.mobileL} {
    font-size: 0.9em;
  }
  @media ${devices.mobileM} {
    font-size: 0.8em;
  }
  @media ${devices.mobileS} {
    font-size: 0.75em;
  }
`
const Info = styled.div``
const PhonesWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  @media (max-width: 950px) {
    flex-direction: column;
  }
`
const Phone = styled.a`
  color: #00637f;
  text-decoration: none;
  @media ${devices.desktop} {
    /* font-size: 1em; */
  }
`

export const ContactHeader = () => {
  return (
    <Container>
      <Info>220073 г. Минск ул. Гусовского 2а</Info>
      <PhonesWrapper>
        <Phone href='tel:+37529-662-30-04'>+375 (29) 662-30-04</Phone>
        <Phone href='tel:+37517-275-23-06'>+375 (17) 275-23-06</Phone>
      </PhonesWrapper>
    </Container>
  )
}
