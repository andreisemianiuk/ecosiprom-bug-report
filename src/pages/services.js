import * as React from "react";
import { Breadcrumb } from "../common/breadCrumb/Breadcrumb";
import FeedbackForm from "../components/feedback-form/FeedbackForm";
import Layout from "../components/layout/Layout";
import ServicesList from "../components/services-list/ServicesList";

function ServicesPage({ pageContext }) {
  const {
    breadcrumb: { crumbs },
  } = pageContext;

  return (
    <Layout>
      <ServicesList isMain={false}>
        <Breadcrumb crumbs={crumbs} color={"#4a5763"} />
      </ServicesList>
      <FeedbackForm />
    </Layout>
  );
}

export default ServicesPage;
