import styled from "styled-components";

const ImageContainer = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
`;
const ImageLayout = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 300px;
  background: #03141a;
  opacity: 0.5;
`;
const InnerContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1170px;
  padding-top: 100px;
`;
const BackgroundImageLabel = styled.h1`
  color: #fff;
  padding-top: 20px;
  margin: 0;
`;
const Info = styled.div`
  width: 100%;
  max-width: 1170px;
  margin: 80px auto 0;
  color: #4a5763;
  line-height: 24px;
  font-feature-settings: "pnum" on, "lnum" on;
`;
const InfoParagraph = styled.p`
  &:last-child {
    margin-bottom: 0;
  }
`;
const SliderContentWrapper = styled.div`
  width: 100%;
  max-width: 1210px;
  margin: 0 auto;
  padding: ${({ padding }) => (padding ? padding : "80px 0")};
`;
const SliderImageWrapper = styled.div`
  /*margin: 0 10px;*/
`;
const ArrowContainer = styled.div`
  position: relative;
  left: ${(v) => v.left}px;
  right: ${(v) => v.right}px;
  cursor: pointer;
  transition: filter 0.4s ease-in-out;
  &:hover {
    filter: brightness(0) saturate(100%) invert(30%) sepia(61%) saturate(748%)
      hue-rotate(151deg) brightness(93%) contrast(92%);
  }
`;

export {
  ImageContainer,
  ImageLayout,
  InnerContainer,
  ContentWrapper,
  BackgroundImageLabel,
  Info,
  InfoParagraph,
  SliderContentWrapper,
  SliderImageWrapper,
  ArrowContainer,
};
