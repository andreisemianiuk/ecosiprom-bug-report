import { ModalRoutingContext } from "gatsby-plugin-modal-routing-3";
import React from "react";
import styled from "styled-components";
import SendForm from "../components/send-form/SendForm";

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const SendFormPage = () => {
  return (
    <ModalRoutingContext.Consumer>
      {({ modal, closeTo }) => {
        return (
          <Container>
            <SendForm closeTo={closeTo} />
          </Container>
        );
      }}
    </ModalRoutingContext.Consumer>
  );
};

export default SendFormPage;
