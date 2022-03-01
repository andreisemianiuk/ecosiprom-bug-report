import { Link } from 'gatsby'
import { ModalRoutingContext } from 'gatsby-plugin-modal-routing'
import React from 'react'
import styled from 'styled-components'
import CloseCross from '../assets/cross-svgrepo-com.svg'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
`
const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: relative;
  width: 80%;
  height: 90%;
  background-color: #fff;
  border-radius: 15px;
`
const BottomButtonsWrapper = styled.div`
  display: flex;
  width: 30%;
  justify-content: space-between;
`
const OrderButton = styled.button`
  width: 200px;
  height: 50px;
  border: none;
  border-radius: 10px;
  color: #fff;
  background-color: #00637f;
  font-size: 1.5rem;
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
  font-size: 1.5rem;
  &:hover {
    opacity: 0.7;
  }
`

const Modal = ({ location, children }) => (
  <ModalRoutingContext.Consumer>
    {() => {
      return (
        <Container>
          <Box>
            <CloseButton>
              <CloseLink to={location}>
                <CloseCross />
              </CloseLink>
            </CloseButton>
            {children}
            <BottomButtonsWrapper>
              <OrderButton>Заказать</OrderButton>
              <CloseLink to={location}>Назад</CloseLink>
            </BottomButtonsWrapper>
          </Box>
        </Container>
      )
    }}
  </ModalRoutingContext.Consumer>
)

export default Modal
