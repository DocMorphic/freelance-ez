import type { FAQSectionConfig } from "@/types/site-config";
import FAQVariant0 from "./FAQVariant0";
import FAQVariant1 from "./FAQVariant1";

export default function FAQ({ config }: { config: FAQSectionConfig }) {
  switch (config.variant) {
    case 0:
      return <FAQVariant0 config={config} />;
    case 1:
      return <FAQVariant1 config={config} />;
    default:
      return <FAQVariant0 config={config} />;
  }
}
