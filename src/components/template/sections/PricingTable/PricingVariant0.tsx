import Link from "next/link";
import type { PricingTableSectionConfig } from "@/types/site-config";
import SectionWrapper from "@/components/template/shared/SectionWrapper";
import { Check } from "lucide-react";
import styles from "./PricingTable.module.css";

interface Props {
  config: PricingTableSectionConfig;
}

/** Variant 0 — 3-column pricing cards with features and CTA */
export default function PricingVariant0({ config }: Props) {
  return (
    <SectionWrapper background={config.background} paddingSize={config.paddingSize}>
      {/* Section header */}
      <div className="t-section-header">
        {config.label && <span className="t-section-label">{config.label}</span>}
        <h2>{config.heading}</h2>
      </div>

      {/* Pricing cards */}
      <div className={styles.pricingGrid}>
        {config.tiers.map((tier, i) => (
          <div
            key={i}
            className={`t-card ${styles.pricingCard} ${
              tier.highlighted ? styles.pricingCardHighlighted : ""
            }`}
          >
            <p className={styles.tierName}>{tier.name}</p>
            <p className={styles.tierPrice}>
              {tier.price}
              {tier.period && (
                <span className={styles.tierPeriod}> / {tier.period}</span>
              )}
            </p>
            <p className={styles.tierDescription}>{tier.description}</p>

            <ul className={styles.featureList}>
              {tier.features.map((feature, j) => (
                <li key={j} className={styles.featureItem}>
                  <Check size={16} className={styles.featureCheck} />
                  {feature}
                </li>
              ))}
            </ul>

            <div className={styles.pricingCta}>
              <Link
                href={tier.cta.href}
                className={`t-btn ${
                  tier.highlighted ? "t-btn-primary" : "t-btn-secondary"
                }`}
                style={{ width: "100%", justifyContent: "center" }}
              >
                {tier.cta.text}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
