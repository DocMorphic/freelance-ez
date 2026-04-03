import type { FeatureGridSectionConfig } from "@/types/site-config";
import FeatureGridVariant0 from "./FeatureGridVariant0";
import FeatureGridVariant1 from "./FeatureGridVariant1";

interface Props {
  config: FeatureGridSectionConfig;
}

/** Dispatcher — picks the right FeatureGrid variant */
export default function FeatureGrid({ config }: Props) {
  switch (config.variant) {
    case 0:
      return <FeatureGridVariant0 config={config} />;
    case 1:
      return <FeatureGridVariant1 config={config} />;
    default:
      return <FeatureGridVariant0 config={config} />;
  }
}
