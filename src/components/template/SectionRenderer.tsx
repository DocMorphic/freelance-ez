import type { SectionConfig, CompanyInfo } from "@/types/site-config";
import Hero from "./sections/Hero/Hero";
import Stats from "./sections/Stats/Stats";
import Services from "./sections/Services/Services";
import CTA from "./sections/CTA/CTA";
import FAQ from "./sections/FAQ/FAQ";
import Testimonials from "./sections/Testimonials/Testimonials";
import Content from "./sections/Content/Content";
import Contact from "./sections/Contact/Contact";
import Products from "./sections/Products/Products";
import ProcessSteps from "./sections/ProcessSteps/ProcessSteps";
import FeatureGrid from "./sections/FeatureGrid/FeatureGrid";
import TrustStrip from "./sections/TrustStrip/TrustStrip";
import Team from "./sections/Team/Team";
import CaseStudies from "./sections/CaseStudies/CaseStudies";
import PricingTable from "./sections/PricingTable/PricingTable";
import Gallery from "./sections/Gallery/Gallery";
import BlogList from "./sections/BlogList/BlogList";

interface SectionRendererProps {
  section: SectionConfig;
  company?: CompanyInfo;
}

export default function SectionRenderer({ section, company }: SectionRendererProps) {
  switch (section.type) {
    case "hero":
      return <Hero config={section} />;
    case "stats":
      return <Stats config={section} />;
    case "services":
      return <Services config={section} />;
    case "cta":
      return <CTA config={section} />;
    case "faq":
      return <FAQ config={section} />;
    case "testimonials":
      return <Testimonials config={section} />;
    case "content":
      return <Content config={section} />;
    case "contact":
      return <Contact config={section} company={company} />;
    case "products":
      return <Products config={section} />;
    case "processSteps":
      return <ProcessSteps config={section} />;
    case "featureGrid":
      return <FeatureGrid config={section} />;
    case "trustStrip":
      return <TrustStrip config={section} />;
    case "team":
      return <Team config={section} />;
    case "caseStudies":
      return <CaseStudies config={section} />;
    case "pricingTable":
      return <PricingTable config={section} />;
    case "gallery":
      return <Gallery config={section} />;
    case "blogList":
      return <BlogList config={section} />;
    default:
      return null;
  }
}
