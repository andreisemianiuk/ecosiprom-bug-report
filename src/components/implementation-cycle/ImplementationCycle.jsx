import { graphql, useStaticQuery } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import { getImage } from "gatsby-plugin-image";
import { convertToBgImage } from "gbimage-bridge";
import React from "react";
import styled from "styled-components";
import parse, { domToReact } from "html-react-parser";
import ShortRight from "../../images/short_right.png";
import PrimaryButton from "../buttons/PrimaryButton";

const Container = styled.div`
  position: relative;
`;
const FixedInfoWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  z-index: 1;
`;
const FixedInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1170px;
`;
const LeftBlock = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 20px;

  color: #fff;
`;
const Title = styled.h2`
  max-width: 540px;

  margin: 0;
  padding: 150px 0 30px;
`;
const CurrentInfoLabel = styled.div`
  font-size: 20px;
  line-height: 28px;
  font-weight: 800;
  margin-bottom: 30px;
`;
const CurrentInfoContent = styled.ul`
  font-size: 15px;
  line-height: 32px;
  font-weight: 400;
`;
const ShortRightIcon = styled.img`
  margin-right: 16px;
`;
const InfoDescriptionItem = styled.li`
  display: flex;
  align-items: center;
  line-height: 22px;
  list-style-type: none;
`;
const MenuWrapper = styled.div`
  height: 650px;
  border-right: 1px solid rgba(255, 255, 255, 0.4);
  padding-top: 187px;
  color: #fff;
`;
const Menu = styled.div`
  width: 100%;
  padding-right: 20px;
  transition: all 0.3s ease-in-out;
`;
const MenuItemWrapper = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  width: 100%;
  height: 36px;
  position: relative;
  line-height: 20px;
  font-size: ${({ hovered }) => (hovered ? "16px" : "14px")};
  font-weight: ${({ hovered }) => (hovered ? "700" : "500")};
  margin-bottom: 12px;
  cursor: pointer;
`;
const MenuItem = styled.span`
  transition: all 0.3s ease-in-out;
`;
const ItemMarker = styled.span`
  position: absolute;
  top: ${({ hovered }) => (hovered ? "17.2px" : "50%")};
  right: ${({ hovered }) => (hovered ? "-24.2px" : "-22px")};
  width: ${({ hovered }) => (hovered ? "7px" : "3px")};
  height: ${({ hovered }) => (hovered ? "7px" : "3px")};
  background-color: #fff;
  border-radius: 50%;

  z-index: 1;
`;
const ItemMarkerHovered = styled.span`
  position: absolute;
  top: 10.2px;
  right: -31.1px;
  width: 21px;
  height: 21px;
  background-color: #2787a7;
  border-radius: 50%;
`;
const Counter = styled.div`
  text-align: right;
  padding-top: 50px;
  padding-right: 20px;
  color: #dbdbe1;
  font-feature-settings: "pnum" on, "lnum" on;
`;
const EditableCounterValue = styled.span`
  font-size: 1.5em;
  color: #fff;
  font-weight: 600;
`;
const BackgroundImageContainer = styled(BackgroundImage)`
  width: 100%;
  height: 650px;
`;
const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1170px;
  color: #fff;
`;

const ImplementationCycle = () => {
  const {
    allWpMediaItem: { nodes },
  } = useStaticQuery(graphql`
    query CycleQuery {
      allWpMediaItem(
        filter: { title: { regex: "/cycle/" } }
        sort: { fields: caption }
      ) {
        nodes {
          id
          altText
          caption
          description
          localFile {
            childImageSharp {
              gatsbyImageData(quality: 100, placeholder: BLURRED)
            }
          }
        }
      }
    }
  `);

  const [hoveredId, setHoveredId] = React.useState(nodes[0].id);

  let currentItem = nodes.find(node => node.id === hoveredId) || nodes[0];
  let currentCountValue = currentItem.caption.replace(/\D/g, "");
  let currentInfoLabel = currentItem.altText;
  let currentInfoDescription = currentItem.description;

  let image = getImage(currentItem.localFile.childImageSharp.gatsbyImageData);
  let bgImage = convertToBgImage(image);

  const handleHoverOn = index => {
    setHoveredId(index);
  };

  const options = {
    replace: domNode => {
      if (domNode.name === "li") {
        return (
          <InfoDescriptionItem>
            <ShortRightIcon src={ShortRight} alt="short right" />
            {domToReact(domNode.children, options)}
          </InfoDescriptionItem>
        );
      }
    },
  };

  return (
    <Container>
      <FixedInfoWrapper>
        <FixedInfo>
          <LeftBlock>
            <Title>Полный цикл реализации проектов “под ключ”</Title>
            <CurrentInfoLabel>{currentInfoLabel}</CurrentInfoLabel>
            <CurrentInfoContent>
              {parse(currentInfoDescription, options)}
            </CurrentInfoContent>
            <PrimaryButton text="Оставить заявку" />
          </LeftBlock>
          <MenuWrapper>
            <Menu>
              {nodes.map(node => {
                const isHovered = hoveredId === node.id ? true : false;
                return (
                  <MenuItemWrapper
                    key={node.id}
                    onMouseOver={() => handleHoverOn(node.id)}
                    hovered={isHovered}>
                    <MenuItem>{node.altText}</MenuItem>
                    <ItemMarker hovered={isHovered} />
                    {isHovered && <ItemMarkerHovered />}
                  </MenuItemWrapper>
                );
              })}
            </Menu>
            <Counter>
              <EditableCounterValue>
                0{parse(currentCountValue)}
              </EditableCounterValue>{" "}
              / 06
            </Counter>
          </MenuWrapper>
        </FixedInfo>
      </FixedInfoWrapper>
      <BackgroundImageContainer
        Tag="div"
        // Spread bgImage into BackgroundImage:
        {...bgImage}
        key={currentItem.title}
        preserveStackingContext>
        <InnerContainer>
          <ContentWrapper />
        </InnerContainer>
      </BackgroundImageContainer>
    </Container>
  );
};

export default ImplementationCycle;
