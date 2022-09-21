import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import parse, { domToReact } from "html-react-parser";
import * as React from "react";
import styled from "styled-components";
import { Breadcrumb } from "../common/breadCrumb/Breadcrumb";
import {
  Mobile,
  NotMobile,
} from "../common/media-query-components/media-query-components";
import PrimaryButton from "../components/buttons/PrimaryButton";
import FeedbackForm from "../components/feedback-form/FeedbackForm";
import Layout from "../components/layout/Layout";

const menuItems = [
  {
    title: "Описание",
    value: 0,
  },
  {
    title: "Характеристики",
    value: 1,
  },
  {
    title: "Документы",
    value: 2,
  },
];

const CustomizedPrimaryButton = ({ text, checked, handleChangeIndex }) => {
  return (
    <PrimaryButton
      callback={handleChangeIndex}
      text={text}
      width={234}
      height={60}
      color={checked ? "#fff" : "#0E6683"}
      backgroundColor={checked ? "#0E6683" : "#fff"}
      border={checked ? "1px solid #0E6683" : "1px solid #fff"}
    />
  );
};

const MenuBar = ({ checkedIndex, handleChangeIndex }) => {
  const changeIndex = (index) => {
    handleChangeIndex(index);
  };
  return (
    <Menubar>
      <MenubarInnerContainer>
        {menuItems.map(({ title }, index) => (
          <div key={index} role={"button"} tabIndex={-1}>
            <CustomizedPrimaryButton
              text={title}
              checked={checkedIndex === index}
              handleChangeIndex={() => changeIndex(index)}
            />
          </div>
        ))}
      </MenubarInnerContainer>
    </Menubar>
  );
};

const DescriptionContent = ({ content, options }) => {
  const [checkedIndex, setCheckedIndex] = React.useState(0);
  return (
    <>
      <MenuBar
        checkedIndex={checkedIndex}
        handleChangeIndex={setCheckedIndex}
      />
      <MenubarInnerContainer>
        <DescriptionContainer>
          <DescriptionTitle>{menuItems[checkedIndex].title}</DescriptionTitle>
          {parse(content, options)}
        </DescriptionContainer>
      </MenubarInnerContainer>
    </>
  );
};

const CatalogItemTemplate = ({
  data: {
    wpPage: { content },
    allWpMediaItem: { nodes },
  },
  location,
  pageContext,
}) => {
  const { localFile, altText, description } = nodes[0];
  let descriptionText = description.replace(/<p>|<\/p>|<br \/>/g, "");

  const options = {
    replace: (domNode) => {
      if (domNode.attribs && domNode.attribs.class === "description-list") {
        return (
          <DescriptionList>
            {domToReact(domNode.children, options)}
          </DescriptionList>
        );
      }
      if (domNode.attribs && domNode.attribs.class === "table") {
        return (
          <Table>
            <thead>
              <Tr>
                <Th>Технические характеристики</Th>
                <Th>Показатели</Th>
              </Tr>
            </thead>
            <tbody>
              <tr></tr>
            </tbody>

            {domToReact(domNode.children, options)}
          </Table>
        );
      }
      if (domNode.attribs && domNode.attribs.class === "table-row") {
        return <TableRow>{domToReact(domNode.children, options)}</TableRow>;
      }
      if (
        domNode.attribs &&
        (domNode.attribs.class === "table-row-key" ||
          domNode.attribs.class === "table-row-value")
      ) {
        return (
          <TableKeyOrValue>
            {domToReact(domNode.children, options)}
          </TableKeyOrValue>
        );
      }
      if (domNode.attribs && domNode.attribs.class === "description") {
        return (
          <Description>{domToReact(domNode.children, options)}</Description>
        );
      }
      if (domNode.name === "li") {
        return <Li>{domToReact(domNode.children)}</Li>;
      }
      if (domNode.attribs && domNode.attribs.class === "image-wrapper") {
        return <></>;
      }
    },
  };

  const {
    breadcrumb: { crumbs },
  } = pageContext;

  const image = getImage(localFile.childImageSharp.gatsbyImageData);

  return (
    <Layout location={location}>
      <InnerContainer>
        <ContentWrapper>
          <NotMobile>
            <ContainerWithShortDescriptionAndImage>
              <LeftBlock>
                <Navigation>
                  <Breadcrumb crumbs={crumbs} color={"#4a5763"} />
                </Navigation>
                <Title>{altText}</Title>
                <ShortDescription>{descriptionText}</ShortDescription>
                <PrimaryButton
                  text={"Сделать заказ"}
                  width={157}
                  height={56}
                  pathTo={"/send-form"}
                  state={{ modal: true }}
                />
              </LeftBlock>
              <GatsbyImageWrapper>
                <GatsbyImage alt={altText} image={image} />
              </GatsbyImageWrapper>
            </ContainerWithShortDescriptionAndImage>
          </NotMobile>
          <Mobile>
            <MobileContainer>
              <Navigation>
                <Breadcrumb crumbs={crumbs} color={"#4a5763"} />
              </Navigation>
              <Title>{altText}</Title>
              <GatsbyImageWrapper>
                <GatsbyImage alt={altText} image={image} />
              </GatsbyImageWrapper>
              <ShortDescription>{descriptionText}</ShortDescription>
              <ButtonWrapper>
                <PrimaryButton
                  isMobile
                  text={"Сделать заказ"}
                  height={48}
                  pathTo={"/send-form"}
                  state={{ modal: true }}
                />
              </ButtonWrapper>
            </MobileContainer>
          </Mobile>
        </ContentWrapper>
      </InnerContainer>
      <NotMobile>
        <DescriptionContent content={content} options={options} />
      </NotMobile>
      <FeedbackForm />
    </Layout>
  );
};

