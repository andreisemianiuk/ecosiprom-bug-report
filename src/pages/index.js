import * as React from "react";
import styled from "styled-components";
import Layout from "../components/layout/Layout";
import AboutUs from "../components/about-us/AboutUs";
import CatalogMain from "../components/catalog/CatalogMain";
import FeedbackForm from "../components/feedback-form/FeedbackForm";
import ImplementationCycle from "../components/implementation-cycle/ImplementationCycle";
import EquipmentLogos from "../components/logos/equipment-logos/EquipmentLogos";
import PartnerLogos from "../components/logos/partner-logos/PartnerLogos";
import ProjectsMain from "../components/projects/ProjectsMain";
import ServicesList from "../components/services-list/ServicesList";
import { Slideshow } from "../components/slideshow-main-page/Slideshow";

const SliderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function HomePage({ location }) {
  return (
    <Layout location={location}>
      <SliderContainer>
        <Slideshow autoplay={true} />
      </SliderContainer>
      <ServicesList isMain title={"Наши услуги"} />
      <CatalogMain location={location} />
      <EquipmentLogos />
      <ImplementationCycle />
      <ProjectsMain />
      <AboutUs isMain />
      <PartnerLogos />
      <FeedbackForm />
    </Layout>
  );
}

export default HomePage;
