import type { ProcessStepsSectionConfig } from "@/types/site-config";
import ProcessStepsVariant0 from "./ProcessStepsVariant0";
import ProcessStepsVariant1 from "./ProcessStepsVariant1";

interface Props {
  config: ProcessStepsSectionConfig;
}

/** Dispatcher — picks the right ProcessSteps variant */
export default function ProcessSteps({ config }: Props) {
  switch (config.variant) {
    case 0:
      return <ProcessStepsVariant0 config={config} />;
    case 1:
      return <ProcessStepsVariant1 config={config} />;
    default:
      return <ProcessStepsVariant0 config={config} />;
  }
}
