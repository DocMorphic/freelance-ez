import type { ContactSectionConfig, CompanyInfo } from "@/types/site-config";
import ContactVariant0 from "./ContactVariant0";
import ContactVariant1 from "./ContactVariant1";

interface Props {
  config: ContactSectionConfig;
  company?: CompanyInfo;
}

/** Dispatcher — picks the right Contact variant */
export default function Contact({ config, company }: Props) {
  switch (config.variant) {
    case 0:
      return <ContactVariant0 config={config} company={company} />;
    case 1:
      return <ContactVariant1 config={config} />;
    default:
      return <ContactVariant0 config={config} company={company} />;
  }
}
