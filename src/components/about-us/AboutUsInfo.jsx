import { GatsbyImage, getImage } from "gatsby-plugin-image";
import parse, { domToReact } from "html-react-parser";
import * as React from "react";
import styled from "styled-components";
import ArrowIcon2 from "../../assets/short_right_2.svg";

const Container = styled.div`
  width: 100%;
  max-width: 1170px;
  margin: 80px auto 0;
`;
const DescriptionList = styled.ul`
  font-size: 15px;
  line-height: 22px;
  margin: 25px 0 80px 0;
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
`;
const Image = styled.div`
  border: 1px solid #dbdbe1;
`;

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
            <StyledArrowIcon />
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
            <Image>
              <GatsbyImage id={id} image={image} alt={title} />
            </Image>
          );
        })}
      </ImagesWrapper>
    </Container>
  );
};

export default AboutUsInfo;
