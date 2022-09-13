import { Link } from "gatsby";
import React from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import {
  Container,
  Title,
  Info,
  InputWrapper,
  Input,
  IconWrapper,
  CrossWrapper,
  CrossIconWrapper1,
  CrossIconWrapper2,
} from "./styles";
import UserIcon from "../../assets/user.svg";
import PhoneIcon from "../../assets/phone-2.svg";
import EmailIcon from "../../assets/email.svg";
import OrderTopicIcon from "../../assets/order-topic.svg";
import CrossIcon1 from "../../assets/cross-1.svg";
import CrossIcon2 from "../../assets/cross-2.svg";

const SendForm = ({ closeTo }) => {
  return (
    <Container>
      <Link to={closeTo}>
        <CrossWrapper>
          <CrossIconWrapper1>
            <CrossIcon1 />
          </CrossIconWrapper1>
          <CrossIconWrapper2>
            <CrossIcon2 />
          </CrossIconWrapper2>
        </CrossWrapper>
      </Link>
      <Title>Оставить заявку</Title>
      <Info>И наш специалист свяжется с вами в ближайшее время</Info>
      <form
        method="post"
        action="https://getform.io/f/f72365cf-c61f-4ca5-a3b4-0142ede30602">
        <InputWrapper>
          <IconWrapper>
            <UserIcon />
          </IconWrapper>
          <Input type="text" name="name" placeholder="Ваше имя*" />
        </InputWrapper>
        <InputWrapper>
          <IconWrapper>
            <PhoneIcon />
          </IconWrapper>
          <Input type="text" name="phone" placeholder="Ваш телефон*" />
        </InputWrapper>
        <InputWrapper>
          <IconWrapper>
            <EmailIcon />
          </IconWrapper>
          <Input type="email" name="email" placeholder="Ваш почтовый адрес" />
        </InputWrapper>
        <InputWrapper>
          <IconWrapper>
            <OrderTopicIcon />
          </IconWrapper>
          <Input type="text" name="description" placeholder="Тема заявки" />
        </InputWrapper>
        <PrimaryButton
          text={"Оставить заявку"}
          width={270}
          height={56}
          type={"submit"}
        />
      </form>
      {/*<Link to="/">Go back to the homepage</Link>*/}
    </Container>
  );
};

export default SendForm;
