import { graphql, useStaticQuery } from "gatsby";
import parse, { domToReact } from "html-react-parser";
import * as React from "react";
import styled from "styled-components";
import {
  Mobile,
  NotMobile,
} from "../../common/media-query-components/media-query-components";
import PrimaryButton from "../buttons/PrimaryButton";
import ProjectsBox from "./ProjectsBox";

const ProjectsMain = () => {
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
                formats: WEBP
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
      if (domNode.attribs && domNode.attribs.class === "info") {
        return <Info>{domToReact(domNode.children, options)}</Info>;
      }
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
          <NotMobile>
            <PrimaryButton text="Все проекты" pathTo={"/projects/"} />
          </NotMobile>
        </Header>
        {parse(content, options)}
        <List>
          {nodes.map((item) => {
            let hovered = hoveredItemId === item.id ? true : false;
            return (
              <ProjectsBox
                handleHoverOn={handleHoverOn}
                handleHoverOff={handleHoverOff}
                itemData={item}
                hovered={hovered}
              />
            );
          })}
        </List>
        <Mobile>
          <ButtonWrapper>
            <PrimaryButton text="Все проекты" pathTo={"/projects/"} isMobile />
          </ButtonWrapper>
        </Mobile>
      </ContentWrapper>
    </Container>
  );
};

export default ProjectsMain;

const Container = styled.section`
  display: flex;
  justify-content: center;

  background-color: #fff;
  padding: 80px 0 100px;
  @media (max-width: 767px) {
    padding: 50px 20px;
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
    max-width: 720px;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;
const ButtonWrapper = styled.div`
  width: 100%;
  margin-top: 30px;
`;
const Title = styled.h1`
  margin: 0;
`;
const Info = styled.div`
  color: #4a5763;
  line-height: 27px;
  margin-top: 24px;
  margin-bottom: 40px;
  @media (max-width: 767px) {
    font-size: 15px;
    line-height: 22px;
    margin-top: 20px;
    margin-bottom: 30px;
  }
`;
const List = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-column-gap: 20px;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 767px) {
    justify-content: center;
    grid-column-gap: 0;
    grid-row-gap: 20px;
    grid-template-columns: repeat(1, minmax(300px, 377px));
    grid-template-rows: repeat(3, max(490px));
  }
`;
