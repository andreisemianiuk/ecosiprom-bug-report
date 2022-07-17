import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import styled from "styled-components";
import PrimaryButton from "../buttons/PrimaryButton";
import parse, { domToReact } from "html-react-parser";
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
`;
const Info = styled.div`
  color: #4a5763;
  line-height: 27px;
  margin-top: 24px;
  margin-bottom: 40px;
`;
const List = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 20px;

  width: 100%;
`;

const Catalog = ({ children, images, title, isMain }) => {
  // isMain is used to determine if the catalog is being rendered on the main catalog page or not
  const [currentItem, setCurrentItem] = React.useState([0, "privody"]);

  const filteredImages = isMain
    ? images.filter((node) => {
        return node.title.includes(currentItem[1]);
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
        <CatalogMenu
          currentItem={currentItem}
          setCurrentItem={setCurrentItem}
        />
        <List>
          {filteredImages.map((item) => {
            return <CatalogBox itemData={item} />;
          })}
        </List>
      </ContentWrapper>
    </Container>
  );
};

export default Catalog;
