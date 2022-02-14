import React from 'react'
import styled from 'styled-components'
import rightArrow from '../images/right-arrow.png'
import leftArrow from '../images/left-arrow.png'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 10vh;
  text-align: center;
  color: #ffffff;
  background-color: #00637f;
`
const ArrowContainer = styled.span`
  display: inline-flex;
  /* margin: 0 5px; */
  padding: 8px;
  /* border: 1px solid #00637f; */
`
const Arrow = styled.img`
  width: 32px;
  height: 32px;
`
const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8em;
  /* text-align: center; */
  /* color: #ffffff; */
`

function ServicesSlider({ items = [], desc, switchItem }) {
  let currentIndex = items.findIndex(v => v === desc)
  let item = items[currentIndex]
  let switchLeft = () => {
    if (currentIndex > 0) {
      switchItem(items[--currentIndex])
    } else {
      switchItem(items[items.length - 1])
    }
  }
  let switchRight = () => {
    if (currentIndex < items.length - 1) {
      switchItem(items[++currentIndex])
    } else {
      switchItem(items[0])
    }
  }
  return (
    <Container>
      <ArrowContainer onClick={switchLeft}>
        <Arrow src={leftArrow} alt='' />
      </ArrowContainer>
      <Item>{item}</Item>
      <ArrowContainer onClick={switchRight}>
        <Arrow src={rightArrow} alt='' />
      </ArrowContainer>
    </Container>
  )
}

export default ServicesSlider
