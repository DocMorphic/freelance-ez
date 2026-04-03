"use client";

import type { StatsSectionConfig } from "@/types/site-config";
import SectionWrapper from "@/components/template/shared/SectionWrapper";
import AnimatedCounter from "@/components/template/shared/AnimatedCounter";
import styles from "./Stats.module.css";

function parseValue(value: string): { num: number; suffix: string } {
  const match = value.match(/^(\d+)(.*)/);
  if (match) {
    return { num: parseInt(match[1], 10), suffix: match[2] };
  }
  return { num: 0, suffix: value };
}

export default function StatsVariant1({ config }: { config: StatsSectionConfig }) {
  return (
    <SectionWrapper background={config.background} paddingSize={config.paddingSize}>
      <div className={styles.statsGrid}>
        {config.items.map((item, i) => {
          const { num, suffix } = parseValue(item.value);
          return (
            <div key={i} className={styles.statCard}>
              <span className={styles.statCardValue}>
                {config.animated ? (
                  <AnimatedCounter end={num} suffix={suffix} />
                ) : (
                  item.value
                )}
              </span>
              <span className={styles.statCardLabel}>{item.label}</span>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
