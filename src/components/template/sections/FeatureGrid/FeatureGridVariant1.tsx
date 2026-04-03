import { Check } from "lucide-react";
import type { FeatureGridSectionConfig } from "@/types/site-config";
import SectionWrapper from "@/components/template/shared/SectionWrapper";
import styles from "./FeatureGrid.module.css";

interface Props {
  config: FeatureGridSectionConfig;
}

/** Variant 1 — Simple checkmark list with title + description */
export default function FeatureGridVariant1({ config }: Props) {
  return (
    <SectionWrapper background={config.background} paddingSize={config.paddingSize}>
      {/* Section header */}
      <div className="t-section-header">
        {config.label && <span className="t-section-label">{config.label}</span>}
        <h2>{config.heading}</h2>
      </div>

      {/* Checkmark list */}
      <div className={styles.checkList}>
        {config.items.map((item, i) => (
          <div key={i} className={styles.checkItem}>
            <span className={styles.checkIcon}>
              <Check size={20} />
            </span>
            <div className={styles.checkContent}>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
