import type { TeamSectionConfig } from "@/types/site-config";
import TeamVariant0 from "./TeamVariant0";
import TeamVariant1 from "./TeamVariant1";

interface Props {
  config: TeamSectionConfig;
}

/** Dispatcher — picks the right Team variant */
export default function Team({ config }: Props) {
  switch (config.variant) {
    case 0:
      return <TeamVariant0 config={config} />;
    case 1:
      return <TeamVariant1 config={config} />;
    default:
      return <TeamVariant0 config={config} />;
  }
}
