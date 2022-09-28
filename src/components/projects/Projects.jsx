import parse from "html-react-parser";
import * as React from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import ProductionDirections from "../directions-of-production/ProductionDirections";
import ProjectsBox from "./ProjectsBox";

const Projects = ({ children, title, content, nodes }) => {
  let options = {
    replace: (domNode) => {
      if (domNode.attribs && domNode.attribs.class === "images-wrapper") {
        return <></>;
      }
    },
  };

  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <Container>
      <ContentWrapper>
        <Header>
          <div>
            <Navigation>{children}</Navigation>
            <Title>{title}</Title>
          </div>
        </Header>
        <Info isMobile={isMobile}>{parse(content, options)}</Info>
        <ProductionDirections />
        <List>
          {nodes.map((item) => {
            return <ProjectsBox itemData={item} key={item.id} />;
          })}
        </List>
      </ContentWrapper>
    </Container>
  );
};

export default Projects;

const Container = styled.section`
  display: flex;
  justify-content: center;

  background-color: #fff;
  padding-bottom: 20px;
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
  @media (max-width: 767px) {
    max-width: max-content;
    padding: 0 20px;
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
`;
const Info = styled.div`
  color: #4a5763;
  line-height: 27px;
  margin-top: 24px;
  @media (max-width: 767px) {
    margin-top: ${({ isMobile }) => (isMobile ? "120px" : "24px")};
  }
`;
const List = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-column-gap: 20px;
  grid-row-gap: 40px;
  width: 100%;
  @media (max-width: 767px) {
    grid-template-columns: auto auto;
  }
  @media (max-width: 600px) {
    grid-template-columns: auto;
    justify-items: center;
  }
`;
const Navigation = styled.div`
  padding: 50px 0 20px;
`;
