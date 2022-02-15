import React from 'react'
import styled from 'styled-components'
import { devices } from '../common/MediaQuery/media-query'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: center;
  padding-left: 10px;
  font-size: 1em;
  color: #00637f;
  font-weight: bold;
  @media ${devices.mobileL} {
    padding-left: 0;
  }
`
const Info = styled.div``
const PhonesWrapper = styled.div`
  display: flex;
  @media ${devices.mobileL} {
    flex-direction: column;
    font-size: 1.2em;
  }
`
const Phone = styled.div`
  & :first-child {
    margin-right: 10px;
  }
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
