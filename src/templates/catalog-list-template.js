import * as React from "react";
import { graphql } from "gatsby";
import parse from "html-react-parser";
import styled from "styled-components";
import { CatalogLayout } from "../components/CatalogLayout";
import Layout from "../components/Layout";
import Catalog from "../components/catalog/Catalog";
import { Breadcrumb } from "../common/breadCrumb/Breadcrumb";

const Wrapper = styled.section``;

const CatalogListTemplate = ({
  data: {
    wpPage: { content },
    allWpMediaItem: { nodes },
  },
  pageContext,
}) => {
  const {
    breadcrumb: { crumbs },
  } = pageContext;
  console.log("🚀 ~ file: catalog-list-template.js ~ line 17 ~ nodes", nodes);
  const options = {
    replace: (domNode) => {
      //if (domNode.attribs && domNode.attribs.class === 'item') {
      //  }
    },
  };
  const title = crumbs[crumbs.length - 1].crumbLabel;

  return (
    <Layout>
      <Catalog isMain={false} images={nodes} title={title}>
        <Breadcrumb crumbs={crumbs} color={"#4a5763"} />
      </Catalog>
      <Wrapper>{/*{parse(content, options)}*/}</Wrapper>
    </Layout>
  );
};

export default CatalogListTemplate;

export const pageQuery = graphql`
  query CatalogListTemplateQuery($id: String!) {
    wpPage(id: { eq: $id }) {
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
            gatsbyImageData(placeholder: TRACED_SVG, quality: 100, height: 167)
          }
        }
      }
    }
  }
`;