export default CatalogItemTemplate;

export const pageQuery = graphql`
  query CatalogItemTemplateQuery($id: String!, $parentId: ID!, $slug: String!) {
    wpPage(id: { eq: $id }) {
      content
    }
    allWpMediaItem(
      filter: { parentId: { eq: $parentId }, slug: { regex: $slug } }
    ) {
      nodes {
        title
        altText
        description
        localFile {
          childImageSharp {
            gatsbyImageData(placeholder: TRACED_SVG, height: 300)
          }
        }
      }
    }
  }
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #fff;
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-width: 1170px;
  @media (max-width: 1223px) {
    max-width: 900px;
  }
  @media (max-width: 991px) {
    max-width: 700px;
  }
`;
const GatsbyImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 335px;
  height: 100%;
  padding: 20px;
  padding-left: 0;
  @media (max-width: 767px) {
    border: 1px solid #dbdbe1;
    padding-left: 20px;
  }
`;
const ContainerWithShortDescriptionAndImage = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 50px 0 70px 0;
`;
const MobileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 50px 20px;
`;
const LeftBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 720px;
  @media (max-width: 1223px) {
    min-width: fit-content;
  }
`;
const Title = styled.h1`
  margin: 0;
  margin-bottom: 40px;
  @media (max-width: 1223px) {
    max-width: 530px;
  }
  @media (max-width: 991px) {
    font-size: 32px;
    max-width: 400px;
  }
  @media (max-width: 767px) {
    font-size: 32px;
    max-width: max-content;
  }
`;
const Navigation = styled.div`
  padding: 0 0 20px;
`;
const ShortDescription = styled.div`
  width: 100%;
  color: #4a5763;
  margin-bottom: 50px;
  font-feature-settings: "pnum" on, "lnum" on;
  @media (max-width: 1223px) {
    max-width: 575px;
  }
  @media (max-width: 991px) {
    max-width: 400px;
  }
  @media (max-width: 767px) {
    max-width: max-content;
    margin-top: 20px;
    margin-bottom: 30px;
  }
`;
const ButtonWrapper = styled.div`
  width: 100%;
`;
const Menubar = styled.div`
  background-color: #f3f7f9;
  height: 100px;
  width: 100%;
`;
const MenubarInnerContainer = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1170px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  @media (max-width: 1223px) {
    max-width: 900px;
  }
  @media (max-width: 991px) {
    max-width: 700px;
  }
`;
const DescriptionTitle = styled.h2`
  margin: 0;
  margin-bottom: 30px;
  margin-top: 50px;
`;
const DescriptionContainer = styled.div`
  height: 100%;
  width: 100%;
  max-width: 873px;
`;
const Description = styled.div`
  color: #4a5763;
  margin-bottom: 34px;
`;
const DescriptionList = styled.ul`
  list-style-position: inside;
  margin: 0;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const Li = styled.li`
  &::marker {
    font-size: 0.6em;
  }
  padding-left: 10px;
`;
const Table = styled.table`
  width: 100%;
  max-width: 868px;
  border: 0;
  border-collapse: collapse;
  margin-bottom: 80px;
`;
const TableRow = styled.tr`
  height: 50px;
  font-size: 14px;
  line-height: 20px;
  color: #4a5763;
  font-feature-settings: "pnum" on, "lnum" on;
`;
const TableKeyOrValue = styled.td`
  padding-left: 20px;
  border: 1px solid #dbdbe1;
`;
const Tr = styled.tr`
  height: 50px;
  font-size: 14px;
  line-height: 20px;
  color: #0e6683;
  background-color: #f3f7f9;
`;
const Th = styled.th`
  border: 1px solid #dbdbe1;
`;
