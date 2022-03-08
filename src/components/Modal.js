import { Link } from 'gatsby'
import { ModalRoutingContext } from 'gatsby-plugin-modal-routing'
import React from 'react'
import styled from 'styled-components'
import CloseCross from '../assets/cross-svgrepo-com.svg'
import { devices } from '../common/MediaQuery/media-query'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.3);
`
const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: relative;
  width: min(80%, 1000px);
  padding-bottom: 30px;
  margin: 20px 0;
  background-color: #fff;
  border-radius: 15px;
  @media ${devices.mobileL} {
    width: 100%;
    margin: 0;
    border-radius: 0;
  }
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
