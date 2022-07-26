import * as React from "react";
import { graphql } from "gatsby";
import parse, { domToReact } from "html-react-parser";
import styled from "styled-components";
import { CatalogLayout } from "../components/CatalogLayout";
import Layout from "../components/Layout";
import Catalog from "../components/catalog/Catalog";
import { Breadcrumb } from "../common/breadCrumb/Breadcrumb";
import EquipmentLogos from "../components/logos/equipment-logos/EquipmentLogos";
import FeedbackForm from "../components/feedback-form/FeedbackForm";

const TextContainer = styled.div`
  width: 100%;
  max-width: 1170px;
  margin: 0 auto;
`;
const CommonText = styled.div`
  font-weight: 400;
  line-height: 24px;
  margin-bottom: 80px;
`;

const CatalogListTemplate = ({
  data: {
    wpPage: { content },
    allWpMediaItem: { nodes },
  },
  pageContext,
  location,
}) => {
  const {
    breadcrumb: { crumbs },
  } = pageContext;

  const options = {
    replace: (domNode) => {
      if (domNode.attribs && domNode.attribs.class === "images") {
        return <></>;
      }
      if (domNode.attribs && domNode.attribs.class === "common-text") {
        return <CommonText>{domToReact(domNode.children, options)}</CommonText>;
      }
    },
  };
  const title = crumbs[crumbs.length - 1].crumbLabel;

  return (
    <Layout>
      <Catalog isMain={false} images={nodes} title={title} location={location}>
        <Breadcrumb crumbs={crumbs} color={"#4a5763"} />
      </Catalog>
      <EquipmentLogos padding={"80px 0 60px"} />
      <TextContainer>{parse(content, options)}</TextContainer>
      <FeedbackForm />
    </Layout>
  );
};

export default CatalogListTemplate;

export const pageQuery = graphql`
  query CatalogListTemplateQuery($id: String!) {
    wpPage(title: { eq: "Каталог" }) {
      content
    }
    allWpMediaItem(filter: { wpParent: { node: { id: { eq: $id } } } }) {
      nodes {
        id
        title
        altText
        description
        localFile {
          childImageSharp {
            gatsbyImageData(placeholder: TRACED_SVG, height: 167)
          }
        }
      }
    }
  }
`;
