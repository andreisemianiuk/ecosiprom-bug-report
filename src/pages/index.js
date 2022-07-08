import * as React from "react";
import styled from "styled-components";
import Layout from "../components/Layout";

import ProductionDirections from "../components/directions-of-production/ProductionDirections";
import ServicesList from "../components/services-list/ServicesList";
import Catalog from "../components/catalog/Catalog";
import EquipmentLogos from "../components/logos/equipment-logos/EquipmentLogos";
import ImplementationCycle from "../components/implementation-cycle/ImplementationCycle";
import Projects from "../components/projects/Projects";
import AboutUs from "../components/about-us/AboutUs";
import PartnerLogos from "../components/logos/partner-logos/PartnerLogos";
import FeedbackForm from "../components/feedback-form/FeedbackForm";
import { Slideshow } from "../components/slideshow-main-page/Slideshow";

const SliderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function HomePage() {
  return (
    <Layout>
      <SliderContainer>
        <Slideshow autoplay={true} />
      </SliderContainer>
      <ProductionDirections />
      <ServicesList isMain />
      <Catalog />
      <EquipmentLogos />
      <ImplementationCycle />
      <Projects />
      <AboutUs />
      <PartnerLogos />
      <FeedbackForm />
    </Layout>
  );
}

export default HomePage;
