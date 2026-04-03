import { Check } from "lucide-react";
import type { ContentSectionConfig } from "@/types/site-config";
import SectionWrapper from "@/components/template/shared/SectionWrapper";
import styles from "./Content.module.css";

interface Props {
  config: ContentSectionConfig;
}

/** Variant 2 — Text left, checklist right */
export default function ContentVariant2({ config }: Props) {
  return (
    <SectionWrapper background={config.background} paddingSize={config.paddingSize}>
      {/* Section header */}
      <div className="t-section-header">
        {config.label && <span className="t-section-label">{config.label}</span>}
        <h2>{config.heading}</h2>
      </div>

      <div className={styles.checklistGrid}>
        {/* Paragraphs */}
        <div className={styles.checklistText}>
          {config.paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Checklist */}
        {config.checklistItems && config.checklistItems.length > 0 && (
          <ul className={styles.checklist}>
            {config.checklistItems.map((item, i) => (
              <li key={i} className={styles.checklistItem}>
                <Check size={20} className={styles.checkIcon} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </SectionWrapper>
  );
}
