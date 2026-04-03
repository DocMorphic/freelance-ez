import type { PricingTableSectionConfig } from "@/types/site-config";
import PricingVariant0 from "./PricingVariant0";
import PricingVariant1 from "./PricingVariant1";

interface Props {
  config: PricingTableSectionConfig;
}

/** Dispatcher — picks the right PricingTable variant */
export default function PricingTable({ config }: Props) {
  switch (config.variant) {
    case 0:
      return <PricingVariant0 config={config} />;
    case 1:
      return <PricingVariant1 config={config} />;
    default:
      return <PricingVariant0 config={config} />;
  }
}
