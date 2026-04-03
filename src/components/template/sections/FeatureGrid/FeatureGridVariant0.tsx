import type { FeatureGridSectionConfig } from "@/types/site-config";
import SectionWrapper from "@/components/template/shared/SectionWrapper";
import IconResolver from "@/components/template/shared/IconResolver";
import styles from "./FeatureGrid.module.css";

interface Props {
  config: FeatureGridSectionConfig;
}

/** Variant 0 — Icon + title + description cards in a 4-column grid */
export default function FeatureGridVariant0({ config }: Props) {
  return (
    <SectionWrapper background={config.background} paddingSize={config.paddingSize}>
      {/* Section header */}
      <div className="t-section-header">
        {config.label && <span className="t-section-label">{config.label}</span>}
        <h2>{config.heading}</h2>
      </div>

      {/* Feature cards grid */}
      <div className={styles.featureGrid}>
        {config.items.map((item, i) => (
          <div key={i} className={`t-card ${styles.featureCard}`}>
            {item.icon && (
              <div className="t-card-icon">
                <IconResolver name={item.icon} size={24} />
              </div>
            )}
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
