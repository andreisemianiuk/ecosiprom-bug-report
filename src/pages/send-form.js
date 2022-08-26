import React from "react";
import { ModalRoutingContext } from "gatsby-plugin-modal-routing-3";
import { Link } from "gatsby";
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
            <SendForm />
          </Container>
        );
      }}
    </ModalRoutingContext.Consumer>
  );
};

export default SendFormPage;
