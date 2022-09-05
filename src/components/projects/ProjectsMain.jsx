import { graphql, useStaticQuery } from "gatsby";
import parse, { domToReact } from "html-react-parser";
import * as React from "react";
import styled from "styled-components";
import PrimaryButton from "../buttons/PrimaryButton";
import ProjectsBox from "./ProjectsBox";

const Container = styled.section`
  display: flex;
  justify-content: center;

  background-color: #fff;
  padding: 80px 0 100px;
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
  display: grid;
  grid-template-columns: auto auto auto;
  grid-column-gap: 20px;
  justify-content: space-between;

  width: 100%;
`;

const ProjectsMain = ({ location }) => {
  const [hoveredItemId, setHoveredItemId] = React.useState(null);
  const {
    allWpMediaItem: { nodes },
    wpPage: { content, title },
  } = useStaticQuery(graphql`
    query MainProjectsQuery {
      allWpMediaItem(
        filter: { title: { regex: "/projects/" } }
        sort: { fields: caption }
        limit: 3
      ) {
        nodes {
          id
          altText
          title
          description
          localFile {
            childImageSharp {
              gatsbyImageData(
                height: 280
                width: 377
                placeholder: TRACED_SVG
                quality: 100
                formats: PNG
              )
            }
          }
        }
      }
      wpPage(title: { eq: "Проекты" }) {
        title
        content
      }
    }
  `);

  let options = {
    replace: (domNode) => {
      if (domNode.attribs && domNode.attribs.class === "images-wrapper") {
        return <></>;
      }
    },
  };

  const handleHoverOn = (index) => {
    setHoveredItemId(index);
  };
  const handleHoverOff = () => {
    setHoveredItemId(null);
  };

  return (
    <Container>
      <ContentWrapper>
        <Header>
          <Title>{title}</Title>
          <PrimaryButton text="Все проекты" pathTo={"/projects/"} />
        </Header>
        <Info>{parse(content, options)}</Info>
        <List>
          {nodes.map((item) => {
            let hovered = hoveredItemId === item.id ? true : false;
            return (
              <ProjectsBox
                handleHoverOn={handleHoverOn}
                handleHoverOff={handleHoverOff}
                itemData={item}
                location={location}
                hovered={hovered}
              />
            );
          })}
        </List>
      </ContentWrapper>
    </Container>
  );
};

export default ProjectsMain;
