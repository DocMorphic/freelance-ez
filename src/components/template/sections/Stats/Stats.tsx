"use client";

import type { StatsSectionConfig } from "@/types/site-config";
import StatsVariant0 from "./StatsVariant0";
import StatsVariant1 from "./StatsVariant1";

export default function Stats({ config }: { config: StatsSectionConfig }) {
  switch (config.variant) {
    case 0:
      return <StatsVariant0 config={config} />;
    case 1:
      return <StatsVariant1 config={config} />;
    default:
      return <StatsVariant0 config={config} />;
  }
}
