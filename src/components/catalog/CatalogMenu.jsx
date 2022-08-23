import * as React from "react";
import styled from "styled-components";
import { useAppContext } from "../../api/contextApi";
import PrimaryButton from "../buttons/PrimaryButton";

const Container = styled.div`
  display: flex;
  margin-bottom: 40px;
`;
const Item = styled.div`
  width: 234px;
  height: 60px;
`;

const CatalogMenu = () => {
  const { state, dispatch } = useAppContext();

  const itemsTest = [
    { privody: "Арматура, приводы и регуляторы" },
    { gorelki: "Промышленные горелки" },
    { nasosy: "Топливные насосы" },
    { datchiki: "Датчики реле, автоматы горения" },
    { ask: "Оборудование АСК" },
  ];

  return (
    <Container>
      {itemsTest.map((item) => {
        const key = Object.keys(item)[0];
        const value = Object.values(item)[0];

        const isCurrent = state.catalogCurrentItem === key;

        return (
          <Item
            key={key}
            onClick={() => dispatch({ type: "CATALOG-MENU", payload: key })}>
            <PrimaryButton
              text={value}
              width={234}
              height={60}
              border
              backgroundColor={isCurrent ? "#0E6683" : "#fff"}
              color={isCurrent ? "#fff" : "#0E6683"}
              hoverStyles={{
                backgroundColor: "#0E6683",
                color: "#fff",
              }}
            />
          </Item>
        );
      })}
    </Container>
  );
};

export default React.memo(CatalogMenu);
