import Link from "next/link";
import type { PricingTableSectionConfig } from "@/types/site-config";
import SectionWrapper from "@/components/template/shared/SectionWrapper";
import { Check, Minus } from "lucide-react";
import styles from "./PricingTable.module.css";

interface Props {
  config: PricingTableSectionConfig;
}

/** Variant 1 — Comparison table with tiers as columns and features as rows */
export default function PricingVariant1({ config }: Props) {
  // Collect all unique features from all tiers
  const allFeatures = Array.from(
    new Set(config.tiers.flatMap((tier) => tier.features))
  );

  return (
    <SectionWrapper background={config.background} paddingSize={config.paddingSize}>
      {/* Section header */}
      <div className="t-section-header">
        {config.label && <span className="t-section-label">{config.label}</span>}
        <h2>{config.heading}</h2>
      </div>

      {/* Comparison table */}
      <div className={styles.comparisonWrapper}>
        <table className={styles.comparisonTable}>
          <thead>
            <tr>
              <th>Features</th>
              {config.tiers.map((tier, i) => (
                <th
                  key={i}
                  className={tier.highlighted ? styles.comparisonColHighlighted : ""}
                >
                  <div className={styles.comparisonTierName}>{tier.name}</div>
                  <div className={styles.comparisonTierPrice}>
                    {tier.price}
                    {tier.period && (
                      <span className={styles.comparisonTierPeriod}>
                        {" "}
                        / {tier.period}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allFeatures.map((feature, fi) => (
              <tr key={fi}>
                <td>{feature}</td>
                {config.tiers.map((tier, ti) => (
                  <td
                    key={ti}
                    className={
                      tier.highlighted ? styles.comparisonColHighlighted : ""
                    }
                  >
                    {tier.features.includes(feature) ? (
                      <Check size={18} className={styles.comparisonCheckIcon} />
                    ) : (
                      <Minus size={18} className={styles.comparisonDash} />
                    )}
                  </td>
                ))}
              </tr>
            ))}

            {/* CTA row */}
            <tr className={styles.comparisonCtaRow}>
              <td />
              {config.tiers.map((tier, i) => (
                <td
                  key={i}
                  className={
                    tier.highlighted ? styles.comparisonColHighlighted : ""
                  }
                >
                  <Link
                    href={tier.cta.href}
                    className={`t-btn t-btn-sm ${
                      tier.highlighted ? "t-btn-primary" : "t-btn-secondary"
                    }`}
                  >
                    {tier.cta.text}
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </SectionWrapper>
  );
}
