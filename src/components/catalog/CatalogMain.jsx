import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import styled from "styled-components";
import PrimaryButton from "../buttons/PrimaryButton";
import parse, { domToReact } from "html-react-parser";
import CatalogBox from "./CatalogBox";

const Container = styled.section`
  display: flex;
  justify-content: center;

  background-color: #f3f7f9;
  padding: 80px 0;
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
  display: flex;
  justify-content: space-between;

  width: 100%;
`;

const CatalogMain = ({ location }) => {
  const {
    allWpMediaItem: { nodes },
    wpPage: { content },
  } = useStaticQuery(graphql`
    query MainCatalogQuery {
      allWpMediaItem(
        filter: { title: { regex: "/catalog/" } }
        sort: { fields: caption }
      ) {
        nodes {
          id
          altText
          title
          description
          localFile {
            childImageSharp {
              gatsbyImageData(placeholder: TRACED_SVG)
            }
          }
        }
      }
      wpPage(title: { eq: "Каталог" }) {
        content
      }
    }
  `);

  let options = {
    replace: (domNode) => {
      if (domNode.attribs && domNode.attribs.class === "main-page-text") {
        return <>{domToReact(domNode.children, options)}</>;
      }
      if (
        domNode.attribs &&
        (domNode.attribs.class === "images" ||
          domNode.attribs.class === "common-text")
      ) {
        return <></>;
      }
    },
  };

  return (
    <Container>
      <ContentWrapper>
        <Header>
          <Title>Каталог</Title>
          <PrimaryButton text="Все оборудование" pathTo={"/catalog/"} />
        </Header>
        <Info>{parse(content, options)}</Info>
        <List>
          {nodes.map((item) => {
            return (
              <CatalogBox
                key={item.id}
                isMain
                itemData={item}
                location={location}
              />
            );
          })}
        </List>
      </ContentWrapper>
    </Container>
  );
};

export default CatalogMain;
