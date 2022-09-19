import * as React from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import PrimaryButton from "../buttons/PrimaryButton";

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  background-color: #cfe0e6;
  @media (max-width: 767px) {
    height: max-content;
    padding: 50px 20px;
    flex-direction: column;
  }
`;
const Info = styled.div`
  max-width: 373px;
  margin-right: 67px;
  @media (max-width: 767px) {
    max-width: max-content;
    margin-right: 0;
  }
`;
const ButtonWrapper = styled.div`
  width: ${({ isMobile }) => (isMobile ? "100%" : "fit-content")};
`;
const Title = styled.h2`
  margin: 0;
  margin-bottom: 10px;
  line-height: 40px;
`;
const Text = styled.p`
  margin: 0;
  line-height: 24px;
  color: #4a5763;
  @media (max-width: 767px) {
    margin-bottom: 30px;
  }
`;

const FeedbackForm = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <Container>
      <Info>
        <Title>Остались вопросы?</Title>
        <Text>
          Свяжитесь с нами и наши специалисты ответят на любые интересующие вас
          вопросы.
        </Text>
      </Info>
      <ButtonWrapper isMobile={isMobile}>
        <PrimaryButton
          isMobile={isMobile}
          text={"Получить консультацию"}
          width={250}
          isRightArrow
          pathTo={"/send-form"}
          state={{ modal: true }}
        />
      </ButtonWrapper>
    </Container>
  );
};

export default FeedbackForm;
