import type { CaseStudiesSectionConfig } from "@/types/site-config";
import SectionWrapper from "@/components/template/shared/SectionWrapper";
import { CheckCircle, Globe } from "lucide-react";
import styles from "./CaseStudies.module.css";

interface Props {
  config: CaseStudiesSectionConfig;
}

/** CaseStudies — Grid of case study cards with Challenge/Solution/Results format */
export default function CaseStudies({ config }: Props) {
  return (
    <SectionWrapper background={config.background} paddingSize={config.paddingSize}>
      {/* Section header */}
      <div className="t-section-header">
        {config.label && <span className="t-section-label">{config.label}</span>}
        <h2>{config.heading}</h2>
      </div>

      {/* Cards grid */}
      <div className={styles.studiesGrid}>
        {config.items.map((item, i) => (
          <div key={i} className={`t-card ${styles.studyCard}`}>
            {/* Header: meta + title */}
            <div className={styles.studyHeader}>
              <div className={styles.studyMeta}>
                <span className={styles.studyIndustry}>{item.industry}</span>
                {item.region && (
                  <span className={styles.studyRegion}>
                    <Globe size={14} /> {item.region}
                  </span>
                )}
              </div>
              <h3 className={styles.studyTitle}>{item.title}</h3>
            </div>

            {/* Challenge */}
            <div className={styles.studySection}>
              <p className={styles.studySectionLabel}>Challenge</p>
              <p className={styles.studySectionText}>{item.challenge}</p>
            </div>

            {/* Solution */}
            <div className={styles.studySection}>
              <p className={styles.studySectionLabel}>Solution</p>
              <p className={styles.studySectionText}>{item.solution}</p>
            </div>

            {/* Results */}
            <div className={styles.studySection}>
              <p className={styles.studySectionLabel}>Results</p>
              <ul className={styles.resultsList}>
                {item.results.map((result, j) => (
                  <li key={j} className={styles.resultItem}>
                    <CheckCircle size={16} className={styles.resultCheck} />
                    {result}
                  </li>
                ))}
              </ul>
            </div>

            {/* Optional metrics */}
            {item.metrics && Object.keys(item.metrics).length > 0 && (
              <div className={styles.metricsRow}>
                {Object.entries(item.metrics).map(([label, value]) => (
                  <div key={label} className={styles.metric}>
                    <span className={styles.metricValue}>{value}</span>
                    <span className={styles.metricLabel}>{label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
