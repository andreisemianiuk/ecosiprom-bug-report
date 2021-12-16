import React from 'react'
import styled from 'styled-components'
import {devices} from '../common/MediaQuery/media-query'


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 10px;
`
const Item = styled.div`
  text-align: center;
`
const ItemInfo = styled.div`
  color: #00637f;
  font-size: 0.8em;
  font-weight: bold;
  @media ${devices.mobileL} {
    font-size: 0.7em;
  }
`

export const ContactHeader = () => {
  return (
    <Container>
      <Item>
        <ItemInfo>220073 г. Минск ул. Гусовского 2а</ItemInfo>
      </Item>
      <Item>
        <ItemInfo>
          +375 (29) 662-30-04<br/>+375 (17) 275-23-06
        </ItemInfo>
      </Item>
    </Container>
  )
}