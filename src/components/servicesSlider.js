import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`
const Arrow = styled.span`
  display: inline-block;
  margin: 0 5px;
  padding: 4px 8px;
  background-color: #ffffff;
  border: 1px solid #00637f;
`
const Item = styled.div`
  font-size: 0.8em;
  text-align: center;
  /* color: #ffffff; */
`

export default function ServicesSlider({ items = [], desc, switchItem }) {
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
      <Arrow onClick={switchLeft}>&#8592;</Arrow>
      <Item>{item}</Item>
      <Arrow onClick={switchRight}>&#8594;</Arrow>
    </Container>
  )
}
