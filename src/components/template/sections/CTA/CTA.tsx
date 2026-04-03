import type { CTASectionConfig } from "@/types/site-config";
import CTAVariant0 from "./CTAVariant0";
import CTAVariant1 from "./CTAVariant1";

export default function CTA({ config }: { config: CTASectionConfig }) {
  switch (config.variant) {
    case 0:
      return <CTAVariant0 config={config} />;
    case 1:
      return <CTAVariant1 config={config} />;
    default:
      return <CTAVariant0 config={config} />;
  }
}
