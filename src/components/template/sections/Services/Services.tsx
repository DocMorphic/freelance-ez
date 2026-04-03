import type { ServicesSectionConfig } from "@/types/site-config";
import ServicesVariant0 from "./ServicesVariant0";
import ServicesVariant1 from "./ServicesVariant1";
import ServicesVariant2 from "./ServicesVariant2";

interface Props {
  config: ServicesSectionConfig;
}

/** Dispatcher — picks the right Services variant */
export default function Services({ config }: Props) {
  switch (config.variant) {
    case 0:
      return <ServicesVariant0 config={config} />;
    case 1:
      return <ServicesVariant1 config={config} />;
    case 2:
      return <ServicesVariant2 config={config} />;
    default:
      return <ServicesVariant0 config={config} />;
  }
}
