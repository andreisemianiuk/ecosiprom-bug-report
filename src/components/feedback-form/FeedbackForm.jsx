import * as React from "react";
import styled from "styled-components";
import PrimaryButton from "../buttons/PrimaryButton";

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  background-color: #cfe0e6;
`;
const Info = styled.div`
  max-width: 373px;
  margin-right: 67px;
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
`;

const FeedbackForm = () => {
  return (
    <Container>
      <Info>
        <Title>Остались вопросы?</Title>
        <Text>
          Свяжитесь с нами и наши специалисты ответят на любые интересующие вас
          вопросы.
        </Text>
      </Info>
      <PrimaryButton text={"Получить консультацию"} width={250} isRightArrow />
    </Container>
  );
};

export default FeedbackForm;
