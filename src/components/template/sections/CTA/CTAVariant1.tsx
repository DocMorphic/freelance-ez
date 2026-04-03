import Link from "next/link";
import type { CTASectionConfig } from "@/types/site-config";
import SectionWrapper from "@/components/template/shared/SectionWrapper";
import styles from "./CTA.module.css";

export default function CTAVariant1({ config }: { config: CTASectionConfig }) {
  return (
    <SectionWrapper background={config.background} paddingSize={config.paddingSize}>
      <div className={styles.ctaSplit}>
        <div className={styles.ctaSplitText}>
          <h2>{config.heading}</h2>
          <p>{config.description}</p>
        </div>
        <div className={styles.ctaSplitActions}>
          {config.buttons.map((btn, i) => (
            <Link
              key={i}
              href={btn.href}
              className={btn.style === "primary" ? "t-btn t-btn-primary" : "t-btn t-btn-secondary"}
            >
              {btn.text}
            </Link>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
