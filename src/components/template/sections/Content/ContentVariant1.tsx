import type { ContentSectionConfig } from "@/types/site-config";
import SectionWrapper from "@/components/template/shared/SectionWrapper";
import styles from "./Content.module.css";

interface Props {
  config: ContentSectionConfig;
}

/** Variant 1 — Centered text block */
export default function ContentVariant1({ config }: Props) {
  return (
    <SectionWrapper background={config.background} paddingSize={config.paddingSize}>
      {/* Section header */}
      <div className="t-section-header">
        {config.label && <span className="t-section-label">{config.label}</span>}
        <h2>{config.heading}</h2>
      </div>

      {/* Centered paragraphs */}
      <div className={styles.centeredContent}>
        {config.paragraphs.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </SectionWrapper>
  );
}
