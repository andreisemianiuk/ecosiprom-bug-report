import React from 'react'
import styled from 'styled-components'
import { devices } from '../common/MediaQuery/media-query'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 30%;
  text-align: center;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
    'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-size: 2rem;
  color: #00637f;
  font-weight: bold;
  @media ${devices.desktop} {
    font-size: 1.8rem;
    /* width: 28%; */
  }
  @media (max-width: 2300px) {
    font-size: 1.5rem;
    /* width: 28%; */
  }
  @media (max-width: 1800px) {
    font-size: 1.2rem;
    width: 28%;
  }
  @media (max-width: 1600px) {
    font-size: 1.1rem;
  }
  @media ${devices.laptopL} {
    font-size: 1rem;
    /* width: 29%; */
  }
  @media (max-width: 1300px) {
    font-size: 0.8rem;
    width: 29%;
  }
  @media ${devices.laptop} {
    font-size: 0.7rem;
    /* width: 32%; */
  }
  @media (max-width: 900px) {
    font-size: 0.6rem;
    /* width: 32%; */
  }
  @media ${devices.tablet} {
    width: 100%;
    font-size: 1.1rem;
    margin-top: 20px;
  }
  @media ${devices.mobileL} {
    /* width: 100%; */
    /* font-size: 1.2rem; */
    /* margin-top: 20px; */
  }
  @media ${devices.mobileM} {
    font-size: 1rem;
  }
  @media ${devices.mobileS} {
    font-size: 0.9rem;
  }
`
const Info = styled.div``
const PhonesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  @media ${devices.tablet} {
    flex-direction: column;
  }
`
const Phone = styled.a`
  text-decoration: none;
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
