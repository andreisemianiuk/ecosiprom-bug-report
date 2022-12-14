import * as React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import SecondaryButton from "../buttons/SecondaryButton";
import { GatsbyImage } from "gatsby-plugin-image";
import { useAppContext } from "../../api/contextApi";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 278px;
  height: 400px;
  background-color: #fff;
  border: 1px solid #dbdbe1;
  box-shadow: ${({ hovered }) =>
    hovered ? "0px 15px 30px rgba(0, 0, 0, 0.1)" : null};
  transition: box-shadow 0.3s ease-in-out;
  @media (max-width: 767px) {
    width: 100%;
    max-width: 335px;
  }
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
  /*white-space: nowrap;*/
  overflow: hidden;
  /*text-overflow: ellipsis;*/
`;
const Image = styled.div`
  width: 100%;
  height: 205px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
`;

const CatalogBox = ({ isMain, itemData, location: { pathname } }) => {
  const { dispatch } = useAppContext();
  const { id, title, altText, description, localFile } = itemData;
  const [hovered, setHovered] = React.useState(false);

  let descriptionText = description?.replace(/<p>|<\/p>|<br \/>/g, "") || "";

  const path = title?.toLowerCase().replace(/^\w*-/g, "") || "";

  const handleHoverOn = () => {
    setHovered(true);
  };
  const handleHoverOff = () => {
    setHovered(false);
  };
  const handleClick = () => {
    dispatch({ type: "CATALOG-MENU", payload: path });
  };

  return (
    <Container
      key={id}
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
        <References>{descriptionText}</References>
        <Link
          to={
            isMain
              ? "/catalog/"
              : `${
                  pathname[pathname.length - 1] === "/"
                    ? pathname.slice(0, -1)
                    : pathname
                }/${path}`
          }>
          <SecondaryButton
            title="??????????????????"
            hovered={hovered}
            callback={handleClick}
          />
        </Link>
      </InfoBox>
    </Container>
  );
};

export default React.memo(CatalogBox);
