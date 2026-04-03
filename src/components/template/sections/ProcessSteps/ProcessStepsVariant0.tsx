import type { ProcessStepsSectionConfig } from "@/types/site-config";
import SectionWrapper from "@/components/template/shared/SectionWrapper";
import styles from "./ProcessSteps.module.css";

interface Props {
  config: ProcessStepsSectionConfig;
}

/** Variant 0 — Numbered circles in a horizontal row with connecting lines */
export default function ProcessStepsVariant0({ config }: Props) {
  return (
    <SectionWrapper background={config.background} paddingSize={config.paddingSize}>
      {/* Section header */}
      <div className="t-section-header">
        {config.label && <span className="t-section-label">{config.label}</span>}
        <h2>{config.heading}</h2>
        {config.description && <p>{config.description}</p>}
      </div>

      {/* Steps row */}
      <div
        className={styles.stepsRow}
        style={{ "--step-count": config.steps.length } as React.CSSProperties}
      >
        {config.steps.map((step, i) => (
          <div key={i} className={styles.step}>
            <span className={styles.stepNumber}>{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
