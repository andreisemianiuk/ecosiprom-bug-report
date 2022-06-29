import * as React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import parse, { domToReact } from "html-react-parser";
import SecondaryButton from "../buttons/SecondaryButton";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const Container = styled(Link)`
  display: flex;
  flex-direction: column;

  width: 377px;
  height: 490px;

  box-shadow: ${({ hovered }) =>
    hovered ? "0px 15px 30px rgba(0, 0, 0, 0.1)" : null};
  cursor: pointer;
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
  background: rgba(0, 0, 0, 0.2);
  &:hover {
    background: rgba(0, 0, 0, 0);
  }
`;

const ProjectsBox = ({ handleHoverOn, handleHoverOff, hovered, itemData }) => {
  const { id, altText, description, localFile } = itemData;
  let image = getImage(localFile.childImageSharp.gatsbyImageData);

  let options = {
    replace: domNode => {
      if (domNode.name === "p") {
        return <References>{domToReact(domNode.children, options)}</References>;
      }
    },
  };

  return (
    <Container
      key={id}
      onMouseOver={() => handleHoverOn(id)}
      onMouseLeave={handleHoverOff}
      hovered={hovered}>
      <ImageWrapper>
        <GatsbyImage image={image} alt={altText} />
        <ImageBackgroundLayer />
      </ImageWrapper>
      <InfoBox>
        <Title hovered={hovered}>{altText}</Title>
        {parse(description || "", options)}
        <SecondaryButton title="Подробнее" hovered={hovered} />
      </InfoBox>
    </Container>
  );
};

export default ProjectsBox;
