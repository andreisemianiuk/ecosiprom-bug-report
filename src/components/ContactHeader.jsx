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
  @media ${devices.laptopL} {
    font-size: 1.2rem;
    width: 31%;
  }
  @media ${devices.laptop} {
    font-size: 0.85rem;
  }
  @media ${devices.tablet} {
    font-size: 0.8rem;
  }
  @media ${devices.mobileL} {
    width: 100%;
    font-size: 1.3rem;
    margin-top: 20px;
  }
  @media ${devices.mobileM} {
    font-size: 1.2rem;
  }
  @media ${devices.mobileS} {
    font-size: 1rem;
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
const Phone = styled.div`
  @media ${devices.mobileL} {
    & :first-child {
      margin-right: 0;
    }
  }
`

export const ContactHeader = () => {
  return (
    <Container>
      <Info>220073 г. Минск ул. Гусовского 2а</Info>
      <PhonesWrapper>
        <Phone>+375 (29) 662-30-04</Phone>
        <Phone>+375 (17) 275-23-06</Phone>
      </PhonesWrapper>
    </Container>
  )
}
