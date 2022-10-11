import { graphql, useStaticQuery } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import { getImage } from "gatsby-plugin-image";
import { convertToBgImage } from "gbimage-bridge";
import parse, { domToReact } from "html-react-parser";
import * as React from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import MapSmallPointImage from "../../assets/ellipse.svg";
import ArrowIcon from "../../assets/short_right.svg";
import { DesktopOrLaptop } from "../../common/media-query-components/media-query-components";
import MapImage from "../../images/about-map.png";
import PrimaryButton from "../buttons/PrimaryButton";

const AboutUsCommon = ({ children, isMain }) => {
  // isMain is a boolean that determines whether the component is rendered on the main page or on the about us page
  const {
    allWpMediaItem: { nodes },
    wpPage: { content },
  } = useStaticQuery(graphql`
    query AboutQuery {
      allWpMediaItem(filter: { title: { regex: "/about-main/" } }) {
        nodes {
          title
          altText
          description
          localFile {
            childImageSharp {
              gatsbyImageData(height: 650)
            }
          }
        }
      }
      wpPage(title: { eq: "О нас" }) {
        content
      }
    }
  `);

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const currentImage = isMobile ? nodes[0] : nodes[1];

  const mainImage = getImage(
    currentImage.localFile.childImageSharp.gatsbyImageData
  );
  const bgImage = convertToBgImage(mainImage);

  let options = {
    replace: (domNode) => {
      if (domNode.attribs && domNode.attribs.class === "heading") {
        return (
          <InfoTextHeading>
            {domToReact(domNode.children, options)}
          </InfoTextHeading>
        );
      }
      if (domNode.attribs && domNode.attribs.class === "text") {
        let text =
          domToReact(domNode.children).substring(0, isMain ? 214 : 190) + "...";
        return <InfoText>{text}</InfoText>;
      }
      if (domNode.attribs && domNode.attribs.class === "heading-list") {
        return <InfoList>{domToReact(domNode.children, options)}</InfoList>;
      }
      if (domNode.attribs && domNode.attribs.class === "heading-list-item") {
        return (
          <InfoListItem>
            <div>
              <StyledArrowIcon />
            </div>
            {domToReact(domNode.children, options)}
          </InfoListItem>
        );
      }
      if (
        domNode.attribs &&
        (domNode.attribs.class === "images-wrapper" ||
          domNode.attribs.class === "description")
      ) {
        return <></>;
      }
    },
  };

  return (
    <ContainerWithImage>
      <BackgroundImageContainer
        Tag="div"
        // Spread bgImage into BackgroundImage:
        {...bgImage}
        key={currentImage.title}
        preserveStackingContext>
        <DarkImageOverlay />
        <InnerContainer isMain={isMain}>
          <ContentWrapper>
            <InfoWrapper>
              {!isMain && <Navigation>{children}</Navigation>}
              <Title>О компании</Title>
              {parse(content || "", options)}
              {isMain && (
                <div style={{ width: "100%" }}>
                  <PrimaryButton
                    isMobile={isMobile}
                    text="Оставить заявку"
                    color={"#0E6683"}
                    backgroundColor={"#ffffff"}
                    hoverStyles={{
                      backgroundColor: "#CFE0E6",
                      color: "#0E6683",
                    }}
                    pathTo={"/send-form"}
                    state={{ modal: true }}
                  />
                </div>
              )}
            </InfoWrapper>
            <DesktopOrLaptop>
              <MapWrapper>
                <img src={MapImage} alt="контурная карта РБ" />
                <MapPoint size={21} top={209} left={256}>
                  <MapSmallPointWrapper>
                    <MapSmallPoint sizesmall={7} />
                  </MapSmallPointWrapper>
                </MapPoint>
                <MapPoint size={21} top={80} left={374}>
                  <MapSmallPointWrapper>
                    <MapSmallPoint sizesmall={7} />
                  </MapSmallPointWrapper>
                </MapPoint>
                <MapPoint size={21} top={218} left={439}>
                  <MapSmallPointWrapper>
                    <MapSmallPoint sizesmall={7} />
                  </MapSmallPointWrapper>
                </MapPoint>
                <MapPoint size={21} top={367} left={432}>
                  <MapSmallPointWrapper>
                    <MapSmallPoint sizesmall={7} />
                  </MapSmallPointWrapper>
                </MapPoint>
                <MapPoint size={21} top={378} left={37}>
                  <MapSmallPointWrapper>
                    <MapSmallPoint sizesmall={7} />
                  </MapSmallPointWrapper>
                </MapPoint>
                <MapPoint size={21} top={234} left={58}>
                  <MapSmallPointWrapper>
                    <MapSmallPoint sizesmall={7} />
                  </MapSmallPointWrapper>
                </MapPoint>
                <MapPoint size={17} top={200} left={134}>
                  <MapSmallPointWrapper>
                    <MapSmallPoint sizesmall={7} />
                  </MapSmallPointWrapper>
                </MapPoint>
                <MapPoint size={15} top={83} left={320}>
                  <MapSmallPointWrapper>
                    <MapSmallPoint sizesmall={5} />
                  </MapSmallPointWrapper>
                </MapPoint>
                <MapPoint size={15} top={276} left={353}>
                  <MapSmallPointWrapper>
                    <MapSmallPoint sizesmall={5} />
                  </MapSmallPointWrapper>
                </MapPoint>
                <MapPoint size={15} top={311} left={154}>
                  <MapSmallPointWrapper>
                    <MapSmallPoint sizesmall={5} />
                  </MapSmallPointWrapper>
                </MapPoint>
                <MapPoint size={15} top={316} left={249}>
                  <MapSmallPointWrapper>
                    <MapSmallPoint sizesmall={5} />
                  </MapSmallPointWrapper>
                </MapPoint>
                <MapPoint size={15} top={388} left={217}>
                  <MapSmallPointWrapper>
                    <MapSmallPoint sizesmall={5} />
                  </MapSmallPointWrapper>
                </MapPoint>
                <MapPoint size={15} top={276} left={353}>
                  <MapSmallPointWrapper>
                    <MapSmallPoint sizesmall={5} />
                  </MapSmallPointWrapper>
                </MapPoint>
                <MapPoint size={15} top={412} left={394}>
                  <MapSmallPointWrapper>
                    <MapSmallPoint sizesmall={5} />
                  </MapSmallPointWrapper>
                </MapPoint>
              </MapWrapper>
            </DesktopOrLaptop>
          </ContentWrapper>
        </InnerContainer>
      </BackgroundImageContainer>
    </ContainerWithImage>
  );
};

