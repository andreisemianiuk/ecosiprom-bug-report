import * as React from "react";
import { Breadcrumb } from "gatsby-plugin-breadcrumb";
import FeedbackForm from "../components/feedback-form/FeedbackForm";
import Layout from "../components/Layout";
import ServicesList from "../components/services-list/ServicesList";

function ServicesPage({ pageContext }) {
  const {
    breadcrumb: { crumbs },
  } = pageContext;

  return (
    <Layout>
      <ServicesList isMain={false}>
        <Breadcrumb crumbs={crumbs} crumbSeparator={""} />
      </ServicesList>
      <FeedbackForm />
    </Layout>
  );
}

export default ServicesPage;
