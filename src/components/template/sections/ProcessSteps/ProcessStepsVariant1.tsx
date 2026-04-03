import type { ProcessStepsSectionConfig } from "@/types/site-config";
import SectionWrapper from "@/components/template/shared/SectionWrapper";
import styles from "./ProcessSteps.module.css";

interface Props {
  config: ProcessStepsSectionConfig;
}

/** Variant 1 — Vertical timeline with connecting line and step circles */
export default function ProcessStepsVariant1({ config }: Props) {
  return (
    <SectionWrapper background={config.background} paddingSize={config.paddingSize}>
      {/* Section header */}
      <div className="t-section-header">
        {config.label && <span className="t-section-label">{config.label}</span>}
        <h2>{config.heading}</h2>
        {config.description && <p>{config.description}</p>}
      </div>

      {/* Timeline */}
      <div className={styles.timeline}>
        {config.steps.map((step, i) => (
          <div key={i} className={styles.timelineStep}>
            <span className={styles.timelineNumber}>{step.number}</span>
            <div className={styles.timelineContent}>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
