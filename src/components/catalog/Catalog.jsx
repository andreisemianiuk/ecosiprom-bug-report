import * as React from "react";
import styled from "styled-components";
import { useAppContext } from "../../api/contextApi";
import CatalogBox from "./CatalogBox";
import CatalogMenu from "./CatalogMenu";

const Container = styled.section`
  display: flex;
  justify-content: center;

  background-color: #fff;
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 1170px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;
const Navigation = styled.div`
  padding: 50px 0 20px;
`;
const Title = styled.h1`
  margin: 0;
  margin-bottom: 40px;
`;
const List = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 19px;
  grid-row-gap: 20px;

  width: 100%;
`;

const Catalog = ({ children, images, title, isMain, location }) => {
  // isMain is used to determine if the catalog is being rendered on the main catalog page or not

  const { state } = useAppContext();

  const filteredImages = isMain
    ? images.filter((node) => {
        return node.title.includes(state.catalogCurrentItem);
      })
    : images;

  return (
    <Container>
      <ContentWrapper>
        <Header>
          <div>
            <Navigation>{children}</Navigation>
            <Title>{title}</Title>
          </div>
        </Header>
        {isMain && <CatalogMenu />}
        <List>
          {filteredImages.map((item) => {
            return <CatalogBox itemData={item} location={location} />;
          })}
        </List>
      </ContentWrapper>
    </Container>
  );
};

export default Catalog;
