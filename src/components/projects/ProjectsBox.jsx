import * as React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import parse, { domToReact } from "html-react-parser";
import SecondaryButton from "../buttons/SecondaryButton";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { memo } from "react";

const ProjectsBox = ({ itemData }) => {
  const [hovered, setHovered] = React.useState(false);
  const { title, altText, description, localFile } = itemData;
  let image = getImage(localFile.childImageSharp.gatsbyImageData);

  let options = {
    replace: (domNode) => {
      if (domNode.name === "p") {
        return <References>{domToReact(domNode.children, options)}</References>;
      }
    },
  };

  const handleHoverOn = () => {
    setHovered(true);
  };
  const handleHoverOff = () => {
    setHovered(false);
  };

  const pathToProject = `/projects/${title?.replace(/projects-/g, "")}` || "/";

  return (
    <Container
      onMouseOver={handleHoverOn}
      onMouseLeave={handleHoverOff}
      hovered={hovered}>
      <ImageWrapper>
        <GatsbyImage image={image} alt={altText} />
        <ImageBackgroundLayer hovered={hovered} />
      </ImageWrapper>
      <InfoBox>
        <Title hovered={hovered}>{altText}</Title>
        {parse(description || "", options)}
        <Link to={pathToProject}>
          <SecondaryButton title="Подробнее" hovered={hovered} />
        </Link>
      </InfoBox>
    </Container>
  );
};

export default memo(ProjectsBox);

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 377px;
  height: 490px;

  box-shadow: ${({ hovered }) =>
    hovered ? "0px 15px 30px rgba(0, 0, 0, 0.1)" : null};
  transition: box-shadow 0.3s ease-in-out;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 30px;
  border: 1px solid #dbdbe1;
  border-top: none;
`;
const Title = styled.h3`
  font-weight: 700;
  color: ${({ hovered }) => (hovered ? "#0e6683" : "initial")};
  margin-top: 0;
  transition: color 0.3s ease-in-out;
  &::first-letter {
    text-transform: capitalize;
  }
`;
const References = styled.div`
  max-height: 66px;
  font-size: 15px;
  color: #4a5763;
  line-height: 22px;
  margin-bottom: 10px;
  padding-right: 10px;
  @media (max-width: 991px) {
    max-height: max-content;
    padding-right: 0;
  }
`;
const ImageWrapper = styled.div`
  width: 100%;
  height: 280px;
  display: flex;
  justify-content: center;
  position: relative;
`;
const ImageBackgroundLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all 0.3s ease-in-out;
  background: ${({ hovered }) =>
    hovered ? "rgba(0, 0, 0, 0)" : "rgba(0, 0, 0, 0.2)"};
`;
