import type { FooterConfig, CompanyInfo } from "@/types/site-config";
import FooterStandard from "./FooterStandard";
import FooterMinimal from "./FooterMinimal";
import FooterCentered from "./FooterCentered";

interface FooterProps {
  config: FooterConfig;
  company: CompanyInfo;
}

export default function Footer({ config, company }: FooterProps) {
  switch (config.variant) {
    case "minimal":
      return <FooterMinimal config={config} company={company} />;
    case "centered":
      return <FooterCentered config={config} company={company} />;
    case "standard":
    default:
      return <FooterStandard config={config} company={company} />;
  }
}
