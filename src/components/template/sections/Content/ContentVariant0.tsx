import type { ContentSectionConfig } from "@/types/site-config";
import SectionWrapper from "@/components/template/shared/SectionWrapper";
import IconResolver from "@/components/template/shared/IconResolver";
import styles from "./Content.module.css";

interface Props {
  config: ContentSectionConfig;
}

/** Variant 0 — Two-column: paragraphs left, side card right */
export default function ContentVariant0({ config }: Props) {
  return (
    <SectionWrapper background={config.background} paddingSize={config.paddingSize}>
      {/* Section header */}
      <div className="t-section-header">
        {config.label && <span className="t-section-label">{config.label}</span>}
        <h2>{config.heading}</h2>
      </div>

      <div className={styles.contentGrid}>
        {/* Paragraphs */}
        <div className={styles.contentText}>
          {config.paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Side card */}
        {config.sideCard && (
          <div className={`t-card ${styles.sideCard}`}>
            {config.sideCard.icon && (
              <div className={styles.sideCardIcon}>
                <IconResolver name={config.sideCard.icon} size={28} />
              </div>
            )}
            <h3 className={styles.sideCardHeading}>{config.sideCard.heading}</h3>
            {config.sideCard.subtitle && (
              <p className={styles.sideCardSubtitle}>{config.sideCard.subtitle}</p>
            )}
            {config.sideCard.stats && config.sideCard.stats.length > 0 && (
              <div className={styles.sideCardStats}>
                {config.sideCard.stats.map((stat, i) => (
                  <div key={i}>
                    <span className={styles.statValue}>{stat.value}</span>
                    <span className={styles.statLabel}>{stat.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
