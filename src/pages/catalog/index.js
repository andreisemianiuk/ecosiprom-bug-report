import { graphql } from "gatsby";
import parse, { domToReact } from "html-react-parser";
import * as React from "react";
import styled from "styled-components";
import { useAppContext } from "../../api/contextApi";
import { Breadcrumb } from "../../common/breadCrumb/Breadcrumb";
import Catalog from "../../components/catalog/Catalog";
import FeedbackForm from "../../components/feedback-form/FeedbackForm";
import Layout from "../../components/layout/Layout";
import EquipmentLogos from "../../components/logos/equipment-logos/EquipmentLogos";

const CatalogPage = ({
  data: {
    allWpMediaItem: { nodes },
    wpPage: { content },
  },
  pageContext,
  location,
}) => {
  const { dispatch } = useAppContext();

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

  React.useEffect(() => {
    return () => dispatch({ type: "CATALOG-MENU", payload: "privody" });
  }, [dispatch]);

  return (
    <Layout location={location}>
      <Catalog isMain images={nodes} title={title} location={location}>
        <Breadcrumb crumbs={crumbs} color={"#4a5763"} />
      </Catalog>
      <EquipmentLogos padding={"80px 0 60px"} />
      <TextContainer>{parse(content, options)}</TextContainer>
      <FeedbackForm />
    </Layout>
  );
};

export default CatalogPage;

export const pageQuery = graphql`
  query CatalogPageQuery {
    wpPage(title: { eq: "Каталог" }) {
      content
    }
    allWpMediaItem(
      filter: { wpParent: { node: { slug: { eq: "catalog" } } } }
    ) {
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

const TextContainer = styled.div`
  width: 100%;
  max-width: 1170px;
  margin: 0 auto;
  @media (max-width: 1223px) {
    max-width: 900px;
  }
  @media (max-width: 991px) {
    max-width: 700px;
    padding: 0 20px;
  }
`;
const CommonText = styled.div`
  font-weight: 400;
  line-height: 24px;
  margin-bottom: 80px;
`;
