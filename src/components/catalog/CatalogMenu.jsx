import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import PrimaryButton from "../buttons/PrimaryButton";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  margin: 40px 0;
`;
const Item = styled.div`
  width: 234px;
  height: 60px;
`;

const CatalogMenu = ({ currentItem, setCurrentItem }) => {
  const items = [
    ["Арматура, приводы и регуляторы", "privody"],
    ["Промышленные горелки", "gorelki"],
    ["Топливные насосы", "nasosy"],
    ["Датчики реле, автоматы горения", "rele"],
    ["Оборудование АСК", "ask"],
  ];

  return (
    <Container>
      {items.map((item, index) => (
        <Item onClick={() => setCurrentItem([index, item[1]])}>
          <PrimaryButton
            text={item[0]}
            width={234}
            height={60}
            border
            backgroundColor={currentItem[0] === index ? "#0E6683" : "#fff"}
            color={currentItem[0] === index ? "#fff" : "#0E6683"}
            hoverStyles={{
              backgroundColor: "#0E6683",
              color: "#fff",
            }}
          />
        </Item>
      ))}
    </Container>
  );
};

export default React.memo(CatalogMenu);
