import type { ContentSectionConfig } from "@/types/site-config";
import ContentVariant0 from "./ContentVariant0";
import ContentVariant1 from "./ContentVariant1";
import ContentVariant2 from "./ContentVariant2";

interface Props {
  config: ContentSectionConfig;
}

/** Dispatcher — picks the right Content variant */
export default function Content({ config }: Props) {
  switch (config.variant) {
    case 0:
      return <ContentVariant0 config={config} />;
    case 1:
      return <ContentVariant1 config={config} />;
    case 2:
      return <ContentVariant2 config={config} />;
    default:
      return <ContentVariant0 config={config} />;
  }
}
