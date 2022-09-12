import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import styled from "styled-components";
import PrimaryButton from "../buttons/PrimaryButton";
import parse, { domToReact } from "html-react-parser";
import CatalogBox from "./CatalogBox";
import {
  Mobile,
  NotMobile,
} from "../../common/media-query-components/media-query-components";

const Container = styled.section`
  display: flex;
  justify-content: center;

  background-color: #f3f7f9;
  padding: 80px 0;
  @media (max-width: 767px) {
    padding: 50px 0;
  }
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 1170px;
  @media (max-width: 1223px) {
    max-width: 900px;
  }
  @media (max-width: 991px) {
    max-width: 700px;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;
const Title = styled.h1`
  margin: 0;
  @media (max-width: 767px) {
    font-size: 32px;
    padding-left: 20px;
    margin-bottom: 20px;
  }
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
  @media (max-width: 991px) {
    display: grid;
    justify-items: center;
    grid-template-columns: repeat(2, minmax(335px, 1fr));
    grid-template-rows: repeat(2, max(375px));
    row-gap: 40px;
  }
  @media (max-width: 767px) {
    grid-template-columns: repeat(1, minmax(100vw, 1fr));
    grid-template-rows: repeat(4, max(375px));
  }
`;
const ButtonMobileWrapper = styled.div`
  padding: 0 20px;
  margin-top: 60px;
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
          <NotMobile>
            <PrimaryButton text="Все оборудование" pathTo={"/catalog/"} />
          </NotMobile>
        </Header>
        <NotMobile>
          <Info>{parse(content, options)}</Info>
        </NotMobile>
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
        <Mobile>
          <ButtonMobileWrapper>
            <PrimaryButton
              text="Все оборудование"
              pathTo={"/catalog/"}
              isMobile
            />
          </ButtonMobileWrapper>
        </Mobile>
      </ContentWrapper>
    </Container>
  );
};

export default CatalogMain;
