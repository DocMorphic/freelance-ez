import Link from "next/link";
import type { CTASectionConfig } from "@/types/site-config";
import styles from "./CTA.module.css";

export default function CTAVariant0({ config }: { config: CTASectionConfig }) {
  return (
    <section className={styles.ctaGradient}>
      <div className={styles.ctaGradientInner}>
        <div className={styles.ctaGradientContent}>
          <h2>{config.heading}</h2>
          <p>{config.description}</p>
          <div className={styles.ctaButtons}>
            {config.buttons.map((btn, i) => (
              <Link
                key={i}
                href={btn.href}
                className={
                  btn.style === "primary"
                    ? styles.ctaBtnPrimary
                    : styles.ctaBtnSecondary
                }
              >
                {btn.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