export default AboutUsCommon;

const BackgroundImageContainer = styled(BackgroundImage)`
  width: 100%;
  height: 100%;
`;

const ContainerWithImage = styled.div`
  width: 100%;
  height: 680px;
  position: relative;
  color: #ffffff;
  overflow: hidden;
  @media (max-width: 767px) {
    height: 638px;
  }
`;
const DarkImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #03141a;
  opacity: 0.8;
`;
const InnerContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: ${(props) => (props.isMain ? "87px 0" : "50px 0 80px")};
  @media (max-width: 424px) {
    padding: 50px 20px;
  }
`;
const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  max-width: 1170px;
  @media (max-width: 1223px) {
    max-width: 900px;
  }
  @media (max-width: 991px) {
    max-width: 700px;
  }
  @media (max-width: 767px) {
    max-width: 400px;
  }
  @media (max-width: 424px) {
    max-width: max-content;
  }
`;
const InfoWrapper = styled.div`
  max-width: 548px;
  margin: 0;
  margin-bottom: 40px;
  margin-right: 25px;
  @media (max-width: 1223px) {
    margin-right: 0;
  }
  @media (max-width: 424px) {
    max-width: max-content;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;
const Title = styled.h1`
  margin: 0;
  margin-bottom: 40px;
  @media (max-width: 1223px) {
    margin-bottom: 20px;
  }
`;
const InfoTextHeading = styled.div`
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 30px;
  @media (max-width: 424px) {
    font-size: 15px;
    line-height: 22px;
  }
`;
const InfoText = styled.p`
  font-size: 16px;
  line-height: 24px;
  margin: 0;
  margin-bottom: 40px;
  @media (max-width: 424px) {
    margin-bottom: 0;
  }
`;
const InfoList = styled.ul`
  font-size: 15px;
  line-height: 22px;
  margin: 0;
  margin-top: 20px;
  margin-bottom: 30px;
  @media (max-width: 424px) {
    /*margin-top: 0;*/
  }
`;
const InfoListItem = styled.li`
  display: flex;
  align-items: center;
  list-style-type: none;
  @media (max-width: 424px) {
    margin-bottom: 0;
  }
`;
const StyledArrowIcon = styled(ArrowIcon)`
  margin-right: 16px;
`;
const MapWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: 567px;
  height: 480px;
  @media (max-width: 1223px) {
    width: max-content;
  }
`;
const MapPoint = styled.span`
  position: absolute;
  top: ${({ top }) => `${top}px`};
  left: ${({ left }) => `${left}px`};
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  border-radius: 50%;
  background-color: #93c3d3;
`;
const MapSmallPointWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: transparent;
`;
const MapSmallPoint = styled(MapSmallPointImage)`
  width: ${({ sizesmall }) => `${sizesmall}px`};
  height: ${({ sizesmall }) => `${sizesmall}px`};
`;
const Navigation = styled.div`
  padding: 90px 0 20px;
`;
