import Link from "next/link";
import { Check } from "lucide-react";
import type { ServicesSectionConfig } from "@/types/site-config";
import SectionWrapper from "@/components/template/shared/SectionWrapper";
import IconResolver from "@/components/template/shared/IconResolver";
import styles from "./Services.module.css";

interface Props {
  config: ServicesSectionConfig;
}

/** Variant 2 — Alternating left/right rows */
export default function ServicesVariant2({ config }: Props) {
  return (
    <SectionWrapper background={config.background} paddingSize={config.paddingSize}>
      {/* Section header */}
      <div className="t-section-header">
        {config.label && <span className="t-section-label">{config.label}</span>}
        <h2>{config.heading}</h2>
        {config.description && <p>{config.description}</p>}
      </div>

      {/* Alternating rows */}
      {config.items.map((item, i) => {
        const isReversed = i % 2 === 1;
        return (
          <div
            key={i}
            className={`${styles.serviceRow} ${isReversed ? styles.serviceRowReversed : ""}`}
          >
            <div className={styles.serviceRowIcon}>
              <div className={styles.serviceRowIconCircle}>
                <IconResolver name={item.icon} size={36} />
              </div>
            </div>

            <div className={styles.serviceRowContent}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>

              {item.features && item.features.length > 0 && (
                <ul className={styles.serviceRowFeatures}>
                  {item.features.map((feature, j) => (
                    <li key={j} className={styles.serviceRowFeatureItem}>
                      <Check size={16} className={styles.serviceRowFeatureCheck} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        );
      })}

      {/* Optional CTA */}
      {config.ctaText && config.ctaLink && (
        <div className={styles.ctaWrapper}>
          <Link href={config.ctaLink} className="t-btn t-btn-primary">
            {config.ctaText}
          </Link>
        </div>
      )}
    </SectionWrapper>
  );
}
