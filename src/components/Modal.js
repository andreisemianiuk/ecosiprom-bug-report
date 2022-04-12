import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import CloseCross from '../assets/cross-svgrepo-com.svg'
import { devices } from '../common/MediaQuery/media-query'
import { ModalRoutingContext } from 'gatsby-plugin-modal-routing-3'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: max(100vh, 570px);
  background: rgba(0, 99, 127, 0.5);
`
const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  position: relative;

  width: min(80%, 1000px);

  margin-top: 5vh;
  margin-bottom: 5vh;
  padding-bottom: 50px;
  background-color: #fff;
  border-radius: 15px;

  @media ${devices.mobileL} {
    width: 100%;
    justify-content: space-around;
    min-height: 100vh;
    margin: 0;
    border-radius: 0;
    padding-top: 20px;
  }
`
const ChildrenWrapper = styled.div`
  height: 100%;
`
const BottomButtonsWrapper = styled.div`
  display: flex;
  width: max(30%, 280px);
  align-items: center;
  justify-content: space-between;
`
const OrderButton = styled.button`
  width: 200px;
  height: 50px;
  border: none;
  border-radius: 10px;
  color: #fff;
  background-color: #00637f;
  font-size: 1.2rem;
`
const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  padding: 0;
  background-color: #fff;
  border: none;
`
const CloseLink = styled(Link)`
  text-decoration: none;

  font-size: max(1.2rem, 50%);
  &:hover {
    opacity: 0.7;
  }
`

const Modal = ({ location, children }) => (
  <ModalRoutingContext.Consumer>
    {({ closeTo }) => {
      console.log('closeTo >> ', closeTo)
      console.log('location >> ', location)
      return (
        <Container>
          <Box>
            <CloseButton>
              <CloseLink to={location}>
                <CloseCross />
              </CloseLink>
            </CloseButton>
            <ChildrenWrapper>{children}</ChildrenWrapper>
            <BottomButtonsWrapper>
              <CloseLink to={location}>Назад</CloseLink>
              <OrderButton>Заказать</OrderButton>
            </BottomButtonsWrapper>
          </Box>
        </Container>
      )
    }}
  </ModalRoutingContext.Consumer>
)

export default Modal
