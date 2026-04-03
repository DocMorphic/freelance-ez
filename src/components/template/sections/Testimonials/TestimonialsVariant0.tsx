import { Quote } from "lucide-react";
import type { TestimonialsSectionConfig } from "@/types/site-config";
import SectionWrapper from "@/components/template/shared/SectionWrapper";
import styles from "./Testimonials.module.css";

export default function TestimonialsVariant0({ config }: { config: TestimonialsSectionConfig }) {
  return (
    <SectionWrapper background={config.background} paddingSize={config.paddingSize}>
      <div className="t-section-header">
        {config.label && <span className="t-section-label">{config.label}</span>}
        <h2>{config.heading}</h2>
      </div>

      <div className={styles.testimonialsGrid}>
        {config.items.map((item, i) => (
          <div key={i} className={styles.testimonialCard}>
            <Quote size={24} className={styles.quoteIcon} />
            <p className={styles.testimonialQuote}>{item.quote}</p>
            <div className={styles.testimonialAuthor}>
              <span className={styles.testimonialName}>{item.name}</span>
              {(item.role || item.company) && (
                <span className={styles.testimonialRole}>
                  {[item.role, item.company].filter(Boolean).join(", ")}
                </span>
              )}
              {item.location && (
                <span className={styles.testimonialLocation}>{item.location}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
