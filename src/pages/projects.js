import { graphql } from "gatsby";
import * as React from "react";
import { Breadcrumb } from "../common/breadCrumb/Breadcrumb";
import FeedbackForm from "../components/feedback-form/FeedbackForm";
import Layout from "../components/layout/Layout";
import PartnerLogos from "../components/logos/partner-logos/PartnerLogos";
import Projects from "../components/projects/Projects";

const ProjectsPage = ({
  data: {
    wpPage: { content, title },
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
      <Projects
        nodes={nodes}
        title={title}
        location={location}
        content={content}>
        <Breadcrumb crumbs={crumbs} color={"#4a5763"} />
      </Projects>
      <PartnerLogos />
      <FeedbackForm />
    </Layout>
  );
};

export default ProjectsPage;

export const pageQuery = graphql`
  query ProjectsPageQuery {
    wpPage(title: { eq: "Проекты" }) {
      title
      content
    }
    allWpMediaItem(
      filter: { title: { regex: "/projects/" } }
      sort: { fields: caption }
    ) {
      nodes {
        id
        altText
        description
        title
        localFile {
          childImageSharp {
            gatsbyImageData(
              height: 280
              width: 377
              placeholder: TRACED_SVG
              quality: 100
              formats: PNG
            )
          }
        }
      }
    }
  }
`;
