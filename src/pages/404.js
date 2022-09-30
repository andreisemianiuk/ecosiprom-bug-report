import { navigate } from "gatsby";
import React from "react";
import styled from "styled-components";
import Layout from "../components/layout/Layout";

export default function NotFound({ location }) {
  return (
    <Layout location={location}>
      <Container>
        <h1>Page Not Found</h1>
        <p>Oops, we couldn't find this page!</p>
        <button onClick={() => navigate(-1)}>Back to previous page</button>
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;
