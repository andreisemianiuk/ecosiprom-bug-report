import { Link } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import { getImage } from "gatsby-plugin-image";
import { convertToBgImage } from "gbimage-bridge";
import parse, { domToReact } from "html-react-parser";
import * as React from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import SecondaryButton from "../buttons/SecondaryButton";

const ServiceBox = ({ service }) => {
  const [hovered, setHovered] = React.useState(false);
  const { altText, description, slug, localFile } = service;
  let image = getImage(localFile.childImageSharp.gatsbyImageData);
  let bgImage = convertToBgImage(image);

  let options = {
    replace: (domNode) => {
      if (domNode.name === "li") {
        return <SubItem>{domToReact(domNode.children, options)}</SubItem>;
      }
    },
  };

  const serviceUrl = `/services/${slug.replace("services-", "")}`;

  const handleHoverOn = () => {
    if (!isTabletOrMobile) {
      setHovered(true);
    }
  };
  const handleHoverOff = () => {
    if (!isTabletOrMobile) {
      setHovered(false);
    }
  };

  const isTabletOrMobile = useMediaQuery({ maxWidth: 991 });
  const handleTabletOrMobileClick = () => {
    setHovered(!hovered);
  };

  return (
    <Item
      onClick={handleTabletOrMobileClick}
      onMouseOver={handleHoverOn}
      onMouseLeave={handleHoverOff}
      hovered={hovered}>
      <BackgroundImageContainer
        Tag="div"
        // Spread bgImage into BackgroundImage:
        {...bgImage}
        preserveStackingContext>
        <Content>
          <InfoBox>
            <ItemTitle hovered={hovered}>{altText}</ItemTitle>
            <ItemList hovered={hovered}>
              {parse(description, options)}
              <StyledButton>
                <Link to={serviceUrl}>
                  <SecondaryButton title="Подробнее" hovered={true} />
                </Link>
              </StyledButton>
            </ItemList>
          </InfoBox>
        </Content>
      </BackgroundImageContainer>
    </Item>
  );
};

export default ServiceBox;

const Item = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ hovered }) =>
    hovered
      ? // ? "linear-gradient(180deg, rgba(34, 44, 56, 0.4) 0%, rgba(33, 44, 56, 0.8) 100%)"
        "rgba(34, 44, 56, 0.4)"
      : "rgba(0, 0, 0, 0.1)"};
  border-radius: 2px;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
`;
const BackgroundImageContainer = styled(BackgroundImage)`
  width: 100%;
  height: 100%;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  padding: 20px;
`;
const InfoBox = styled.div`
  min-height: 108px;
  padding-top: 20px;
  padding-left: 20px;
  background-color: #fff;
  border-radius: 2px;
  overflow: hidden;
  width: 100%;
  @media (max-width: 767px) {
    padding-right: 10px;
  }
`;
const ItemTitle = styled.h3`
  font-weight: 700;
  color: ${({ hovered }) => (hovered ? "#0e6683" : "initial")};
  margin-top: 0;
  transition: color 0.3s ease-in-out;
  &::first-letter {
    text-transform: capitalize;
  }
  @media (max-width: 767px) {
    margin-bottom: 10px;
  }
`;
const ItemList = styled.ul`
  max-height: ${({ hovered }) => (hovered ? "350px" : "0")};
  overflow: ${({ hovered }) => (hovered ? "visible" : "hidden")};
  opacity: ${({ hovered }) => (hovered ? 1 : 0)};
  margin: 0;
  padding-bottom: 20px;
  transition: all 0.7s ease-in-out;

  font-size: 15px;
  line-height: 22px;
  font-weight: 400;
  color: #4a5763;
`;
const SubItem = styled.li`
  margin-left: 40px;
  &::marker {
    font-size: 0.6em;
  }
  @media (max-width: 767px) {
    font-size: 14px;
    margin-bottom: 5px;
    margin-left: 10px;
    &::marker {
      font-size: 1em;
      content: "- ";
    }
  }
`;
const StyledButton = styled.div`
  @media (max-width: 767px) {
    margin-top: 10px;
  }
`;
