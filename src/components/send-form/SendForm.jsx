import { Link } from "gatsby";
import React from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import { Container, Title, Info, Input } from "./styles";

const SendForm = () => {
  return (
    <Container>
      <Title>Оставить заявку</Title>
      <Info>И наш специалист свяжется с вами в ближайшее время</Info>
      <form
        method="post"
        action="https://getform.io/{your-unique-getform-endpoint}">
        <Input type="email" name="name" placeholder="Ваше имя*" />
        <Input type="text" name="phone" placeholder="Ваш телефон*" />
        <Input type="text" name="email" placeholder="Ваш почтовый адрес" />
        <PrimaryButton text={"Оставить заявку"} width={270} height={56} />
      </form>
      {/*<Link to="/">Go back to the homepage</Link>*/}
    </Container>
  );
};

export default SendForm;
