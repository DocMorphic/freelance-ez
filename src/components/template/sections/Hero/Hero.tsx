import type { HeroSectionConfig } from "@/types/site-config";
import HeroVariant0 from "./HeroVariant0";
import HeroVariant1 from "./HeroVariant1";
import HeroVariant2 from "./HeroVariant2";

export default function Hero({ config }: { config: HeroSectionConfig }) {
  switch (config.variant) {
    case 0:
      return <HeroVariant0 config={config} />;
    case 1:
      return <HeroVariant1 config={config} />;
    case 2:
      return <HeroVariant2 config={config} />;
    default:
      return <HeroVariant0 config={config} />;
  }
}
