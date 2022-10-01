import { graphql, useStaticQuery } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import { getImage } from "gatsby-plugin-image";
import { convertToBgImage } from "gbimage-bridge";
import parse, { domToReact } from "html-react-parser";
import React from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import {
  Mobile,
  NotMobile,
} from "../../common/media-query-components/media-query-components";
import ShortRight from "../../images/short_right.png";
import PrimaryButton from "../buttons/PrimaryButton";

const ImplementationCycle = () => {
  const {
    allWpMediaItem: { nodes },
  } = useStaticQuery(graphql`
    query CycleQuery {
      allWpMediaItem(filter: { title: { regex: "/cycle/" } }) {
        nodes {
          id
          altText
          caption
          description
          localFile {
            childImageSharp {
              gatsbyImageData(formats: WEBP, placeholder: BLURRED)
            }
          }
        }
      }
    }
  `);

  const sortedNodes = nodes.sort(
    (a, b) => a.caption.match(/\d/) - b.caption.match(/\d/)
  );
  const [hoveredId, setHoveredId] = React.useState(0);
  const currentItem = sortedNodes.find((_, id) => id === hoveredId) || nodes[0];

  const currentCountValue = currentItem.caption.replace(/\D/g, "");
  const currentInfoLabel = currentItem.altText;
  const currentInfoDescription = currentItem.description;

  const image = getImage(currentItem.localFile.childImageSharp.gatsbyImageData);
  const bgImage = convertToBgImage(image);

  const handleHoverOn = (index) => {
    setHoveredId(index);
  };

  const switchItem = () => {
    if (hoveredId < 5) {
      setHoveredId(hoveredId + 1);
    } else {
      setHoveredId(0);
    }
  };

  const options = {
    replace: (domNode) => {
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

  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <Container onClick={switchItem}>
      <FixedInfoWrapper>
        <FixedInfo>
          <LeftBlock>
            <Title>Полный цикл реализации проектов “под ключ”</Title>
            <div>
              <CurrentInfoLabel>{currentInfoLabel}</CurrentInfoLabel>
              <CurrentInfoContent>
                {parse(currentInfoDescription, options)}
              </CurrentInfoContent>
            </div>
            <ButtonWrapper>
              <PrimaryButton
                isMobile={isMobile}
                text="Оставить заявку"
                pathTo={"/send-form"}
                state={{ modal: true }}
              />
            </ButtonWrapper>
            <Mobile>
              <Counter>
                <EditableCounterValue>
                  0{parse(currentCountValue)}
                </EditableCounterValue>{" "}
                / 06
              </Counter>
            </Mobile>
          </LeftBlock>
          <NotMobile>
            <MenuWrapper>
              <Menu>
                {nodes.map((node, id) => {
                  const isHovered = hoveredId === id ? true : false;
                  return (
                    <MenuItemWrapper
                      key={node.id}
                      onMouseOver={() => handleHoverOn(id)}
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
          </NotMobile>
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
  height: 100%;
  z-index: 1;
`;
const FixedInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1170px;
  @media (max-width: 1223px) {
    max-width: 900px;
  }
  @media (max-width: 991px) {
    max-width: 730px;
  }
  @media (max-width: 767px) {
    width: 100%;
    max-width: max-content;
    padding: 0 20px;
  }
`;
const LeftBlock = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 20px;
  color: #fff;
  @media (max-width: 767px) {
    justify-content: space-between;
  }
`;
const Title = styled.h2`
  max-width: 540px;
  margin: 0;
  padding: 150px 0 30px;
  @media (max-width: 991px) {
    font-size: 28px;
    line-height: 36px;
    max-width: 380px;
    padding-bottom: 20px;
  }
  @media (max-width: 767px) {
    padding-top: 120px;
  }
  @media (max-width: 425px) {
    padding-top: 70px;
  }
  @media (max-width: 380px) {
    padding-top: 50px;
  }
`;
const CurrentInfoLabel = styled.div`
  font-size: 20px;
  line-height: 28px;
  font-weight: 800;
  margin-bottom: 30px;
  @media (max-width: 991px) {
    max-width: 380px;
  }
  @media (max-width: 767px) {
    margin-bottom: 20px;
    max-width: 400px;
  }
`;
const CurrentInfoContent = styled.ul`
  font-size: 15px;
  line-height: 32px;
  font-weight: 400;
  @media (max-width: 991px) {
    max-width: 380px;
  }
  @media (max-width: 767px) {
    margin-top: 0;
    margin-bottom: 30px;
    max-width: 400px;
  }
`;
const ButtonWrapper = styled.div`
  width: 100%;
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
  @media (max-width: 450px) {
    padding-top: 30px;
  }
  @media (max-width: 380px) {
    padding-top: 20px;
  }
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
