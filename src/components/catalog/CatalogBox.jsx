import * as React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import parse, { domToReact } from "html-react-parser";
import SecondaryButton from "../buttons/SecondaryButton";
import { GatsbyImage } from "gatsby-plugin-image";

const Container = styled(Link)`
  display: flex;
  flex-direction: column;

  width: 278px;
  height: 400px;
  text-decoration: none;
  background-color: #fff;
  border: 1px solid #dbdbe1;
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
  max-height: 195px;
  padding: 20px;
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
const Image = styled.div`
  width: 100%;
  height: 205px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
`;

const CatalogBox = ({ itemData, location: { pathname } }) => {
  const { id, title, altText, description, localFile } = itemData;
  const [hovered, setHovered] = React.useState(false);
  let options = {
    replace: (domNode) => {
      if (domNode.name === "p") {
        return <References>{domToReact(domNode.children, options)}</References>;
      }
      if (domNode.name === "br") {
        return <></>;
      }
    },
  };
  const handleHoverOn = () => {
    setHovered(true);
  };
  const handleHoverOff = () => {
    setHovered(false);
  };

  const path = title?.toLowerCase().replace(/^\w*-/g, "") || "";

  return (
    <Container
      key={id}
      to={`${
        pathname[pathname.length - 1] === "/" ? pathname.slice(0, -1) : pathname
      }/${path}`}
      onMouseOver={handleHoverOn}
      onMouseLeave={handleHoverOff}
      hovered={hovered}>
      <Image>
        <GatsbyImage
          image={localFile.childImageSharp.gatsbyImageData}
          alt={altText}
        />
      </Image>
      <InfoBox>
        <Title hovered={hovered}>{altText}</Title>
        {parse(description || "", options)}
        <SecondaryButton title="Подробнее" hovered={hovered} />
      </InfoBox>
    </Container>
  );
};

export default CatalogBox;
