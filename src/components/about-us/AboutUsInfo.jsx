import { GatsbyImage, getImage } from "gatsby-plugin-image";
import parse, { domToReact } from "html-react-parser";
import * as React from "react";
import styled from "styled-components";
import ArrowIcon2 from "../../assets/short_right_2.svg";

const AboutUsInfo = ({ content, images }) => {
  let options = {
    replace: (domNode) => {
      if (domNode.attribs && domNode.attribs.class === "description-list") {
        return (
          <DescriptionList>
            {domToReact(domNode.children, options)}
          </DescriptionList>
        );
      }
      if (
        domNode.attribs &&
        domNode.attribs.class === "description-list-item"
      ) {
        return (
          <DescriptionListItem>
            <div>
              <StyledArrowIcon />
            </div>
            {domToReact(domNode.children, options)}
          </DescriptionListItem>
        );
      }
      if (
        domNode.attribs &&
        (domNode.attribs.class === "images-wrapper" ||
          domNode.attribs.class === "heading")
      ) {
        return <></>;
      }
    },
  };

  return (
    <Container>
      {parse(content || "", options)}
      <ImagesWrapper>
        {images.map(({ id, title, localFile }) => {
          let image = getImage(localFile.childImageSharp.gatsbyImageData);
          return (
            <Image key={id}>
              <GatsbyImage id={id} image={image} alt={title} />
            </Image>
          );
        })}
      </ImagesWrapper>
    </Container>
  );
};

export default AboutUsInfo;

const Container = styled.div`
  width: 100%;
  max-width: 1170px;
  margin: 80px auto 0;
  @media (max-width: 1223px) {
    max-width: 900px;
  }
  @media (max-width: 991px) {
    max-width: 700px;
  }
  @media (max-width: 767px) {
    margin: 50px auto 0;
    padding: 0 20px;
  }
`;
const DescriptionList = styled.ul`
  font-size: 15px;
  line-height: 22px;
  margin: 25px 0 80px 0;
  @media (max-width: 767px) {
    margin: 25px 0 30px 0;
  }
`;
const DescriptionListItem = styled.li`
  display: flex;
  align-items: center;
  list-style-type: none;
`;
const StyledArrowIcon = styled(ArrowIcon2)`
  margin-right: 16px;
`;
const ImagesWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media (max-width: 991px) {
    display: grid;
    grid-template-columns: repeat(3, auto);
    grid-template-rows: repeat(2, auto);
    grid-row-gap: 20px;
    grid-column-gap: 40px;
    justify-content: center;
  }
  @media (max-width: 767px) {
    grid-column-gap: 20px;
    grid-template-columns: repeat(2, auto);
    grid-template-rows: repeat(3, auto);
  }
`;
const Image = styled.div`
  border: 1px solid #dbdbe1;
`;
