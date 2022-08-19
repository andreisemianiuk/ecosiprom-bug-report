import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import styled from "styled-components";
import PrimaryButton from "../buttons/PrimaryButton";
import parse, { domToReact } from "html-react-parser";
import ProjectsBox from "./ProjectsBox";
import ProductionDirections from "../directions-of-production/ProductionDirections";

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
`;
const List = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-column-gap: 20px;
  grid-row-gap: 40px;
  width: 100%;
`;
const Navigation = styled.div`
  padding: 50px 0 20px;
`;

const Projects = ({ children, title, content, nodes }) => {
  let options = {
    replace: (domNode) => {
      if (domNode.attribs && domNode.attribs.class === "images-wrapper") {
        return <></>;
      }
    },
  };
  const [currentItem, setCurrentItem] = React.useState(0);
  return (
    <Container>
      <ContentWrapper>
        <Header>
          <div>
            <Navigation>{children}</Navigation>
            <Title>{title}</Title>
          </div>
        </Header>
        <Info>{parse(content, options)}</Info>
        <ProductionDirections
          currentItem={currentItem}
          setCurrentItem={setCurrentItem}
        />
        <List>
          {nodes.map((item) => {
            return <ProjectsBox itemData={item} />;
          })}
        </List>
      </ContentWrapper>
    </Container>
  );
};

export default Projects;
