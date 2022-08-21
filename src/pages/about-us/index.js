import { graphql } from "gatsby";
import * as React from "react";
import Layout from "../../components/layout/Layout";
import { Breadcrumb } from "../../common/breadCrumb/Breadcrumb";
import AboutUsCommon from "../../components/about-us/AboutUsCommon";
import AboutUsInfo from "../../components/about-us/AboutUsInfo";
import FeedbackForm from "../../components/feedback-form/FeedbackForm";
import ProjectsMain from "../../components/projects/ProjectsMain";

const AboutPage = ({
  data: {
    wpPage: { content },
    allWpMediaItem: { nodes },
  },
  location,
  pageContext,
}) => {
  const {
    breadcrumb: { crumbs },
  } = pageContext;

  return (
    <Layout>
      <AboutUsCommon location={location} isMain={false}>
        <Breadcrumb crumbs={crumbs} color={"#fff"} />
      </AboutUsCommon>
      <AboutUsInfo content={content} images={nodes} />
      <ProjectsMain />
      <FeedbackForm />
    </Layout>
  );
};

export default AboutPage;

export const pageQuery = graphql`
  query AboutUsQuery {
    wpPage(title: { eq: "О нас" }) {
      id
      content
    }
    allWpMediaItem(
      filter: { wpParent: { node: { slug: { eq: "about-us" } } } }
    ) {
      nodes {
        id
        title
        localFile {
          childImageSharp {
            gatsbyImageData(width: 178, height: 250, formats: PNG)
          }
        }
        altText
      }
    }
  }
`;
