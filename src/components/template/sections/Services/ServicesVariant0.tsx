import Link from "next/link";
import type { ServicesSectionConfig } from "@/types/site-config";
import SectionWrapper from "@/components/template/shared/SectionWrapper";
import IconResolver from "@/components/template/shared/IconResolver";
import styles from "./Services.module.css";

interface Props {
  config: ServicesSectionConfig;
}

/** Variant 0 — 4-column card grid (DaveMetals pattern) */
export default function ServicesVariant0({ config }: Props) {
  return (
    <SectionWrapper background={config.background} paddingSize={config.paddingSize}>
      {/* Section header */}
      <div className="t-section-header">
        {config.label && <span className="t-section-label">{config.label}</span>}
        <h2>{config.heading}</h2>
        {config.description && <p>{config.description}</p>}
      </div>

      {/* Cards grid */}
      <div className={styles.servicesGrid}>
        {config.items.map((item, i) => (
          <div key={i} className={`t-card ${styles.serviceCard}`}>
            <div className="t-card-icon">
              <IconResolver name={item.icon} size={24} />
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>

      {/* Optional CTA */}
      {config.ctaText && config.ctaLink && (
        <div className={styles.ctaWrapper}>
          <Link href={config.ctaLink} className="t-btn t-btn-secondary">
            {config.ctaText}
          </Link>
        </div>
      )}
    </SectionWrapper>
  );
}
